import { MediaCrew } from "tmdb-types";

export const resolvers = {
  MediaCrew: {
    profilePath: (parent: MediaCrew) => parent.profile_path,
  },
};
