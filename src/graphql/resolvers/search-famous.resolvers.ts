import { QuerySearchFamousArgs } from "@generated-types";
import { Context } from "@types";
import { SearchMovieHandlerTypes } from "@tmdb-api/handlers/search-famous";
import {
  mediaGenresMoviesHandler,
  mediaGenresTVShowsHandler,
} from "@tmdb-api/handlers/media-genres";

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

  KnowForMovie: {
    backdropPath: (parent: SearchMovieHandlerTypes.KnowForMovie) => parent.backdrop_path,
    originalLanguage: (parent: SearchMovieHandlerTypes.KnowForMovie) =>
      parent.original_language,
    originalTitle: (parent: SearchMovieHandlerTypes.KnowForMovie) =>
      parent.original_title,
    posterPath: (parent: SearchMovieHandlerTypes.KnowForMovie) => parent.poster_path,
    mediaType: (parent: SearchMovieHandlerTypes.KnowForMovie) => parent.media_type,
    releaseDate: (parent: SearchMovieHandlerTypes.KnowForMovie) => parent.release_date,
    voteAverage: (parent: SearchMovieHandlerTypes.KnowForMovie) => parent.vote_average,
    voteCount: (parent: SearchMovieHandlerTypes.KnowForMovie) => parent.vote_count,
    genres: async (
      parent: SearchMovieHandlerTypes.KnowForMovie,
      params: QuerySearchFamousArgs,
      context: Context,
    ) => {
      const isMovie = parent.media_type === "movie";
      const handler = isMovie ? mediaGenresMoviesHandler : mediaGenresTVShowsHandler;
      return handler.handle({
        language: params.input.language,
        genreIds: parent.genre_ids,
        tmdbAPI: context.tmdbAPI,
      });
    },
  },

  KnowForTVShow: {
    backdropPath: (parent: SearchMovieHandlerTypes.KnowForTVShow) => parent.backdrop_path,
    originalLanguage: (parent: SearchMovieHandlerTypes.KnowForTVShow) =>
      parent.original_language,
    originalName: (parent: SearchMovieHandlerTypes.KnowForTVShow) => parent.original_name,
    posterPath: (parent: SearchMovieHandlerTypes.KnowForTVShow) => parent.posterPath,
    mediaType: (parent: SearchMovieHandlerTypes.KnowForTVShow) => parent.media_type,
    firstAirDate: (parent: SearchMovieHandlerTypes.KnowForTVShow) =>
      parent.first_air_date,
    voteAverage: (parent: SearchMovieHandlerTypes.KnowForTVShow) => parent.vote_average,
    voteCount: (parent: SearchMovieHandlerTypes.KnowForTVShow) => parent.vote_count,
    originCountry: (parent: SearchMovieHandlerTypes.KnowForTVShow) =>
      parent.origin_country,
    genres: async (
      parent: SearchMovieHandlerTypes.KnowForTVShow,
      params: QuerySearchFamousArgs,
      context: Context,
    ) => {
      const isMovie = parent.media_type === "tv";
      const handler = isMovie ? mediaGenresMoviesHandler : mediaGenresTVShowsHandler;
      return handler.handle({
        language: params.input.language,
        genreIds: parent.genre_ids,
        tmdbAPI: context.tmdbAPI,
      });
    },
  },

  KnownFor: {
    __resolveType(knownForResult: KnownForResult) {
      return knownForResult.media_type === "movie" ? "KnowForMovie" : "KnowForTVShow";
    },
  },
};
