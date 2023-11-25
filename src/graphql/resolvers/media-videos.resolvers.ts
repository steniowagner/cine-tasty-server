import { MediaVideo } from "@generated-types";

export const YOUTUBE_THUMBNAIL_URL = "https://img.youtube.com/vi";

export const resolvers = {
  MediaVideo: {
    thumbnail: (parent: MediaVideo) => ({
      extraSmall: () => `${YOUTUBE_THUMBNAIL_URL}/${parent.key}/default.jpg`,
      small: () => `${YOUTUBE_THUMBNAIL_URL}/${parent.key}/mqdefault.jpg`,
      medium: () => `${YOUTUBE_THUMBNAIL_URL}/${parent.key}/hqdefault.jpg`,
      large: () => `${YOUTUBE_THUMBNAIL_URL}/${parent.key}/sddefault.jpg`,
      extraLarge: () => `${YOUTUBE_THUMBNAIL_URL}/${parent.key}/maxresdefault.jpg`,
    }),
  },
};
