import { RESTDataSource, HTTPCache } from 'apollo-datasource-rest';

import { TheMovieDBHandler, MediaGenre } from '@types';
import { Iso6391Language } from '@lib/types';
import env from '@config/environment';

import { formatLanguage } from '../../helpers/formatLanguage';
import getEndpoint from './helpers/get-endpoint/getEndpoint';
import CONSTANTS from './utils/constants';
import { getGenres } from './helpers';

type Params = {
  language?: Iso6391Language | null;
  genresIds: number[];
  mediaType: string;
};

type MediaGenresResponse = {
  genres: MediaGenre[];
};

class MediaGenresHandler extends RESTDataSource implements TheMovieDBHandler<Params> {
  constructor() {
    super();
    this.baseURL = CONSTANTS.MEDIA_GENRES_BASE_URL;
    this.httpCache = new HTTPCache();
  }

  async handle({ language, genresIds, mediaType }: Params): Promise<string[]> {
    const endpoint = getEndpoint(mediaType);

    if (!endpoint) {
      return [];
    }

    const { genres } = await this.get<MediaGenresResponse>(endpoint, {
      language: formatLanguage(language),
      api_key: env.THE_MOVIE_DB_API_KEY,
    });

    return getGenres(genres, genresIds);
  }
}

export default MediaGenresHandler;
