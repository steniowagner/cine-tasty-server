import { QueryTvShowArgs } from "@generated-types";
import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { CONSTANTS as TMDB_CONSTANS } from "@tmdb-api/utils";

import { Response } from "./tv-show-details.types";

export const handler = {
  handle: async (params: QueryTvShowArgs, tmdbAPI: TheMovieDBAPI) =>
    tmdbAPI.handle<Response>(`tv/${params.id}`, {
      language: params.language ?? TMDB_CONSTANS.FALLBACK_LANGUAGE,
    }),
};
