import { QueryResolvers, MediaType } from '../../lib/types';

type SearchResultSample = {
  profile_path?: string;
  first_air_date?: string;
  title?: string;
};

type PersonKnowForResultSample = {
  first_air_date?: string;
  title?: string;
};

type CastType = {
  media_type: 'tv' | 'movie';
};

const resolveKnownFor = (result: SearchResultSample): string | null => {
  if (result.title) {
    return 'BaseMovie';
  }

  if (result.first_air_date) {
    return 'BaseTVShow';
  }

  return null;
};

const resolveSearchType = (result: SearchResultSample): string | null => {
  if (result.title) {
    return 'BaseMovie';
  }

  if (result.profile_path) {
    return 'BasePerson';
  }

  if (result.first_air_date) {
    return 'BaseTVShow';
  }

  return null;
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
  SearchResultItem: {
    __resolveType(searchResultSample: SearchResultSample): string | null {
      return resolveSearchType(searchResultSample);
    },
  },
  PersonKnowFor: {
    __resolveType(personKnowForSample: PersonKnowForResultSample): string | null {
      return resolveKnownFor(personKnowForSample);
    },
  },
  Cast: {
    __resolveType(cast: CastType): string | null {
      return resolveCastType(cast);
    },
  },
};

export default resolveTypes;
