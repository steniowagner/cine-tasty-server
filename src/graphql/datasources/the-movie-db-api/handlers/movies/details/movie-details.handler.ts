import { CONSTANTS as TMDB_CONSTANTS } from "@tmdb-api/utils";
import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { QueryMovieArgs } from "@generated-types";
import * as TMDBApiErrors from "@/graphql/errors/tmdb-api";

export const handler = async (params: QueryMovieArgs, tmdbAPI: TheMovieDBAPI) => {
  const response = await tmdbAPI.handle(`movie/${params.id}`, {
    language: params.language ?? TMDB_CONSTANTS.FALLBACK_LANGUAGE,
  });
  if (!response) {
    throw new TMDBApiErrors.QueryMovieError(params.id);
  }
  return response;
};
