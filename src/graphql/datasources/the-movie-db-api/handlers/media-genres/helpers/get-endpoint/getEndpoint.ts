import { MediaType } from '@lib/types';

import CONSTANTS from '../../utils/constants';

export const getEndpoint = (mediaType: string): string => {
  let endpoint = '';

  if (mediaType.toLowerCase() === MediaType.Movie.toLowerCase()) {
    endpoint = CONSTANTS.GENRE_MOVIE_ENDPOINT;
  }

  if (mediaType.toLowerCase() === MediaType.Tv.toLowerCase()) {
    endpoint = CONSTANTS.GENRE_TV_SHOW_ENDPOINT;
  }

  return endpoint;
};
