const mockRestDataSourceGet = jest.fn();

import { rawTVShowSeason } from '../../../../../../../__tests__/mocks/tvshows';
import { Iso6391Language } from '../../../../../../lib/types';
import TVShowSeasonHandler from './TVShowSeasonHandler';
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

let tvShowSeasonHandler: TVShowSeasonHandler = null;

const season = 1;
const id = '1';

describe('Unity: DataSources/TheMovieDBAPI/handlers/tv-show/seasons/TVShowSeasonHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    tvShowSeasonHandler = new TVShowSeasonHandler(mockRestDataSourceGet);
  });

  it('should get the season-info of a tv-show with certain id for a certain season and return the result correctly', async () => {
    mockRestDataSourceGet.mockReturnValueOnce(rawTVShowSeason);

    const result = await tvShowSeasonHandler.handle({
      language: Iso6391Language.Ptbr,
      season,
      id,
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      `${CONSTANTS.TV_ENDPOINT}/${id}/season/${season}`,
      {},
      Iso6391Language.Ptbr,
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(result).toEqual(rawTVShowSeason);
  });

  it('should return null when the status_code returned is NOT_FOUND_CODE', async () => {
    mockRestDataSourceGet.mockReturnValueOnce({
      status_code: CONSTANTS.TMDBAPI_ITEM_NOT_FOUND_CODE,
    });

    const result = await tvShowSeasonHandler.handle({
      language: Iso6391Language.Ptbr,
      season,
      id,
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      `${CONSTANTS.TV_ENDPOINT}/${id}/season/${season}`,
      {},
      Iso6391Language.Ptbr,
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(result).toBeNull();
  });
});
