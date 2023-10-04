import TMDBApiError from "./tmdb-api-error";

export class QueryMovieError extends TMDBApiError {
  constructor(movieId: number) {
    super(`Error when tried to query the movie "${movieId}"`, 502);
  }
}
