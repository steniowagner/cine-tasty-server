import { MediaItem, BaseMediaType, Genres } from '../../../../../types';
import getGenres from '../getGenres';

const attachGenresToMedia = (
  items: MediaItem[],
  mediaGenres: Genres,
  mediaType: string = '',
): BaseMediaType[] => {
  return items.map(item => ({
    ...item,
    genres: getGenres(
      mediaGenres,
      item.genre_ids,
      item.media_type?.toLowerCase() || mediaType.toLowerCase(),
    ),
  }));
};

export default attachGenresToMedia;
