import TMDBApiError from "./tmdb-api-error";

export default class QueryTrendingTVShowsError extends TMDBApiError {
  constructor(trend: string) {
    super(`Error when tried to query the "${trend}" TV-Show trend`, 502);
  }
}
