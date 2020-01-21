import { QueryResolvers } from '../../lib/types';

type SearchResultSample = {
  first_air_date?: string;
  known_for?: string;
  known_for_department?: string;
  original_name?: string;
  gender?: number;
  release_date?: string;
  title?: string;
};

const resolveSearchType = (result: SearchResultSample): string | null => {
  if (result.title || result.release_date) {
    return 'BaseMovie';
  }

  if (result.known_for || result.known_for_department || result.gender) {
    return 'BasePerson';
  }

  if (result.first_air_date || result.original_name) {
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
