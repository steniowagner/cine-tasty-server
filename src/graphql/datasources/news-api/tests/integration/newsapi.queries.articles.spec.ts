import { ArticleLanguage } from './../../../../../lib/types';
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
import CONSTANTS from '../../utils/constants';
import NewsAPI from '../..';

const dateParam = getDateParam();

const GET_ARTICLES = gql`
  query GetArticles($page: Int!, $language: ArticleLanguage!) {
    articles(page: $page, language: $language) {
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
    jest.resetModules();
  });

  describe('Query - Articles', () => {
    it('should query an array of articles from the News API and return it correctly', async () => {
      mockRestDataSourceGet.mockResolvedValueOnce({
        articles: [rawArticleWithId],
        status: CONSTANTS.STATUS_OK,
      });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        variables: { page: 1, language: ArticleLanguage.En },
        query: GET_ARTICLES,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(CONSTANTS.ENDPOINT, {
        language: ArticleLanguage.En.toLowerCase(),
        pageSize: CONSTANTS.PAGE_SIZE,
        apiKey: env.NEWS_API_KEY,
        q: CONSTANTS.QUERY,
        from: dateParam,
        to: dateParam,
        page: 1,
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(data!.articles.items).toEqual([articleWithId]);
    });

    it('should return an empty array when some error is thrown', async () => {
      jest.mock('apollo-datasource-rest', () => ({
        RESTDataSource: {
          get: jest.fn().mockImplementationOnce(() => {
            throw new Error();
          }),
        },
      }));

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        variables: { page: 1, language: ArticleLanguage.En },
        query: GET_ARTICLES,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(CONSTANTS.ENDPOINT, {
        language: ArticleLanguage.En.toLowerCase(),
        pageSize: CONSTANTS.PAGE_SIZE,
        apiKey: env.NEWS_API_KEY,
        q: CONSTANTS.QUERY,
        from: dateParam,
        to: dateParam,
        page: 1,
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(data!.articles.items).toEqual([]);
    });

    it('should return an empty array when already paginated all items', async () => {
      mockRestDataSourceGet.mockResolvedValueOnce({
        articles: [],
      });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        variables: { page: 2, language: ArticleLanguage.En },
        query: GET_ARTICLES,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(CONSTANTS.ENDPOINT, {
        language: ArticleLanguage.En.toLowerCase(),
        pageSize: CONSTANTS.PAGE_SIZE,
        apiKey: env.NEWS_API_KEY,
        q: CONSTANTS.QUERY,
        from: dateParam,
        to: dateParam,
        page: 2,
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(data!.articles.items).toEqual([]);
    });

    it('should return the field hasMore as true when has more items to be paginated', async () => {
      mockRestDataSourceGet.mockResolvedValueOnce({
        articles: Array(12).fill(rawArticleWithId),
      });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        variables: { page: 1, language: ArticleLanguage.En },
        query: GET_ARTICLES,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(CONSTANTS.ENDPOINT, {
        language: ArticleLanguage.En.toLowerCase(),
        pageSize: CONSTANTS.PAGE_SIZE,
        apiKey: env.NEWS_API_KEY,
        q: CONSTANTS.QUERY,
        from: dateParam,
        to: dateParam,
        page: 1,
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(data!.articles.hasMore).toEqual(true);
    });

    it('should return hasMore as false when has no more items to be paginated', async () => {
      mockRestDataSourceGet.mockResolvedValueOnce({
        articles: Array(11).fill(rawArticleWithId),
      });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_ARTICLES,
        variables: { page: 1, language: ArticleLanguage.En },
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(CONSTANTS.ENDPOINT, {
        language: ArticleLanguage.En.toLowerCase(),
        pageSize: CONSTANTS.PAGE_SIZE,
        apiKey: env.NEWS_API_KEY,
        q: CONSTANTS.QUERY,
        from: dateParam,
        to: dateParam,
        page: 1,
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(data!.articles.hasMore).toEqual(false);
    });
  });
});
