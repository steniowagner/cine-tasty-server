import { Context } from '../../types';
import { QueryResolvers, QueryPersonArgs, Person } from '../../lib/types';

const resolvers: QueryResolvers = {
  Query: {
    person: (
      _: {},
      params: QueryPersonArgs,
      { dataSources }: Context,
    ): Promise<Person | null> => dataSources.tmdb.getPerson(params),
  },
};

export default resolvers;
