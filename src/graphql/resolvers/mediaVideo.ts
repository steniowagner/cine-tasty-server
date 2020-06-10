import { QueryResolvers, MediaVideo, Thumbnail } from '../../lib/types';

const BASE_VIDEO_THHUMBNAIL_URL = 'https://img.youtube.com/vi';

const resolvers: QueryResolvers = {
  MediaVideo: {
    thumbnail: ({ key }: MediaVideo): Thumbnail => ({
      extraSmall: `${BASE_VIDEO_THHUMBNAIL_URL}/${key}/default.jpg`,
      small: `${BASE_VIDEO_THHUMBNAIL_URL}/${key}/mqdefault.jpg`,
      medium: `${BASE_VIDEO_THHUMBNAIL_URL}/${key}/hqdefault.jpg`,
      large: `${BASE_VIDEO_THHUMBNAIL_URL}/${key}/sddefault.jpg`,
      extraLarge: `${BASE_VIDEO_THHUMBNAIL_URL}/${key}/maxresdefault.jpg`,
    }),
  },
};

export default resolvers;
