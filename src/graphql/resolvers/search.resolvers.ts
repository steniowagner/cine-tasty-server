import { searchHandler } from "@tmdb-api/handlers/search";
import { QuerySearchFamousArgs } from "@generated-types";
import { Context } from "@types";
import { SearchMovieHandlerTypes } from "@tmdb-api/handlers/search-famous";
import {
  mediaGenresMoviesHandler,
  mediaGenresTVShowsHandler,
} from "@tmdb-api/handlers/media-genres";

export const resolvers = {
  Query: {
    searchFamous: async (
      _parent: undefined,
      params: QuerySearchFamousArgs,
      context: Context,
    ) =>
      searchHandler.handle({
        tmdbAPI: context.tmdbAPI,
        input: params.input,
        type: "person",
      }),
  },

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

  SearchFamousItemKnownFor: {
    backdropPath: (parent: SearchMovieHandlerTypes.SearchFamousResultItemKnownFor) =>
      parent.backdrop_path,
    originalLanguage: (parent: SearchMovieHandlerTypes.SearchFamousResultItemKnownFor) =>
      parent.original_language,
    originalTitle: (parent: SearchMovieHandlerTypes.SearchFamousResultItemKnownFor) =>
      parent.original_title,
    posterPath: (parent: SearchMovieHandlerTypes.SearchFamousResultItemKnownFor) =>
      parent.poster_path,
    releaseDate: (parent: SearchMovieHandlerTypes.SearchFamousResultItemKnownFor) =>
      parent.release_date,
    voteAverage: (parent: SearchMovieHandlerTypes.SearchFamousResultItemKnownFor) =>
      parent.vote_average,
    voteCount: (parent: SearchMovieHandlerTypes.SearchFamousResultItemKnownFor) =>
      parent.vote_count,
    mediaType: (parent: SearchMovieHandlerTypes.SearchFamousResultItemKnownFor) =>
      parent.media_type,
    genres: async (
      parent: SearchMovieHandlerTypes.SearchFamousResultItemKnownFor,
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
};
