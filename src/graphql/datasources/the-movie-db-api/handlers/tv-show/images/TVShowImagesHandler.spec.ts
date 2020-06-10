const mockRestDataSourceGet = jest.fn();

import { getImagesResult, images } from '../../../../../../../__tests__/mocks/images';
import TVShowImagesHandler from './TVShowImagesHandler';
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

let tvShowImagesHandler: TVShowImagesHandler = null;

describe('Unity: DataSources/TheMovieDBAPI/handlers/tv-show/images/TVShowImagesHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    tvShowImagesHandler = new TVShowImagesHandler(mockRestDataSourceGet);
  });

  it('should get the images of a tv-show with certain id and return the result correctly', async () => {
    const id = '1';

    mockRestDataSourceGet.mockReturnValueOnce(getImagesResult);

    const result = await tvShowImagesHandler.handle(id);

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      `${CONSTANTS.TV_ENDPOINT}/${id}/${CONSTANTS.MOVIE_IMAGES_RESOURCE_ENDPOINT}`,
      {},
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(result).toEqual(images);
  });

  it('should get the images of a tv-show with certain id and return the result correctly when some items doenst have the file_path field', async () => {
    const id = '1';

    mockRestDataSourceGet.mockReturnValueOnce({
      ...getImagesResult,
      backdrops: [...getImagesResult.backdrops, { file_path: '' }],
    });

    const result = await tvShowImagesHandler.handle(id);

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      `${CONSTANTS.TV_ENDPOINT}/${id}/${CONSTANTS.MOVIE_IMAGES_RESOURCE_ENDPOINT}`,
      {},
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(result).toEqual(images);
  });

  it('should return an empty array when the status_code returned is NOT_FOUND_CODE', async () => {
    const id = '1';

    mockRestDataSourceGet.mockReturnValueOnce({
      status_code: CONSTANTS.TMDBAPI_ITEM_NOT_FOUND_CODE,
    });

    const result = await tvShowImagesHandler.handle(id);

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      `${CONSTANTS.TV_ENDPOINT}/${id}/${CONSTANTS.MOVIE_IMAGES_RESOURCE_ENDPOINT}`,
      {},
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(Array.isArray(result)).toBe(true);

    expect(result.length).toBe(0);
  });
});
