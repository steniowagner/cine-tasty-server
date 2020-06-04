import { GetTMDBApiRequest, GetImagesResponse, TheMovieDBHandler } from '@types';

import CONSTANTS from '../../../utils/constants';

class MovieImagesHandler implements TheMovieDBHandler<string> {
  get: GetTMDBApiRequest;

  constructor(execGetRequest: GetTMDBApiRequest) {
    this.get = execGetRequest;
  }

  async handle(id: string): Promise<string[]> {
    const result = await this.get<
      {},
      Promise<GetImagesResponse & { status_code?: number }>
    >(
      `${CONSTANTS.MOVIE_ENDPOINT}/${id}/${CONSTANTS.MOVIE_IMAGES_RESOURCE_ENDPOINT}`,
      {},
      null,
    );

    if (result.status_code === CONSTANTS.TMDBAPI_ITEM_NOT_FOUND_CODE) {
      return [];
    }

    return result.backdrops
      .filter(backdrop => !!backdrop.file_path)
      .map(backdrop => backdrop.file_path);
  }
}

export default MovieImagesHandler;
