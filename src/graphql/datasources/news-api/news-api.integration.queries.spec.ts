import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';

const mockRestDataSourceGet = jest.fn();

import { ArticleLanguage } from '../../../lib/types';
import env from '../../../config/environment';

import { rawArticleWithId, articleWithId } from '../../../../__tests__/mocks/articles';
import { makeDateParam } from './helpers';
import resolvers from '../../resolvers';
import typeDefs from '../../typeDefs';
import CONSTANTS from './utils/constants';
import NewsAPI from './NewsAPI';

const dateParam = makeDateParam();

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

describe('Integration: DataSources/NewsAPI [Queries]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('Testing Querying Articles', () => {
    it('should query articles from the News API and return it correctly', async () => {
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

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

      expect(data).toBeTruthy();

      expect(data).toHaveProperty('articles');

      expect(data.articles.items).toEqual([articleWithId]);

      expect(data.articles.hasMore).toEqual(false);
    });

    it('should return an "empty array" of "articles" and "hasMore" as "false" when some error is thrown', async () => {
      jest.mock('apollo-datasource-rest', () => ({
        RESTDataSource: {
          get: jest.fn().mockReturnValueOnce(new Error()),
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

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

      expect(data).toBeTruthy();

      expect(data).toHaveProperty('articles');

      expect(data.articles.items).toEqual([]);

      expect(data.articles.hasMore).toBe(false);
    });

    it('should return an "empty array" of "articles" and "hasMore" as "false" when an empty array of articles is returned from News-API', async () => {
      mockRestDataSourceGet.mockResolvedValueOnce({
        articles: [],
      });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        variables: { page: 2, language: ArticleLanguage.En },
        query: GET_ARTICLES,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(CONSTANTS.ENDPOINT, {
        language: ArticleLanguage.En.toLowerCase(),
        pageSize: CONSTANTS.PAGE_SIZE,
        apiKey: env.NEWS_API_KEY,
        q: CONSTANTS.QUERY,
        from: dateParam,
        to: dateParam,
        page: 2,
      });

      expect(data).toBeTruthy();

      expect(data).toHaveProperty('articles');

      expect(data.articles.items).toEqual([]);

      expect(data.articles.hasMore).toEqual(false);
    });

    it('should return the field "hasMore" as "true" when the number of articles returned from News-API is the same of the PAGE-SIZE', async () => {
      mockRestDataSourceGet.mockResolvedValueOnce({
        articles: Array(12).fill(rawArticleWithId),
      });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        variables: { page: 1, language: ArticleLanguage.En },
        query: GET_ARTICLES,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(CONSTANTS.ENDPOINT, {
        language: ArticleLanguage.En.toLowerCase(),
        pageSize: CONSTANTS.PAGE_SIZE,
        apiKey: env.NEWS_API_KEY,
        q: CONSTANTS.QUERY,
        from: dateParam,
        to: dateParam,
        page: 1,
      });

      expect(data).toBeTruthy();

      expect(data).toHaveProperty('articles');

      expect(data.articles.items).toEqual(Array(12).fill(articleWithId));

      expect(data.articles.hasMore).toEqual(true);
    });

    it('should return "hasMore" as "false" when the number of items returned by News-API is less than the PAGE-SIZE', async () => {
      mockRestDataSourceGet.mockResolvedValueOnce({
        articles: Array(CONSTANTS.PAGE_SIZE - 1).fill(rawArticleWithId),
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

      expect(data).toBeTruthy();

      expect(data).toHaveProperty('articles');

      expect(data.articles.items).toEqual(
        Array(CONSTANTS.PAGE_SIZE - 1).fill(articleWithId),
      );

      expect(data.articles.hasMore).toEqual(false);
    });
  });
});
