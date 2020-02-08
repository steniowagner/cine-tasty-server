const mockRestDataSourceGet = jest.fn();

import { ArticleLanguage } from '../../../../../lib/types';
import {
  rawArticleWithId,
  articleWithId,
} from '../../../../../__tests__/mocks/articles.stub';
import getDateParam from '../../helpers/getDateParam';
import env from '../../../../../config/environment';
import CONSTANTS from '../../utils/constants';
import NewsAPI from '../..';

const dateParam = getDateParam();

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

describe('Unity: NewsAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getArticles()', () => {
    it('should fetch movie articles from NewsAPI and return it correctly', async () => {
      mockRestDataSourceGet.mockReturnValue({
        status: CONSTANTS.STATUS_OK,
        articles: [rawArticleWithId],
      });

      const newsAPI = new NewsAPI();

      const result = await newsAPI.getArticles({ page: 1 });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(CONSTANTS.ENDPOINT, {
        apiKey: env.NEWS_API_KEY,
        pageSize: CONSTANTS.PAGE_SIZE,
        from: dateParam,
        to: dateParam,
        q: CONSTANTS.QUERY,
        page: 1,
      });

      expect(result).toMatchSnapshot();
    });

    it('should fetch movie articles from NewsAPI and return it correctly when a language is provided', async () => {
      mockRestDataSourceGet.mockReturnValue({
        status: CONSTANTS.STATUS_OK,
        articles: [rawArticleWithId],
      });

      const newsAPI = new NewsAPI();

      const result = await newsAPI.getArticles({ page: 1, language: ArticleLanguage.Pt });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(CONSTANTS.ENDPOINT, {
        apiKey: env.NEWS_API_KEY,
        pageSize: CONSTANTS.PAGE_SIZE,
        from: dateParam,
        language: 'pt',
        to: dateParam,
        q: CONSTANTS.QUERY,
        page: 1,
      });

      expect(result).toEqual({
        hasMore: false,
        items: [articleWithId],
      });
    });

    it('should return an empty array when the returned status is other than ok', async () => {
      mockRestDataSourceGet.mockReturnValue({
        status: 'other',
      });

      const newsAPI = new NewsAPI();

      const result = await newsAPI.getArticles({ page: 1 });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(CONSTANTS.ENDPOINT, {
        apiKey: env.NEWS_API_KEY,
        pageSize: CONSTANTS.PAGE_SIZE,
        from: dateParam,
        to: dateParam,
        q: CONSTANTS.QUERY,
        page: 1,
      });

      expect(result).toEqual({
        hasMore: false,
        items: [],
      });
    });
  });
});
