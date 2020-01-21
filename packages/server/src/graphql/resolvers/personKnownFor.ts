import { QueryResolvers } from '../../lib/types';

type SearchResultSample = {
  profile_path?: string;
  first_air_date?: string;
  title?: string;
};

type PersonKnowForResultSample = {
  first_air_date?: string;
  title?: string;
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

const resolveTypes: QueryResolvers = {
  PersonKnowFor: {
    __resolveType(personKnowForSample: PersonKnowForResultSample): string | null {
      return resolveKnownFor(personKnowForSample);
    },
  },
};

export default resolveTypes;
