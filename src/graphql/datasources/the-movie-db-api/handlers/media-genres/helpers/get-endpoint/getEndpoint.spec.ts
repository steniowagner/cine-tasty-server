import { MediaType } from '../../../../../../../lib/types';

import CONSTANTS from '../../utils/constants';
import { getEndpoint } from './getEndpoint';

describe('Testing Helper: TheMovieDBAPI/getEndpoint', () => {
  it('should return the Genre-Movie-Endpoint when the media-type is "Movie" in lowercase', () => {
    const endpoint = getEndpoint(MediaType.Movie.toLowerCase());

    expect(endpoint).toEqual(CONSTANTS.GENRE_MOVIE_ENDPOINT);
  });

  it('should return the Genre-Movie-Endpoint when the media-type is "Movie" in uppercase', () => {
    const endpoint = getEndpoint(MediaType.Movie.toUpperCase());

    expect(endpoint).toEqual(CONSTANTS.GENRE_MOVIE_ENDPOINT);
  });

  it('should return the Genre-Movie-Endpoint when the media-type is "Movie" as it is defined at the MediaType enum', () => {
    const endpoint = getEndpoint(MediaType.Movie);

    expect(endpoint).toEqual(CONSTANTS.GENRE_MOVIE_ENDPOINT);
  });

  it('should return the Genre-Tv-Endpoint when the media-type is "Tv" in lowercase', () => {
    const endpoint = getEndpoint(MediaType.Tv.toLowerCase());

    expect(endpoint).toEqual(CONSTANTS.GENRE_TV_SHOW_ENDPOINT);
  });

  it('should return the Genre-Tv-Endpoint when the media-type is "Tv" in uppercase', () => {
    const endpoint = getEndpoint(MediaType.Tv.toUpperCase());

    expect(endpoint).toEqual(CONSTANTS.GENRE_TV_SHOW_ENDPOINT);
  });

  it('should return the Genre-Tv-Endpoint when the media-type is "Tv" as it is defined at the MediaType enum', () => {
    const endpoint = getEndpoint(MediaType.Tv);

    expect(endpoint).toEqual(CONSTANTS.GENRE_TV_SHOW_ENDPOINT);
  });

  it('should return an empty string when the media-type received doesnt match with any media-type', () => {
    const endpoint = getEndpoint('other');

    expect(endpoint).toEqual('');
  });
});
