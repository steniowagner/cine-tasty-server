import { MediaItem } from '../../types';
import {
  QueryResolvers,
  MediaType,
  CastTvShowGenre_IdsArgs as CastTvGenreIdsArgs,
} from '../../lib/types';
import MediaGenresHandler from '../datasources/the-movie-db-api/handlers/media-genres';

const mediaGenres = new MediaGenresHandler();

const resolvers: QueryResolvers = {
  CastTVShow: {
    genre_ids: (
      { genre_ids }: MediaItem,
      { language }: CastTvGenreIdsArgs,
    ): Promise<string[]> => {
      return mediaGenres.getMediaGenres(genre_ids, MediaType.Tv.toLowerCase(), language);
    },
  },
};

export default resolvers;
