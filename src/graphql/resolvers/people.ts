/* eslint-disable @typescript-eslint/camelcase */
import { Context } from '@types';
import {
  PeopleQueryResult,
  QueryPeopleArgs,
  QueryPersonArgs,
  QueryResolvers,
  PersonResponse,
  BasePersonResponse,
  PersonKnowFor,
  Person,
} from '@lib/types';

type PersonKnownForResultSample = {
  original_title?: string;
  originalTitle?: string;
  firstAirDate?: string;
  first_air_date?: string;
  title?: string;
};

const resolveKnownFor = (result: PersonKnownForResultSample): string | null => {
  if (result.title || result.original_title || result.originalTitle) {
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

  BasePerson: {
    knownFor: ({ known_for }: BasePersonResponse): PersonKnowFor[] => known_for,

    profilePath: ({ profile_path }: BasePersonResponse): string | null | undefined =>
      profile_path,
  },

  Person: {
    knownForDepartment: ({
      known_for_department,
    }: PersonResponse): string | null | undefined => known_for_department,

    alsoKnownAs: ({ also_known_as }: PersonResponse): string[] => also_known_as,

    placeOfBirth: ({ place_of_birth }: PersonResponse): string | null | undefined =>
      place_of_birth,

    profilePath: ({ profile_path }: PersonResponse): string | null | undefined =>
      profile_path,

    imdbId: ({ imdb_id }: PersonResponse): string | null | undefined => imdb_id,
  },

  PersonKnowFor: {
    __resolveType(personKnowForSample: PersonKnownForResultSample): string | null {
      return resolveKnownFor(personKnowForSample);
    },
  },
};

export default resolvers;
