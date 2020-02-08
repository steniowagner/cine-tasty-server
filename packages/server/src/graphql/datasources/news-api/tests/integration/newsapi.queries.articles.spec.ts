const mockRestDataSourceGet = jest.fn();

import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';

import {
  rawArticleWithId,
  articleWithId,
} from '../../../../../__tests__/mocks/articles.stub';
import getDateParam from '../../helpers/getDateParam';
import resolvers from '../../../../resolvers';
import env from '../../../../../config/environment';
import typeDefs from '../../../../typeDefs';
import NewsAPI from '../..';

const dateParam = getDateParam();

const ENDPOINT = 'everything';
const STATUS_OK = 'ok';
const PAGE_SIZE = 12;
const QUERY = 'cinema';

const GET_ARTICLES = gql`
  query GetArticles($page: Int!) {
    articles(page: $page) {
      items {
        publishedAt
        content
        source
        author
        title
        image
        url
        id
      }
      hasMore
    }
  }
`;

const makeTestServer = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      news: new NewsAPI(),
    }),
  });

  return server;
};

jest.mock('apollo-datasource-rest', () => {
  class MockRESTDataSource {
    baseUrl = '';
    get = mockRestDataSourceGet;
  }

  return {
    RESTDataSource: MockRESTDataSource,
    HTTPCache: class HTTPCache {},
  };
});

describe('Integration: DataSources-NewsAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Query - Articles', () => {
    it('should query an array of articles from the News API and return it correctly', async () => {
      mockRestDataSourceGet.mockResolvedValueOnce({
        articles: [rawArticleWithId],
        status: STATUS_OK,
      });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_ARTICLES,
        variables: { page: 1 },
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(ENDPOINT, {
        apiKey: env.NEWS_API_KEY,
        pageSize: PAGE_SIZE,
        from: dateParam,
        to: dateParam,
        q: QUERY,
        page: 1,
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(data!.articles.items).toEqual([articleWithId]);
    });

    it("should return an empty array when the status isn't ok", async () => {
      mockRestDataSourceGet.mockResolvedValueOnce({
        variables: { page: 1 },
        status: 'error',
        articles: [],
      });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_ARTICLES,
        variables: { page: 1 },
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(ENDPOINT, {
        apiKey: env.NEWS_API_KEY,
        pageSize: PAGE_SIZE,
        from: dateParam,
        to: dateParam,
        q: QUERY,
        page: 1,
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(data!.articles.items).toEqual([]);
    });

    it('should return an empty array when already paginated all items', async () => {
      mockRestDataSourceGet.mockResolvedValueOnce({
        variables: { page: 2 },
        status: 'error',
        articles: [rawArticleWithId],
      });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_ARTICLES,
        variables: { page: 2 },
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(ENDPOINT, {
        apiKey: env.NEWS_API_KEY,
        pageSize: PAGE_SIZE,
        from: dateParam,
        to: dateParam,
        q: QUERY,
        page: 2,
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(data!.articles.items).toEqual([]);
    });

    it('should return the field hasMore as true when has more items to be paginated', async () => {
      mockRestDataSourceGet.mockResolvedValueOnce({
        variables: { page: 1 },
        status: STATUS_OK,
        articles: Array(12).fill(rawArticleWithId),
      });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_ARTICLES,
        variables: { page: 1 },
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(ENDPOINT, {
        apiKey: env.NEWS_API_KEY,
        pageSize: PAGE_SIZE,
        from: dateParam,
        to: dateParam,
        q: QUERY,
        page: 1,
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(data!.articles.hasMore).toEqual(true);
    });

    it('should return hasMore as false when has no more items to be paginated', async () => {
      mockRestDataSourceGet.mockResolvedValueOnce({
        variables: { page: 1 },
        status: STATUS_OK,
        articles: Array(11).fill(rawArticleWithId),
      });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_ARTICLES,
        variables: { page: 1 },
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(ENDPOINT, {
        apiKey: env.NEWS_API_KEY,
        pageSize: PAGE_SIZE,
        from: dateParam,
        to: dateParam,
        q: QUERY,
        page: 1,
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(data!.articles.hasMore).toEqual(false);
    });
  });
});
