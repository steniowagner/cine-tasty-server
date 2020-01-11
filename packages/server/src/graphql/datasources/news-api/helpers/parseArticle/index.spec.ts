import {
  rawArticleWithNullId,
  rawArticleWithId,
  articleWithURLId,
  articleWithId,
} from '../../../../../__tests__/mocks/articles.stub';
import parseArticle from '.';

describe('[parseArticle]', () => {
  it('should parse the raw article with the field url as id', () => {
    expect(parseArticle(rawArticleWithNullId)).toEqual(articleWithURLId);
  });

  it('should parse the raw article with the field id as id', () => {
    expect(parseArticle(rawArticleWithId)).toEqual(articleWithId);
  });
});
