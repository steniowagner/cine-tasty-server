import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { QueryFamousArgs } from "@generated-types";
import { CONSTANTS as TMDBAPI_CONSTANS } from "@tmdb-api/utils";

import { Response } from "./famous.types";
import { CONSTANTS } from "./famous.constants";

export const handler = {
  handle: async (tmdbAPI: TheMovieDBAPI, params: QueryFamousArgs) =>
    tmdbAPI.handle<Response>(`${CONSTANTS.ENDPOINT}/${params.id}`, {
      language: params.language ?? TMDBAPI_CONSTANS.FALLBACK_LANGUAGE,
      append_to_response: "images",
    }),
};
