import { QueryResolvers, QueryPeopleArgs, PeopleQueryResult } from '../../lib/types';
import { Context } from '../../types';

const resolvers: QueryResolvers = {
  Query: {
    people: (
      _: {},
      params: QueryPeopleArgs,
      { dataSources }: Context,
    ): Promise<PeopleQueryResult> => dataSources.tmdb.getPeople(params),
  },
};

export default resolvers;
