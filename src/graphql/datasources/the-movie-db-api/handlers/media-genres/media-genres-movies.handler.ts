import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { CastMovieGenreIdsArgs } from "@generated-types";
import { CONSTANTS as TMDBAPI_CONSTANTS } from "@tmdb-api/utils";

import { CONSTANTS } from "./media-genres.constants";
import { Response } from "./media-genres.types";
import { parseResponse } from "./parse-response";

type HandlerParams = CastMovieGenreIdsArgs & {
  tmdbAPI: TheMovieDBAPI;
  genreIds: number[];
};

export const handler = {
  handle: async (params: HandlerParams) => {
    const response = await params.tmdbAPI.handle<Response>(CONSTANTS.MOVIES_ENDPOINT, {
      language: params.language ?? TMDBAPI_CONSTANTS.FALLBACK_LANGUAGE,
    });
    if (!response) {
      return [];
    }
    return parseResponse(response, params.genreIds);
  },
};
