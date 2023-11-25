import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { CONSTANTS as TMDB_CONSTANS } from "@tmdb-api/utils";

import { Response, Params } from "./tv-show-details.types";

const APPEND_TO_RESPONSE = ["credits"];

export const handler = async (params: Params, tmdbAPI: TheMovieDBAPI) =>
  tmdbAPI.handle<Response>(`tv/${params.id}`, {
    language: params.language ?? TMDB_CONSTANS.FALLBACK_LANGUAGE,
    append_to_response: APPEND_TO_RESPONSE.join(","),
  });
