import { QueryTrendingTvShowsArgs } from "@generated-types";
import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { CONSTANTS as TMDB_CONSTANTS } from "@tmdb-api/utils";
import { TMDBApiErrors } from "@errors";

import { Response } from "./trending-tv-shows.types";

export type Trend = "airing-today" | "on-the-air" | "popular" | "top-rated";

type Params = QueryTrendingTvShowsArgs & {
  trend: Trend;
  tmdbAPI: TheMovieDBAPI;
};

export const trendEndpointMapping: Record<Trend, string> = {
  "airing-today": "tv/airing_today",
  "on-the-air": "tv/on_the_air",
  popular: "tv/popular",
  "top-rated": "tv/top_rated",
};

export const handler = {
  handle: async (params: Params) => {
    const endpoint = trendEndpointMapping[params.trend];
    const response = await params.tmdbAPI.handle<Response>(endpoint, {
      language: params.language ?? TMDB_CONSTANTS.FALLBACK_LANGUAGE,
      page: "1",
    });
    if (!response) {
      throw new TMDBApiErrors.QueryTrendingTVShowsError(params.trend);
    }
    return response.results;
  },
};
