import { GetTMDBApiRequest, GetImagesResponse } from '@tmdb-api-types';

import TheMovieDBAPIHandler from '../../TheMovieDBAPIHandler';
import CONSTANTS from '../../../utils/constants';

class MovieImagesHandler extends TheMovieDBAPIHandler<string> {
  constructor(getRequest: GetTMDBApiRequest) {
    super(getRequest);
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
