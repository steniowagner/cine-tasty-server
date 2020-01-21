import { QueryResolvers, MediaType } from '../../lib/types';

type CastType = {
  media_type: 'tv' | 'movie';
};

const resolveCastType = (cast: CastType): string | null => {
  if (cast.media_type === MediaType.Movie.toLowerCase()) {
    return 'CastMovie';
  }

  if (cast.media_type === MediaType.Tv.toLowerCase()) {
    return 'CastTV';
  }

  return null;
};

const resolveTypes: QueryResolvers = {
  Cast: {
    __resolveType(cast: CastType): string | null {
      return resolveCastType(cast);
    },
  },
};

export default resolveTypes;
