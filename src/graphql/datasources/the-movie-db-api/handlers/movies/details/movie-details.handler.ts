import { CONSTANTS as TMDB_CONSTANTS } from "@tmdb-api/utils";
import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import * as TMDBApiErrors from "@/graphql/errors/tmdb-api";

import { Response, Params } from "./movie-details.types";

export const APPEND_TO_RESPONSE = ["credits"];

export const handler = async (params: Params, tmdbAPI: TheMovieDBAPI) => {
  const response = await tmdbAPI.handle<Response>(`movie/${params.id}`, {
    language: params.language ?? TMDB_CONSTANTS.FALLBACK_LANGUAGE,
    append_to_response: APPEND_TO_RESPONSE.join(","),
  });
  if (!response) {
    throw new TMDBApiErrors.QueryMovieError(params.id);
  }
  return response;
};
