import {
  QueryResolvers,
  QueryPeopleArgs,
  PeopleQueryResult,
  QueryPersonArgs,
  Person,
} from '../../lib/types';
import { Datasource } from '../datasources';

const resolvers: QueryResolvers = {
  Query: {
    people: (
      _: {},
      { page, language }: QueryPeopleArgs,
      { dataSources }: Datasource,
    ): Promise<PeopleQueryResult> => dataSources.tmdb.getPeople(page, language),
    person: (
      _: {},
      { id, language }: QueryPersonArgs,
      { dataSources }: Datasource,
    ): Promise<Person | null> => dataSources.tmdb.getPerson(id, language),
  },
};

export default resolvers;
