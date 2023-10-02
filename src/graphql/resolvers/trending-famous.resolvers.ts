import {
  QueryTrendingFamousArgs,
  TrendingFamousKnowForMovieGenresArgs,
} from "@generated-types";
import { trendingFamousHandler } from "@tmdb-api/handlers/trending-famous";
import { Context } from "@types";
import { CONSTANTS as TMDB_CONSTANTS } from "@tmdb-api/utils";
import { CONSTANTS as MEDIA_GENRES_CONSTANTS } from "@tmdb-api/handlers/media-genres";
import { TrendingFamousTypes } from "@tmdb-api/handlers/trending-famous";
import { mediaGenresHandler } from "@tmdb-api/handlers/media-genres";

export const resolvers = {
  Query: {
    trendingFamous: async (
      _parent: undefined,
      params: QueryTrendingFamousArgs,
      context: Context,
    ) => trendingFamousHandler.handle(params, context.tmdbAPI),
  },

  TrendingFamousItem: {
    profilePath: (parent: TrendingFamousTypes.Result) => parent.profile_path,
    knownFor: (parent: TrendingFamousTypes.Result) => parent.known_for,
  },

  TrendingFamousKnowForTVShow: {
    backdropPath: (parent: TrendingFamousTypes.KnownForTVShow) => parent.backdrop_path,
    firstAirDate: (parent: TrendingFamousTypes.KnownForTVShow) => parent.first_air_date,
    genres: async (
      parent: TrendingFamousTypes.KnownForMovie,
      params: TrendingFamousKnowForMovieGenresArgs,
      context: Context,
    ) =>
      mediaGenresHandler.handle({
        cacheKey: TMDB_CONSTANTS.KEYS.TV_SHOWS_GENRES_CACHE_KEY(params.language),
        endpoint: MEDIA_GENRES_CONSTANTS.TV_SHOWS_ENDPOINT,
        cacheHandler: context.cacheHandler,
        tmdbAPI: context.tmdbAPI,
        genreIds: parent.genre_ids,
      }),
    mediaType: (parent: TrendingFamousTypes.KnownForTVShow) => parent.media_type,
    originCountry: (parent: TrendingFamousTypes.KnownForTVShow) => parent.origin_country,
    originalLanguage: (parent: TrendingFamousTypes.KnownForTVShow) =>
      parent.original_language,
    originalName: (parent: TrendingFamousTypes.KnownForTVShow) => parent.original_name,
    posterPath: (parent: TrendingFamousTypes.KnownForTVShow) => parent.poster_path,
    voteAverage: (parent: TrendingFamousTypes.KnownForTVShow) => parent.vote_average,
    voteCount: (parent: TrendingFamousTypes.KnownForTVShow) => parent.vote_count,
  },

  TrendingFamousKnowForMovie: {
    backdropPath: (parent: TrendingFamousTypes.KnownForMovie) => parent.backdrop_path,
    mediaType: (parent: TrendingFamousTypes.KnownForMovie) => parent.media_type,
    genres: async (
      parent: TrendingFamousTypes.KnownForMovie,
      params: TrendingFamousKnowForMovieGenresArgs,
      context: Context,
    ) =>
      mediaGenresHandler.handle({
        cacheKey: TMDB_CONSTANTS.KEYS.MOVIES_GENRES_CACHE_KEY(params.language),
        endpoint: MEDIA_GENRES_CONSTANTS.MOVIES_ENDPOINT,
        cacheHandler: context.cacheHandler,
        tmdbAPI: context.tmdbAPI,
        genreIds: parent.genre_ids,
      }),
    originalLanguage: (parent: TrendingFamousTypes.KnownForMovie) =>
      parent.original_language,
    originalTitle: (parent: TrendingFamousTypes.KnownForMovie) => parent.original_title,
    posterPath: (parent: TrendingFamousTypes.KnownForMovie) => parent.poster_path,
    releaseDate: (parent: TrendingFamousTypes.KnownForMovie) => parent.release_date,
    voteAverage: (parent: TrendingFamousTypes.KnownForMovie) => parent.vote_average,
    voteCount: (parent: TrendingFamousTypes.KnownForMovie) => parent.vote_count,
  },

  TrendingFamousKnownFor: {
    __resolveType(knownForResult: TrendingFamousTypes.KnownFor) {
      return knownForResult.media_type === "movie"
        ? "TrendingFamousKnowForMovie"
        : "TrendingFamousKnowForTVShow";
    },
  },
};
