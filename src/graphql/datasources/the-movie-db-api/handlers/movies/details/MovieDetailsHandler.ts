import { QueryMovieArgs, MovieResponse } from '@lib/types';
import { GetTMDBApiRequest } from '@tmdb-api-types';

import TMDBAPI_CONSTANTS from '../../../utils/constants';
import TheMovieDBHandler from '../../TheMovieDBHandler';
import CONSTANTS from '../../../utils/constants';

type GetRequestParams = { page: number } | { append_to_response: string } | {};

class MovieDetailsHandler extends TheMovieDBHandler<QueryMovieArgs> {
  constructor(getRequest: GetTMDBApiRequest) {
    super(getRequest);
  }

  async handle({ id, language }: QueryMovieArgs): Promise<MovieResponse | null> {
    const result = await this.get<
      GetRequestParams,
      Promise<MovieResponse & { status_code?: number }>
    >(
      `${TMDBAPI_CONSTANTS.MOVIE_ENDPOINT}/${id}`,
      { append_to_response: CONSTANTS.APPEND_TO_MOVIE_RESPONSE },
      language,
    );

    if (result.status_code === TMDBAPI_CONSTANTS.TMDBAPI_ITEM_NOT_FOUND_CODE) {
      return null;
    }

    return result;
  }
}

export default MovieDetailsHandler;
