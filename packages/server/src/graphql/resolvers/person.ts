import { QueryResolvers, QueryPeopleArgs, PeopleQueryResult } from '../../lib/types';
import { Datasource } from '../datasources';

const resolvers: QueryResolvers = {
  Query: {
    people: (
      _: {},
      { page, language }: QueryPeopleArgs,
      { dataSources }: Datasource,
    ): Promise<PeopleQueryResult> => dataSources.tmdb.getPeople(page, language),
  },
};

export default resolvers;
