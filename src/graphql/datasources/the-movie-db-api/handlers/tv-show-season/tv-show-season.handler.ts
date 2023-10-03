import { QueryTvShowSeasonArgs } from "@generated-types";
import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";

import { CONSTANTS as TMDB_CONSTANS } from "@tmdb-api/utils";
import { CONSTANTS } from "./tv-show-season.constants";

export const handler = {
  handle: async (params: QueryTvShowSeasonArgs, tmdbAPI: TheMovieDBAPI) => {
    const endpoint = CONSTANTS.ENDPOINT(params.input.id, params.input.season);
    return tmdbAPI.handle(endpoint, {
      language: params.input.language ?? TMDB_CONSTANS.FALLBACK_LANGUAGE,
    });
  },
};
