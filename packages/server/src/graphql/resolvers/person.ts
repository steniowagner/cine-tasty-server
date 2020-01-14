import {
  QueryResolvers,
  QueryPeopleArgs,
  PeopleQueryResult,
  QueryPersonArgs,
  Person,
  MediaType,
} from '../../lib/types';
import { Context } from '../../types';

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
      { dataSources }: Context,
    ): Promise<PeopleQueryResult> => dataSources.tmdb.getPeople(page, language),
    person: (
      _: {},
      { id, language }: QueryPersonArgs,
      { dataSources }: Context,
    ): Promise<Person | null> => dataSources.tmdb.getPerson(id, language),
  },
};

export default resolvers;
