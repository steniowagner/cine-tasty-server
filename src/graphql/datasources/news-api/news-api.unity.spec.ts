const mockRestDataSourceGet = jest.fn();

import { rawArticleWithId, articleWithId } from '../../../../__tests__/mocks/articles';
import { ArticleLanguage } from '../../../lib/types';
import env from '../../../config/environment';
import { makeDateParam } from './helpers';
import CONSTANTS from './utils/constants';
import NewsAPI from './NewsAPI';

const dateParam = makeDateParam();

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

describe('Unity: DataSources/NewsAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getArticles()', () => {
    it('should be called with correct params', async () => {
      mockRestDataSourceGet.mockReturnValue({
        status: CONSTANTS.STATUS_OK,
        articles: [rawArticleWithId],
      });

      const newsAPI = new NewsAPI();

      await newsAPI.getArticles({ page: 1, language: ArticleLanguage.En });

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
    });

    it('should parse the returned "items" and return it correctly', async () => {
      mockRestDataSourceGet.mockReturnValue({
        status: CONSTANTS.STATUS_OK,
        articles: [rawArticleWithId],
      });

      const newsAPI = new NewsAPI();

      const result = await newsAPI.getArticles({ page: 1, language: ArticleLanguage.En });

      expect(result).toEqual({
        items: [articleWithId],
        hasMore: false,
      });
    });

    it('should return "hasMore" as "true" when the crurent page returned the same number of items of PAGE_SIZE', async () => {
      mockRestDataSourceGet.mockReturnValue({
        articles: Array(CONSTANTS.PAGE_SIZE).fill(rawArticleWithId),
        status: CONSTANTS.STATUS_OK,
      });

      const newsAPI = new NewsAPI();

      const result = await newsAPI.getArticles({ page: 1, language: ArticleLanguage.En });

      expect(result).toEqual({
        items: Array(CONSTANTS.PAGE_SIZE).fill(articleWithId),
        hasMore: true,
      });
    });

    it('should return an "empty array" of "items" and "hasMore" as "false" when the returned status is other than ok', async () => {
      mockRestDataSourceGet.mockReturnValue({
        status: 'other',
      });

      const newsAPI = new NewsAPI();

      const result = await newsAPI.getArticles({ page: 1, language: ArticleLanguage.En });

      expect(result).toEqual({
        hasMore: false,
        items: [],
      });
    });

    it('should return an "empty array" of "items" and "hasMore" as "false" when some error is thrown', async () => {
      mockRestDataSourceGet.mockReturnValueOnce(new Error());

      const newsAPI = new NewsAPI();

      const result = await newsAPI.getArticles({ page: 1, language: ArticleLanguage.En });

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

      expect(result).toEqual({
        hasMore: false,
        items: [],
      });
    });
  });
});
