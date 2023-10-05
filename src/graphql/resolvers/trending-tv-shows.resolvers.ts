import { mediaGenresHandler } from "@tmdb-api/handlers/media-genres";
import { QueryTrendingTvShowsArgs, Iso6391Language, MediaType } from "@generated-types";
import {
  TrendingTVShowsTypes,
  trendingTVShowsHandler,
} from "@tmdb-api/handlers/trending-tv-shows";
import { Context } from "@types";

export const resolvers = {
  Query: {
    trendingTVShows: () => ({}),
  },

  TrendingTVShows: {
    airingToday: async (
      _parent: undefined,
      params: QueryTrendingTvShowsArgs,
      context: Context,
    ) =>
      trendingTVShowsHandler.handle({
        language: params.language,
        tmdbAPI: context.tmdbAPI,
        trend: "airing-today",
      }),

    onTheAir: async (
      _parent: undefined,
      params: QueryTrendingTvShowsArgs,
      context: Context,
    ) =>
      trendingTVShowsHandler.handle({
        language: params.language,
        tmdbAPI: context.tmdbAPI,
        trend: "on-the-air",
      }),

    popular: async (
      _parent: undefined,
      params: QueryTrendingTvShowsArgs,
      context: Context,
    ) =>
      trendingTVShowsHandler.handle({
        language: params.language,
        tmdbAPI: context.tmdbAPI,
        trend: "popular",
      }),

    topRated: async (
      _parent: undefined,
      params: QueryTrendingTvShowsArgs,
      context: Context,
    ) =>
      trendingTVShowsHandler.handle({
        language: params.language,
        tmdbAPI: context.tmdbAPI,
        trend: "top-rated",
      }),
  },

  TrendingTVShow: {
    backdropPath: (parent: TrendingTVShowsTypes.Result) => parent.backdrop_path,
    firstAirDate: (parent: TrendingTVShowsTypes.Result) => parent.first_air_date,
    genres: async (
      parent: TrendingTVShowsTypes.Result,
      params: QueryTrendingTvShowsArgs,
      context: Context,
    ) =>
      mediaGenresHandler.handle({
        language: params.language as Iso6391Language,
        cacheHandler: context.cacheHandler,
        tmdbAPI: context.tmdbAPI,
        genreIds: parent.genre_ids,
        mediaType: MediaType.Tv,
      }),
    originCountry: (parent: TrendingTVShowsTypes.Result) => parent.origin_country,
    originalLanguage: (parent: TrendingTVShowsTypes.Result) => parent.original_language,
    originalName: (parent: TrendingTVShowsTypes.Result) => parent.original_name,
    posterPath: (parent: TrendingTVShowsTypes.Result) => parent.poster_path,
    voteAverage: (parent: TrendingTVShowsTypes.Result) => parent.vote_average,
    voteCount: (parent: TrendingTVShowsTypes.Result) => parent.vote_count,
  },
};
