import { mediaGenresHandler } from "@tmdb-api/handlers/media-genres";
import { Iso6391Language, QueryMediaGenresArgs } from "@generated-types";
import { Context } from "@types";

export const resolvers = {
  Query: {
    mediaGenres: async (
      _parent: undefined,
      params: QueryMediaGenresArgs,
      context: Context,
    ) =>
      mediaGenresHandler.handle({
        language: params.language as Iso6391Language,
        cacheHandler: context.cacheHandler,
        tmdbAPI: context.tmdbAPI,
        mediaType: params.mediaType,
        shouldReturnRaw: true,
        genreIds: [],
      }),
  },
};
