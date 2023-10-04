import { searchHandler } from "@tmdb-api/handlers/search";
import { QuerySearchFamousArgs } from "@generated-types";
import { Context } from "@types";

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
  },
};
