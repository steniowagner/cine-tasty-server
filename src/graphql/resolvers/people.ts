import { Context } from '@types';
import {
  PeopleQueryResult,
  QueryPeopleArgs,
  QueryPersonArgs,
  QueryResolvers,
  Person,
} from 'lib/types';

type PersonKnownForResultSample = {
  original_title?: string;
  originalTitle?: string;
  firstAirDate?: string;
  first_air_date?: string;
  title?: string;
};

const resolveKnownFor = (result: PersonKnownForResultSample): string | null => {
  if (result.title || result.original_title) {
    return 'BaseMovie';
  }

  if (result.first_air_date || result.firstAirDate) {
    return 'BaseTVShow';
  }

  return null;
};

const resolvers: QueryResolvers = {
  Query: {
    people: (
      _: {},
      args: QueryPeopleArgs,
      { dataSources }: Context,
    ): Promise<PeopleQueryResult> => dataSources.tmdb.getPeople(args),

    person: (
      _: {},
      args: QueryPersonArgs,
      { dataSources }: Context,
    ): Promise<Person | null> => dataSources.tmdb.getPerson(args),
  },

  PersonKnowFor: {
    __resolveType(personKnowForSample: PersonKnownForResultSample): string | null {
      return resolveKnownFor(personKnowForSample);
    },
  },
};

export default resolvers;
