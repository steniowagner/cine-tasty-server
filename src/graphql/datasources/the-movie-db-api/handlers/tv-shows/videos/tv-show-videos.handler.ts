import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { CONSTANTS as TMDB_CONSTANS } from "@tmdb-api/utils";

import { Response } from "./tv-show-videos.types";
import { Params } from "./tv-show-videos.types";

const ACCEPTED_SITES = ["YouTube"];

export const handler = async (params: Params, tmdbAPI: TheMovieDBAPI) => {
  const response = await tmdbAPI.handle<Response>(`tv/${params.id}/videos`, {
    language: params.language ?? TMDB_CONSTANS.FALLBACK_LANGUAGE,
  });
  if (!response) {
    return [];
  }
  return response.results.filter((result) => ACCEPTED_SITES.includes(result.site));
};
