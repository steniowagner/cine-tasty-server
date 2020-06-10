const mockRestDataSourceGet = jest.fn();

import { rawMovieDetail } from '../../../../../../../__tests__/mocks/movies';
import { Iso6391Language } from '../../../../../../lib/types';
import TMDBAPI_CONSTANTS from '../../../utils/constants';
import MovieDetailsHandler from './MovieDetailsHandler';
import CONSTANTS from '../utils/constants';

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

let movieDetail: MovieDetailsHandler = null;

describe('Unity: DataSources/TheMovieDBAPI/handlers/movies/MovieDetailsHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    movieDetail = new MovieDetailsHandler(mockRestDataSourceGet);
  });

  it('should get the details of a movie with certain id correctly', async () => {
    const id = '1';

    mockRestDataSourceGet.mockReturnValueOnce(rawMovieDetail);

    const result = await movieDetail.handle({
      language: Iso6391Language.Ptbr,
      id,
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      `${TMDBAPI_CONSTANTS.MOVIE_ENDPOINT}/${id}`,
      {
        append_to_response: CONSTANTS.APPEND_TO_MOVIE_RESPONSE,
      },
      Iso6391Language.Ptbr,
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(result).toEqual(rawMovieDetail);
  });

  it('should return null when the status_code returned is a NOT_FOUND_CODE', async () => {
    const id = '1';

    mockRestDataSourceGet.mockReturnValueOnce({
      status_code: TMDBAPI_CONSTANTS.TMDBAPI_ITEM_NOT_FOUND_CODE,
    });

    const result = await movieDetail.handle({
      language: Iso6391Language.Ptbr,
      id,
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      `${TMDBAPI_CONSTANTS.MOVIE_ENDPOINT}/${id}`,
      {
        append_to_response: CONSTANTS.APPEND_TO_MOVIE_RESPONSE,
      },
      Iso6391Language.Ptbr,
    );

    expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

    expect(result).toBeNull();
  });
});
