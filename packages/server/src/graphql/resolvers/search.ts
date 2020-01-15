import { QuerySearchArgs, QueryResolvers, SearchResult } from '../../lib/types';
import { Context } from '../../types';

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

const resolvers: QueryResolvers = {
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
  Query: {
    search: (
      _: {},
      params: QuerySearchArgs,
      { dataSources }: Context,
    ): Promise<SearchResult> => {
      return dataSources.tmdb.search(params);
    },
  },
};

export default resolvers;
