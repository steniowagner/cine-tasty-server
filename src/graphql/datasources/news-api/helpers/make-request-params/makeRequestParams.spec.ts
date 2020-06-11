import { ArticleLanguage } from '../../../../../lib/types';
import env from '../../../../../config/environment';

import { makeRequestParams } from './makeRequestParams';
import { makeDateParam } from '..';

describe('Testing Helper: NewsAPI/getRequestParams', () => {
  it('should return the request params correctly when no language is specified', () => {
    const params = {
      apiKey: env.NEWS_API_KEY,
      pageSize: 12,
      from: makeDateParam(),
      to: makeDateParam(),
      q: 'cinema',
      page: 1,
    };

    expect(makeRequestParams(params.page)).toEqual(params);
  });

  it('should return the request params correctly when some language is specified', () => {
    const params = {
      apiKey: env.NEWS_API_KEY,
      from: makeDateParam(),
      to: makeDateParam(),
      pageSize: 12,
      language: 'pt',
      q: 'cinema',
      page: 1,
    };

    expect(makeRequestParams(params.page, ArticleLanguage.Pt)).toEqual(params);
  });
});
