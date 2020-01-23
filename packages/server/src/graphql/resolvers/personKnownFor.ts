import { QueryResolvers } from '../../lib/types';

type PersonKnownForResultSample = {
  original_title?: string;
  first_air_date?: string;
  title?: string;
};

const resolveKnownFor = (result: PersonKnownForResultSample): string | null => {
  if (result.title || result.original_title) {
    return 'BaseMovie';
  }

  if (result.first_air_date) {
    return 'BaseTVShow';
  }

  return null;
};

const resolveTypes: QueryResolvers = {
  PersonKnowFor: {
    __resolveType(personKnowForSample: PersonKnownForResultSample): string | null {
      return resolveKnownFor(personKnowForSample);
    },
  },
};

export default resolveTypes;
