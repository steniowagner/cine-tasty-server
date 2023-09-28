import { QueryFamousArgs } from "@generated-types";
import { Context } from "@/types";

import { famousHandler, FamousHandlerTypes } from "@tmdb-api/handlers/famous";

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
  },
};
