import { CONSTANTS as TMDB_CONSTANS } from "@tmdb-api/utils";
import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { TvShowSimilarArgs } from "@generated-types";

import { Response } from "./tv-show-similar.types";

export const handle = async (params: TvShowSimilarArgs, tmdbAPI: TheMovieDBAPI) => {
  const response = await tmdbAPI.handle<Response>(`tv/${params.id}/similar`, {
    language: params.language ?? TMDB_CONSTANS.FALLBACK_LANGUAGE,
  });
  if (!response) {
    return [];
  }
  return response.results;
};
