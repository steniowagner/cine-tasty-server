import { Iso6391Language } from '../../../../../lib/types';
import env from '../../../../../config/environment';

import { makeRequestParams } from './makeRequestParams';

const params = {
  param: 'value',
};

describe('Testing Helper: TheMovieDBAPI/makeRequestParams', () => {
  it('should make the request params and return it correctly', () => {
    const result = makeRequestParams(params, Iso6391Language.Pt);

    expect(result).toEqual({
      ...params,
      language: Iso6391Language.Pt.toLowerCase(),
      api_key: env.THE_MOVIE_DB_API_KEY,
    });
  });

  it('should make the request params and return it correctly when a language was not provided', () => {
    const result = makeRequestParams(params);

    expect(result).toEqual({
      ...params,
      api_key: env.THE_MOVIE_DB_API_KEY,
      language: 'en-us',
    });
  });

  it('should make the request params and return it correctly when the language is null', () => {
    const result = makeRequestParams(params, null);

    expect(result).toEqual({
      ...params,
      api_key: env.THE_MOVIE_DB_API_KEY,
    });
  });
});
