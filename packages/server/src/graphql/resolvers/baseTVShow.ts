import MediaGenresHandler from '../datasources/the-movie-db-api/handlers/media-genres';
import {
  BaseTvShowGenre_IdsArgs as BaseTvShowGenreIdsArgs,
  QueryResolvers,
  MediaType,
} from '../../lib/types';
import { MediaItem } from '../../types';

const mediaGenres = new MediaGenresHandler();

const resolvers: QueryResolvers = {
  BaseTVShow: {
    genre_ids: (
      { genre_ids }: MediaItem,
      { language }: BaseTvShowGenreIdsArgs,
    ): Promise<string[]> =>
      mediaGenres.getMediaGenres(genre_ids, MediaType.Tv.toLowerCase(), language),
  },
};

export default resolvers;
