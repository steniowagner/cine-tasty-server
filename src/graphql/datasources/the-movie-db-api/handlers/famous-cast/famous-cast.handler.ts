import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { FamousCastArgs } from "@generated-types";
import { CONSTANTS as TMDB_CONSTANS } from "@tmdb-api/utils";

import { CONSTANTS } from "./famous-cast.constants";
import { Response, MovieCast, TvShowCast } from "./famous-cast.types";

type HandlerParams = FamousCastArgs & {
  tmdbAPI: TheMovieDBAPI;
  id: number;
};

export const handler = {
  handle: async (params: HandlerParams) => {
    const response = await params.tmdbAPI.handle<Response>(
      CONSTANTS.ENDPOINT(params.id),
      {
        language: params.language ?? TMDB_CONSTANS.FALLBACK_LANGUAGE,
      },
    );
    if (!response) {
      return {
        moviesCast: [],
        tvShowsCast: [],
      };
    }
    return {
      moviesCast: response.cast.filter(
        (cast) => cast.media_type === "movie",
      ) as MovieCast[],
      tvShowsCast: response.cast.filter(
        (cast) => cast.media_type === "tv",
      ) as TvShowCast[],
    };
  },
};
