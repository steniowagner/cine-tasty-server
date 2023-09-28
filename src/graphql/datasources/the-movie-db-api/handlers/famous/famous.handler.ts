import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { QueryFamousArgs } from "@generated-types";

import { Response } from "./famous.types";
import { CONSTANTS } from "./famous.constants";

export const handler = {
  handle: async (tmdbAPI: TheMovieDBAPI, params: QueryFamousArgs) =>
    tmdbAPI.handle<Response>(`${CONSTANTS.ENDPOINT}/${params.id}`, {
      append_to_response: "images",
    }),
};
