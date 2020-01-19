import MediaGenresHandler from '../datasources/the-movie-db-api/handlers/media-genres';
import {
  BaseTvShowGenre_IdsArgs as BaseTvShowGenreIdsArgs,
  BaseMovieGenre_IdsArgs as BaseMovieGenreIdsArgs,
  QueryResolvers,
  QueryPeopleArgs,
  PeopleQueryResult,
  MediaType,
} from '../../lib/types';
import { Context, MediaItem } from '../../types';

const mediaGenres = new MediaGenresHandler();

const resolvers: QueryResolvers = {
  BaseMovie: {
    genre_ids: (
      { genre_ids }: MediaItem,
      { language }: BaseMovieGenreIdsArgs,
    ): Promise<string[]> =>
      mediaGenres.getMediaGenres(genre_ids, MediaType.Movie.toLowerCase(), language),
  },
  BaseTVShow: {
    genre_ids: (
      { genre_ids }: MediaItem,
      { language }: BaseTvShowGenreIdsArgs,
    ): Promise<string[]> =>
      mediaGenres.getMediaGenres(genre_ids, MediaType.Tv.toLowerCase(), language),
  },
  Query: {
    people: (
      _: {},
      params: QueryPeopleArgs,
      { dataSources }: Context,
    ): Promise<PeopleQueryResult> => dataSources.tmdb.getPeople(params),
  },
};

export default resolvers;
