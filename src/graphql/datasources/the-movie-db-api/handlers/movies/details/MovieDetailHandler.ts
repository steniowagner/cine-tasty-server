import { GetTMDBApiRequest, TheMovieDBHandler } from '@types';
import { QueryMovieArgs, Movie } from '@lib/types';

import TMDBAPI_CONSTANTS from '../../../utils/constants';
import CONSTANTS from '../utils/constants';

type GetRequestParams = { page: number } | { append_to_response: string } | {};

class MovieDetailHandler implements TheMovieDBHandler<QueryMovieArgs> {
  get: GetTMDBApiRequest;

  constructor(execGetRequest: GetTMDBApiRequest) {
    this.get = execGetRequest;
  }

  async handle({ id, language }: QueryMovieArgs): Promise<Movie | null> {
    const result = await this.get<
      GetRequestParams,
      Promise<Movie & { status_code?: number }>
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

export default MovieDetailHandler;
