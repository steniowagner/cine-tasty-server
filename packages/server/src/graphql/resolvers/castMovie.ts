import { MediaItem } from '../../types';
import {
  QueryResolvers,
  MediaType,
  CastMovieGenre_IdsArgs as CastMovieGenreIdsArgs,
} from '../../lib/types';
import MediaGenresHandler from '../datasources/the-movie-db-api/handlers/media-genres';

const mediaGenres = new MediaGenresHandler();

const resolvers: QueryResolvers = {
  CastMovie: {
    genre_ids: (
      { genre_ids }: MediaItem,
      { language }: CastMovieGenreIdsArgs,
    ): Promise<string[]> => {
      return mediaGenres.getMediaGenres(
        genre_ids,
        MediaType.Movie.toLowerCase(),
        language,
      );
    },
  },
};

export default resolvers;
