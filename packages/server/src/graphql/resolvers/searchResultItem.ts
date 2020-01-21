import { QueryResolvers } from '../../lib/types';

type SearchResultSample = {
  profile_path?: string;
  first_air_date?: string;
  title?: string;
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

const resolveTypes: QueryResolvers = {
  SearchResultItem: {
    __resolveType(searchResultSample: SearchResultSample): string | null {
      return resolveSearchType(searchResultSample);
    },
  },
};

export default resolveTypes;
