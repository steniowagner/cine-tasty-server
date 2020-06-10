const mockRestDataSourceGet = jest.fn();

import { rawTVShowDetail } from '../../../../../../../__tests__/mocks/tvshows';
import { Iso6391Language } from '../../../../../../lib/types';
import TVShowDetailsHandler from './TVShowDetailsHandler';
import CONSTANTS from '../../../utils/constants';

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

let tvShowDetailsHandler: TVShowDetailsHandler = null;

const id = '1';

describe('Unity: DataSources/TheMovieDBAPI/handlers/tv-show/details/TVShowDetailsHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    tvShowDetailsHandler = new TVShowDetailsHandler(mockRestDataSourceGet);
  });

  it('should get the details of a tv-show with certain id and return the result correctly', async () => {
    mockRestDataSourceGet.mockReturnValueOnce(rawTVShowDetail);

    await tvShowDetailsHandler.handle({
      language: Iso6391Language.Ptbr,
      id,
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      `${CONSTANTS.TV_ENDPOINT}/${id}`,
      {
        append_to_response: CONSTANTS.APPEND_TO_TV_SHOW_RESPONSE,
      },
      Iso6391Language.Ptbr,
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);
  });

  it('should return null when the status_code returned is NOT_FOUND_CODE', async () => {
    mockRestDataSourceGet.mockReturnValueOnce({
      status_code: CONSTANTS.TMDBAPI_ITEM_NOT_FOUND_CODE,
    });

    const result = await tvShowDetailsHandler.handle({
      language: Iso6391Language.Ptbr,
      id,
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      `${CONSTANTS.TV_ENDPOINT}/${id}`,
      {
        append_to_response: CONSTANTS.APPEND_TO_TV_SHOW_RESPONSE,
      },
      Iso6391Language.Ptbr,
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(result).toBeNull();
  });
});
