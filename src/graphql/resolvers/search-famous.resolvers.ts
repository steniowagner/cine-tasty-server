import { QuerySearchFamousArgs } from "@generated-types";
import { SearchMovieHandlerTypes } from "@tmdb-api/handlers/search-famous";
import { mediaGenresHandler } from "@tmdb-api/handlers/media-genres";
import { CONSTANTS as TMDB_CONSTANTS } from "@tmdb-api/utils";
import { CONSTANTS as MEDIA_GENRES_CONSTANTS } from "@tmdb-api/handlers/media-genres";
import { Context } from "@types";

type KnownForResult = {
  media_type: string;
};

export const resolvers = {
  SearchFamousItem: {
    knownForDepartment: (parent: SearchMovieHandlerTypes.SearchFamousResultItem) =>
      parent.known_for_department,
    originalName: (parent: SearchMovieHandlerTypes.SearchFamousResultItem) =>
      parent.original_name,
    profilePath: (parent: SearchMovieHandlerTypes.SearchFamousResultItem) =>
      parent.profile_path,
    knownFor: (parent: SearchMovieHandlerTypes.SearchFamousResultItem) =>
      parent.known_for,
  },

  SearchFamousKnownForMovie: {
    backdropPath: (parent: SearchMovieHandlerTypes.KnownForMovie) => parent.backdrop_path,
    originalLanguage: (parent: SearchMovieHandlerTypes.KnownForMovie) =>
      parent.original_language,
    originalTitle: (parent: SearchMovieHandlerTypes.KnownForMovie) =>
      parent.original_title,
    posterPath: (parent: SearchMovieHandlerTypes.KnownForMovie) => parent.poster_path,
    mediaType: (parent: SearchMovieHandlerTypes.KnownForMovie) => parent.media_type,
    releaseDate: (parent: SearchMovieHandlerTypes.KnownForMovie) => parent.release_date,
    voteAverage: (parent: SearchMovieHandlerTypes.KnownForMovie) => parent.vote_average,
    voteCount: (parent: SearchMovieHandlerTypes.KnownForMovie) => parent.vote_count,
    genres: async (
      parent: SearchMovieHandlerTypes.KnownForMovie,
      params: QuerySearchFamousArgs,
      context: Context,
    ) =>
      mediaGenresHandler.handle({
        cacheKey: TMDB_CONSTANTS.KEYS.MOVIES_GENRES_CACHE_KEY(params.input.language),
        endpoint: MEDIA_GENRES_CONSTANTS.MOVIES_ENDPOINT,
        cacheHandler: context.cacheHandler,
        tmdbAPI: context.tmdbAPI,
        genreIds: parent.genre_ids,
      }),
  },

  SearchFamousKnownForTVShow: {
    backdropPath: (parent: SearchMovieHandlerTypes.KnownForTVShow) =>
      parent.backdrop_path,
    originalLanguage: (parent: SearchMovieHandlerTypes.KnownForTVShow) =>
      parent.original_language,
    originalName: (parent: SearchMovieHandlerTypes.KnownForTVShow) =>
      parent.original_name,
    posterPath: (parent: SearchMovieHandlerTypes.KnownForTVShow) => parent.poster_path,
    mediaType: (parent: SearchMovieHandlerTypes.KnownForTVShow) => parent.media_type,
    firstAirDate: (parent: SearchMovieHandlerTypes.KnownForTVShow) =>
      parent.first_air_date,
    voteAverage: (parent: SearchMovieHandlerTypes.KnownForTVShow) => parent.vote_average,
    voteCount: (parent: SearchMovieHandlerTypes.KnownForTVShow) => parent.vote_count,
    originCountry: (parent: SearchMovieHandlerTypes.KnownForTVShow) =>
      parent.origin_country,
    genres: async (
      parent: SearchMovieHandlerTypes.KnownForTVShow,
      params: QuerySearchFamousArgs,
      context: Context,
    ) =>
      mediaGenresHandler.handle({
        cacheKey: TMDB_CONSTANTS.KEYS.MOVIES_GENRES_CACHE_KEY(params.input.language),
        endpoint: MEDIA_GENRES_CONSTANTS.TV_SHOWS_ENDPOINT,
        cacheHandler: context.cacheHandler,
        tmdbAPI: context.tmdbAPI,
        genreIds: parent.genre_ids,
      }),
  },

  SearchFamousKnownFor: {
    __resolveType(knownForResult: KnownForResult) {
      return knownForResult.media_type === "movie"
        ? "SearchFamousKnownForMovie"
        : "SearchFamousKnownForTVShow";
    },
  },
};
