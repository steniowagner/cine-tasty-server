import { searchHandler } from "@tmdb-api/handlers/search";
import { Context } from "@types";
import {
  QuerySearchFamousArgs,
  QuerySearchTvShowsArgs,
  QuerySearchMoviesArgs,
} from "@generated-types";

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
        type: "famous",
      }),

    searchTVShows: async (
      _parent: undefined,
      params: QuerySearchTvShowsArgs,
      context: Context,
    ) =>
      searchHandler.handle({
        tmdbAPI: context.tmdbAPI,
        input: params.input,
        type: "tv-shows",
      }),

    searchMovies: async (
      _parent: undefined,
      params: QuerySearchMoviesArgs,
      context: Context,
    ) =>
      searchHandler.handle({
        tmdbAPI: context.tmdbAPI,
        input: params.input,
        type: "movies",
      }),
  },
};
