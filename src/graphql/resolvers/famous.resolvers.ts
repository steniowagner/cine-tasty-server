import { QueryFamousArgs, FamousMoviesCastArgs } from "@generated-types";
import { famousHandler, FamousHandlerTypes } from "@tmdb-api/handlers/famous";
import { famousCastHandler } from "@tmdb-api/handlers/famous-cast";
import { Context } from "@/types";

export const resolvers = {
  Query: {
    famous: (_parent: undefined, params: QueryFamousArgs, context: Context) =>
      famousHandler.handle(context.tmdbAPI, params),
  },

  Famous: {
    images: (parent: FamousHandlerTypes.Result) =>
      parent.images.profiles.map((image) => image.file_path),
    placeOfBirth: (parent: FamousHandlerTypes.Result) => parent.place_of_birth,
    profilePath: (parent: FamousHandlerTypes.Result) => parent.profile_path,
    knownForDepartment: (parent: FamousHandlerTypes.Result) =>
      parent.known_for_department,
    moviesCast: async (
      parent: FamousHandlerTypes.Result,
      params: FamousMoviesCastArgs,
      context: Context,
    ) => {
      const cast = await famousCastHandler.handle({
        language: params.language,
        tmdbAPI: context.tmdbAPI,
        id: parent.id,
      });
      return cast.moviesCast;
    },
    tvShowsCast: async (
      parent: FamousHandlerTypes.Result,
      params: FamousMoviesCastArgs,
      context: Context,
    ) => {
      const cast = await famousCastHandler.handle({
        language: params.language,
        tmdbAPI: context.tmdbAPI,
        id: parent.id,
      });
      return cast.tvShowsCast;
    },
  },
};
