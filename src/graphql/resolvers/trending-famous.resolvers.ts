import {
  Iso6391Language,
  QueryTrendingFamousArgs,
  MediaType,
  TrendingFamousKnownForMovieGenresArgs,
} from "@generated-types";
import { trendingFamousHandler } from "@tmdb-api/handlers/trending-famous";
import { Context } from "@types";
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
    knownForDepartment: (parent: TrendingFamousTypes.Result) =>
      parent.known_for_department,
    knownFor: (parent: TrendingFamousTypes.Result) => parent.known_for,
  },

  TrendingFamousKnownForTVShow: {
    backdropPath: (parent: TrendingFamousTypes.KnownForTVShow) => parent.backdrop_path,
    firstAirDate: (parent: TrendingFamousTypes.KnownForTVShow) => parent.first_air_date,
    genres: async (
      parent: TrendingFamousTypes.KnownForMovie,
      params: TrendingFamousKnownForMovieGenresArgs,
      context: Context,
    ) =>
      mediaGenresHandler.handle({
        language: params.language as Iso6391Language,
        cacheHandler: context.cacheHandler,
        mediaType: MediaType.Tv,
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

  TrendingFamousKnownForMovie: {
    backdropPath: (parent: TrendingFamousTypes.KnownForMovie) => parent.backdrop_path,
    mediaType: (parent: TrendingFamousTypes.KnownForMovie) => parent.media_type,
    genres: async (
      parent: TrendingFamousTypes.KnownForMovie,
      params: TrendingFamousKnownForMovieGenresArgs,
      context: Context,
    ) =>
      mediaGenresHandler.handle({
        mediaType: MediaType.Movie,
        language: params.language as Iso6391Language,
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
        ? "TrendingFamousKnownForMovie"
        : "TrendingFamousKnownForTVShow";
    },
  },
};
