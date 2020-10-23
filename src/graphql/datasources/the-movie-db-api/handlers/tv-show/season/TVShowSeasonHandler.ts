import { QueryTvShowSeasonArgs, TvShowSeasonResponse } from '@lib/types';
import { GetTMDBApiRequest } from '@tmdb-api-types';

import TheMovieDBAPIHandler from '../../TheMovieDBAPIHandler';
import CONSTANTS from '../../../utils/constants';

class TVShowSeasonHandler extends TheMovieDBAPIHandler<QueryTvShowSeasonArgs> {
  constructor(getRequest: GetTMDBApiRequest) {
    super(getRequest);
  }

  async handle({
    language,
    season,
    id,
  }: QueryTvShowSeasonArgs): Promise<TvShowSeasonResponse | null> {
    const tvShowSeason = await this.get<
      {},
      Promise<TvShowSeasonResponse & { status_code?: number }>
    >(`${CONSTANTS.TV_ENDPOINT}/${id}/season/${season}`, {}, language);

    if (tvShowSeason.status_code === CONSTANTS.TMDBAPI_ITEM_NOT_FOUND_CODE) {
      return null;
    }

    return tvShowSeason;
  }
}

export default TVShowSeasonHandler;
