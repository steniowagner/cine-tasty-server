import NewsAPI from '../../../graphql/datasources/NewsAPI';

import {
  articleWithFalsyField,
  rawArticleWithNullId,
  articleWithNullField,
  rawArticleWithId,
  articleWithURLId,
  articleWithId,
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

describe('[NewsAPI.getFromParam]', () => {
  it('should get the current date following the format YYYY-MM-DD', () => {
    const today = new Date();

    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    const day = today
      .getDate()
      .toString()
      .padStart(2, '0');

    expect(`${year}-${month}-${day}`).toEqual(newsAPI.getFromParam());
  });
});

describe('[NewsAPI.validateAPIOutput]', () => {
  it('should validate if an article from News API has falsy or null fields at its first level', () => {
    expect(newsAPI.validateAPIOutput(articleWithFalsyField)).toEqual(false);
    expect(newsAPI.validateAPIOutput(articleWithNullField)).toEqual(false);
    expect(newsAPI.validateAPIOutput(rawArticleWithNullId)).toEqual(true);
  });
});
