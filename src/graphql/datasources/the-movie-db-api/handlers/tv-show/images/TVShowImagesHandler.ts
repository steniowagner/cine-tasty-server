import { GetTMDBApiRequest, GetImagesResponse } from '@types';

import TheMovieDBHandler from '../../TheMovieDBHandler';
import CONSTANTS from '../../../utils/constants';

class TVShowImagesHandler extends TheMovieDBHandler<string> {
  constructor(getRequest: GetTMDBApiRequest) {
    super(getRequest);
  }

  async handle(id: string): Promise<string[]> {
    const result = await this.get<
      {},
      Promise<GetImagesResponse & { status_code?: number }>
    >(`${CONSTANTS.TV_ENDPOINT}/${id}/${CONSTANTS.MOVIE_IMAGES_RESOURCE_ENDPOINT}`, {});

    if (result.status_code === CONSTANTS.TMDBAPI_ITEM_NOT_FOUND_CODE) {
      return [];
    }

    return result.backdrops
      .filter(backdrop => !!backdrop.file_path)
      .map(backdrop => backdrop.file_path);
  }
}

export default TVShowImagesHandler;
