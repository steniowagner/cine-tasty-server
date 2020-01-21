import MediaGenresHandler from '../datasources/the-movie-db-api/handlers/media-genres';
import {
  BaseMovieGenre_IdsArgs as BaseMovieGenreIdsArgs,
  QueryResolvers,
  MediaType,
} from '../../lib/types';
import { MediaItem } from '../../types';

const mediaGenres = new MediaGenresHandler();

const resolvers: QueryResolvers = {
  BaseMovie: {
    genre_ids: (
      { genre_ids }: MediaItem,
      { language }: BaseMovieGenreIdsArgs,
    ): Promise<string[]> =>
      mediaGenres.getMediaGenres(genre_ids, MediaType.Movie.toLowerCase(), language),
  },
};

export default resolvers;
