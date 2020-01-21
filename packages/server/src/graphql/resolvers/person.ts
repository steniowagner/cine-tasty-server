import { Context } from '../../types';
import { QueryResolvers, QueryPersonArgs, PersonProfile } from '../../lib/types';

const resolvers: QueryResolvers = {
  Query: {
    person: (
      _: {},
      params: QueryPersonArgs,
      { dataSources }: Context,
    ): Promise<PersonProfile | null> => dataSources.tmdb.getPerson(params),
  },
};

export default resolvers;
