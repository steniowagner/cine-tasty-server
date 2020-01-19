import { QuerySearchArgs, QueryResolvers, SearchResult } from '../../lib/types';
import { Context } from '../../types';

const resolvers: QueryResolvers = {
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
