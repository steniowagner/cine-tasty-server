import {
  QueryResolvers,
  QueryPeopleArgs,
  PeopleQueryResult,
  QueryPersonArgs,
  PersonProfile,
  MediaType,
} from '../../lib/types';
import { Context } from '../../types';

type CastType = {
  media_type: 'tv' | 'movie';
};

const resolveCastType = (cast: CastType): string | null => {
  if (cast.media_type === MediaType.Movie.toLowerCase()) {
    return 'CastMovie';
  }

  if (cast.media_type === MediaType.Tv.toLowerCase()) {
    return 'CastTV';
  }

  return null;
};

const resolvers: QueryResolvers = {
  Cast: {
    __resolveType(cast: CastType): string | null {
      return resolveCastType(cast);
    },
  },
  Query: {
    people: (
      _: {},
      params: QueryPeopleArgs,
      { dataSources }: Context,
    ): Promise<PeopleQueryResult> => dataSources.tmdb.getPeople(params),
    person: (
      _: {},
      params: QueryPersonArgs,
      { dataSources }: Context,
    ): Promise<PersonProfile | null> => dataSources.tmdb.getPerson(params),
  },
};

export default resolvers;
