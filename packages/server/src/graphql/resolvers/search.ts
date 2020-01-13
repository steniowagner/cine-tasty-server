import { PersonKnowForResultSample, Context } from '../../types';
import { QuerySearchArgs, QueryResolvers, SearchResult } from '../../lib/types';

type SearchResultSample = {
  known_for_department?: string;
  first_air_date?: string;
  title?: string;
};

const resolveKnownFor = (result: SearchResultSample) => {
  if (result.title) {
    return 'BaseMovie';
  }

  if (result.first_air_date) {
    return 'BaseTVShow';
  }

  return null;
};

const resolveSearchType = (result: SearchResultSample) => {
  if (result.title) {
    return 'BaseMovie';
  }

  if (result.known_for_department) {
    return 'BasePerson';
  }

  if (result.first_air_date) {
    return 'BaseTVShow';
  }

  return null;
};

const resolvers: QueryResolvers = {
  SearchResultItem: {
    __resolveType(searchResultSample: SearchResultSample) {
      return resolveSearchType(searchResultSample);
    },
  },
  PersonKnowFor: {
    __resolveType(personKnowForSample: PersonKnowForResultSample) {
      return resolveKnownFor(personKnowForSample);
    },
  },
  Query: {
    search: (
      _: {},
      { page, query, type, language }: QuerySearchArgs,
      { dataSources, mediaGenres }: Context,
    ): Promise<SearchResult> => {
      return dataSources.tmdb.search({ page, query, type, language }, mediaGenres);
    },
  },
};

export default resolvers;
