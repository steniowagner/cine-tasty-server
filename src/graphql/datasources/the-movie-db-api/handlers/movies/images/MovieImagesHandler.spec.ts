const mockRestDataSourceGet = jest.fn();

import { getImagesResult, image } from '../../../../../../../__tests__/mocks/images';
import MovieImagesHandler from './MovieImagesHandler';
import CONSTANTS from '../../../utils/constants';

let movieImagesHandler: MovieImagesHandler = null;

const filePaths = getImagesResult.backdrops.map(backdrop => backdrop.file_path);

describe('Unity: DataSources/TheMovieDBAPI/handlers/MovieImagesHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    movieImagesHandler = new MovieImagesHandler(mockRestDataSourceGet);
  });

  it('should return an array of strings containing urls to images of a certain movie', async () => {
    mockRestDataSourceGet.mockReturnValueOnce(getImagesResult);

    const result = await movieImagesHandler.handle('1');

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      `${CONSTANTS.MOVIE_ENDPOINT}/1/${CONSTANTS.MOVIE_IMAGES_RESOURCE_ENDPOINT}`,
      {},
      null,
    );

    expect(result).toEqual(filePaths);

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);
  });

  it('should return an array of strings containing urls to images of a certain movie when the file_path of some item is an empty string', async () => {
    mockRestDataSourceGet.mockReturnValueOnce({
      ...getImagesResult,
      backdrops: [...getImagesResult.backdrops, { ...image, file_path: '' }],
    });

    const result = await movieImagesHandler.handle('1');

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      `${CONSTANTS.MOVIE_ENDPOINT}/1/${CONSTANTS.MOVIE_IMAGES_RESOURCE_ENDPOINT}`,
      {},
      null,
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(result).toEqual(filePaths);
  });

  it("should return an empty array when the movie requested doesn't exists", async () => {
    mockRestDataSourceGet.mockReturnValueOnce({
      status_code: CONSTANTS.TMDBAPI_ITEM_NOT_FOUND_CODE,
    });

    const result = await movieImagesHandler.handle('1');

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      `${CONSTANTS.MOVIE_ENDPOINT}/1/${CONSTANTS.MOVIE_IMAGES_RESOURCE_ENDPOINT}`,
      {},
      null,
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(result).toEqual([]);
  });
});
