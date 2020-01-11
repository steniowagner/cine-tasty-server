import { Language } from '../../../../../lib/types';
import env from '../../../../../config/environment';
import getDateFormated from '../getDateParam';
import getRequestParams from '.';

describe('[getRequestParams]', () => {
  it('should return the request params correctly when no language is specified', () => {
    const params = {
      apiKey: env.NEWS_API_KEY,
      pageSize: 12,
      from: getDateFormated(),
      to: getDateFormated(),
      q: 'cinema',
      page: 1,
    };

    expect(getRequestParams(params.page)).toEqual(params);
  });

  it('should return the request params correctly when a language is specified', () => {
    const params = {
      apiKey: env.NEWS_API_KEY,
      from: getDateFormated(),
      to: getDateFormated(),
      pageSize: 12,
      language: 'pt',
      q: 'cinema',
      page: 1,
    };

    expect(getRequestParams(params.page, Language.Pt)).toEqual(params);
  });
});
