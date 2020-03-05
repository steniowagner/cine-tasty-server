const mockRestDataSourceGet = jest.fn();

import { InvalidTMDBApiKey } from '../../../../../errors';
import env from '../../../../../config/environment';
import TheMovieDBAPI from '../..';

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

describe('Unity: TheMovieDBAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('execGetRequest()', () => {
    it('should throw an error when receive a "Invalid API Key - code 7"', async () => {
      mockRestDataSourceGet.mockReturnValue({ status_code: 7 });

      const tmdbAPI = new TheMovieDBAPI();

      expect(tmdbAPI.execGetRequest('endpoint', {})).rejects.toThrowError(
        InvalidTMDBApiKey,
      );

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith('endpoint', {
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
      });
    });
  });
});
