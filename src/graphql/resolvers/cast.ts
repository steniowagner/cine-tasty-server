import MediaGenresHandler from '../datasources/the-movie-db-api/handlers/media-genres';
import {
  QueryResolvers,
  MediaType,
  CastMovieGenre_IdsArgs as CastMovieGenreIdsArgs,
  CastTvShowGenre_IdsArgs as CastTvGenreIdsArgs,
} from '../../lib/types';
import { MediaItem } from '../../@types';

type CastType = {
  media_type: 'tv' | 'movie';
};

const mediaGenres = new MediaGenresHandler();

const resolveCastType = (cast: CastType): string | null => {
  if (cast.media_type === MediaType.Movie.toLowerCase()) {
    return 'CastMovie';
  }

  if (cast.media_type === MediaType.Tv.toLowerCase()) {
    return 'CastTVShow';
  }

  return null;
};

const resolveTypes: QueryResolvers = {
  Cast: {
    __resolveType(cast: CastType): string | null {
      return resolveCastType(cast);
    },
  },

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

  CastTVShow: {
    genre_ids: (
      { genre_ids }: MediaItem,
      { language }: CastTvGenreIdsArgs,
    ): Promise<string[]> => {
      return mediaGenres.getMediaGenres(genre_ids, MediaType.Tv.toLowerCase(), language);
    },
  },
};

export default resolveTypes;
