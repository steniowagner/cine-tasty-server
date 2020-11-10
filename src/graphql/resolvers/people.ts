/* eslint-disable @typescript-eslint/camelcase */

import * as LibTypes from '@lib/types';
import { Context } from '@types';

const sortCastArray = (cast: LibTypes.CastResponse[]): LibTypes.CastResponse[] => {
  return cast.sort((a, b) => {
    const Avalue = (a.vote_average || 0) + (a.vote_count || 0);
    const Bvalue = (b.vote_average || 0) + (b.vote_count || 0);

    return Avalue < Bvalue ? 1 : Bvalue < Avalue ? -1 : 0;
  });
};

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

const resolvers: LibTypes.QueryResolvers = {
  Query: {
    people: (
      _: {},
      args: LibTypes.QueryPeopleArgs,
      { dataSources }: Context,
    ): Promise<LibTypes.PeopleQueryResult> => dataSources.tmdb.getPeople(args),

    person: (
      _: {},
      args: LibTypes.QueryPersonArgs,
      { dataSources }: Context,
    ): Promise<LibTypes.PersonResponse | null> => dataSources.tmdb.getPerson(args),
  },

  BasePerson: {
    knownFor: ({ known_for }: LibTypes.BasePersonResponse): LibTypes.PersonKnowFor[] =>
      known_for,

    profilePath: ({
      profile_path,
    }: LibTypes.BasePersonResponse): string | null | undefined => profile_path,
  },

  Person: {
    knownForDepartment: ({
      known_for_department,
    }: LibTypes.PersonResponse): string | null | undefined => known_for_department,

    alsoKnownAs: ({ also_known_as }: LibTypes.PersonResponse): string[] => also_known_as,

    placeOfBirth: ({
      place_of_birth,
    }: LibTypes.PersonResponse): string | null | undefined => place_of_birth,

    profilePath: ({ profile_path }: LibTypes.PersonResponse): string | null | undefined =>
      profile_path,

    imdbId: ({ imdb_id }: LibTypes.PersonResponse): string | null | undefined => imdb_id,

    moviesCast: ({ cast }: LibTypes.PersonResponse): LibTypes.CastResponse[] => {
      const movieCast = cast.filter(castItem => castItem.media_type === 'movie');

      return sortCastArray(movieCast);
    },

    tvCast: ({ cast }: LibTypes.PersonResponse): LibTypes.CastResponse[] => {
      const tvCast = cast.filter(castItem => castItem.media_type === 'tv');

      return sortCastArray(tvCast);
    },
  },

  PersonKnowFor: {
    __resolveType(personKnowForSample: PersonKnownForResultSample): string | null {
      return resolveKnownFor(personKnowForSample);
    },
  },
};

export default resolvers;
