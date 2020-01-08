import NewsAPI from '../../../graphql/datasources/NewsAPI';
import env from '../../../config/environment';

import {
  articleWithFalsyField,
  rawArticleWithNullId,
  articleWithNullField,
  rawArticleWithId,
  articleWithURLId,
  articleWithId,
  params,
} from './fixtures/getAllArticles.stub';

const newsAPI = new NewsAPI();

const getDataFormated = () => {
  const today = new Date();

  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear();
  const day = today
    .getDate()
    .toString()
    .padStart(2, '0');

  return `${year}-${month}-${day}`;
};

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
  it('should return the request params correctly when no language is specified', () => {
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

  it('should return the request params correctly when a language is specified', () => {
    const params = {
      apiKey: env.NEWS_API_KEY,
      from: getDataFormated(),
      to: getDataFormated(),
      pageSize: 12,
      language: 'pt',
      q: 'cinema',
      page: 1,
    };

    expect(newsAPI.getRequestParams(params.page, 'PT')).toEqual(params);
  });
});

