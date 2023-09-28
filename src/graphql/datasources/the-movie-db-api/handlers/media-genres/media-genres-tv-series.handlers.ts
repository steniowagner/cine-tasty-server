import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { CastTvShowGenreIdsArgs } from "@generated-types";
import { CONSTANTS as TMDB_CONSTANS } from "@tmdb-api/utils";

import { CONSTANTS } from "./media-genres.constants";
import { Response } from "./media-genres.types";
import { parseResponse } from "./parse-response";

type HandlerParams = CastTvShowGenreIdsArgs & {
  tmdbAPI: TheMovieDBAPI;
  genreIds: number[];
};

export const handler = {
  handle: async (params: HandlerParams) => {
    const response = await params.tmdbAPI.handle<Response>(CONSTANTS.TV_SHOWS_ENDPOINT, {
      language: params.language?.toLowerCase() ?? TMDB_CONSTANS.FALLBACK_LANGUAGE,
    });
    if (!response) {
      return [];
    }
    return parseResponse(response, params.genreIds);
  },
};
