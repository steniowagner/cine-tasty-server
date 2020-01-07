import NewsAPI from '../../../graphql/datasources/NewsAPI';
import getDataFormated from './helpers/getDataFormated';
import env from '../../../config/environment';

import {
  articleWithFalsyField,
  rawArticleWithNullId,
  articleWithNullField,
  rawArticleWithId,
  articleWithURLId,
  articleWithId,
  params,
} from './fixtures/getAllArticlesStub';

const newsAPI = new NewsAPI();

describe('[NewsAPI.parseArticle]', () => {
  it('should parse the raw article with the field url as id', () => {
    expect(newsAPI.parseArticle(rawArticleWithNullId)).toEqual(articleWithURLId);
  });

  it('should parse the raw article with the field id as id', () => {
    expect(newsAPI.parseArticle(rawArticleWithId)).toEqual(articleWithId);
  });
});

describe('[NewsAPI.getDateParam]', () => {
  it('should get the current date following the format YYYY-MM-DD', () => {
    const today = getDataFormated();

    expect(today).toEqual(newsAPI.getDateParam());
  });
});

describe('[NewsAPI.validateAPIOutput]', () => {
  it('should validate if an article from News API has falsy or null fields at its first level', () => {
    expect(newsAPI.validateAPIOutput(articleWithFalsyField)).toEqual(false);
    expect(newsAPI.validateAPIOutput(articleWithNullField)).toEqual(false);
    expect(newsAPI.validateAPIOutput(rawArticleWithNullId)).toEqual(true);
  });
});

describe('[NewsAPI.getRequestParams]', () => {
  it('should return the request params correctly', () => {
    const params = {
      apiKey: env.NEWS_API_KEY,
      pageSize: 12,
      from: getDataFormated(),
      to: getDataFormated(),
      q: 'cinema',
      page: 1,
    };

    expect(newsAPI.getRequestParams(params.page)).toEqual(params);
  });
});

