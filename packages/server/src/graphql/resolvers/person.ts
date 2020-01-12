import {
  QueryResolvers,
  QueryPeopleArgs,
  PeopleQueryResult,
  QueryPersonArgs,
  Person,
  MediaType,
} from '../../lib/types';
import { Datasource } from '../datasources';

type CastType = {
  mediaType: 'tv' | 'movie';
};

const resolveCastType = (cast: CastType) => {
  if (cast.mediaType === MediaType.Movie.toLowerCase()) {
    return 'CastMovie';
  }

  if (cast.mediaType === MediaType.Tv.toLowerCase()) {
    return 'CastTV';
  }

  return null;
};

const resolvers: QueryResolvers = {
  Cast: {
    __resolveType(cast: CastType) {
      return resolveCastType(cast);
    },
  },
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
