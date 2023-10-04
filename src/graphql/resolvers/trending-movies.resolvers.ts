import {
  TrendingMoviesTypes,
  trendingMoviesHandler,
} from "@tmdb-api/handlers/trending-movies";
import {
  QueryTrendingMoviesArgs,
  TrendingMovieGenresArgs,
  Iso6391Language,
} from "@generated-types";
import { Context } from "@types";
import { mediaGenresHandler } from "@tmdb-api/handlers/media-genres";

export const resolvers = {
  Query: {
    trendingMovies: () => ({}),
  },

  TrendingMovie: {
    backdropPath: (parent: TrendingMoviesTypes.Result) => parent.backdrop_path,
    genres: (
      parent: TrendingMoviesTypes.Result,
      params: TrendingMovieGenresArgs,
      context: Context,
    ) =>
      mediaGenresHandler.handle({
        cacheHandler: context.cacheHandler,
        tmdbAPI: context.tmdbAPI,
        genreIds: parent.genre_ids,
        language: params.language as Iso6391Language,
        mediaType: "movie",
      }),
    originalLanguage: (parent: TrendingMoviesTypes.Result) => parent.original_language,
    originalTitle: (parent: TrendingMoviesTypes.Result) => parent.original_title,
    posterPath: (parent: TrendingMoviesTypes.Result) => parent.poster_path,
    releaseDate: (parent: TrendingMoviesTypes.Result) => parent.release_date,
    voteAverage: (parent: TrendingMoviesTypes.Result) => parent.vote_average,
    voteCount: (parent: TrendingMoviesTypes.Result) => parent.vote_count,
  },

  TrendingMovies: {
    nowPlaying: async (
      _parent: undefined,
      params: QueryTrendingMoviesArgs,
      context: Context,
    ) =>
      trendingMoviesHandler.handle({
        language: params.language,
        tmdbAPI: context.tmdbAPI,
        trend: "now-playing",
      }),

    popular: async (
      _parent: undefined,
      params: QueryTrendingMoviesArgs,
      context: Context,
    ) =>
      trendingMoviesHandler.handle({
        language: params.language,
        tmdbAPI: context.tmdbAPI,
        trend: "popular",
      }),

    topRated: async (
      _parent: undefined,
      params: QueryTrendingMoviesArgs,
      context: Context,
    ) =>
      trendingMoviesHandler.handle({
        language: params.language,
        tmdbAPI: context.tmdbAPI,
        trend: "top-rated",
      }),

    upcoming: async (
      _parent: undefined,
      params: QueryTrendingMoviesArgs,
      context: Context,
    ) =>
      trendingMoviesHandler.handle({
        language: params.language,
        tmdbAPI: context.tmdbAPI,
        trend: "upcoming",
      }),
  },
};
