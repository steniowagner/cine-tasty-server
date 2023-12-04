import { CONSTANTS as TMDB_CONSTANS } from "@tmdb-api/utils";
import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";

import { Response, Params } from "./movie-similar.types";

export const handler = async (params: Params, tmdbAPI: TheMovieDBAPI) => {
  const response = await tmdbAPI.handle<Response>(`movie/${params.id}/similar`, {
    language: params.language ?? TMDB_CONSTANS.FALLBACK_LANGUAGE,
  });
  if (!response) {
    return [];
  }
  return response.results;
};
