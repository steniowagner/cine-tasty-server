import { TrendingMoviesTypes } from "@tmdb-api/handlers/trending-movies";
import { QueryTrendingMoviesArgs } from "@generated-types";
import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { CONSTANTS as TMDB_API } from "@tmdb-api/utils";

export type Trend = "now-playing" | "popular" | "top-rated" | "upcoming";

export const trendEndpointMapping: Record<Trend, string> = {
  "now-playing": "movie/now_playing",
  popular: "movie/popular",
  "top-rated": "movie/top_rated",
  upcoming: "movie/upcoming",
};

type HandlerParams = QueryTrendingMoviesArgs & {
  tmdbAPI: TheMovieDBAPI;
  trend: Trend;
};

export const handler = {
  handle: async (params: HandlerParams) => {
    const endpoint = trendEndpointMapping[params.trend];
    const response = await params.tmdbAPI.handle<TrendingMoviesTypes.Response>(endpoint, {
      language: params.language ?? TMDB_API.FALLBACK_LANGUAGE,
      page: "1",
    });
    if (!response) {
      return [];
    }
    return response.results;
  },
};
