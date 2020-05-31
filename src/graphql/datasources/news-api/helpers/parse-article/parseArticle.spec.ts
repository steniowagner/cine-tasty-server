import {
  rawArticleWithNullId,
  rawArticleWithId,
  articleWithURLId,
  articleWithId,
} from '../../../../../../__tests__/mocks/articles';
import parseArticle from './parseArticle';

describe('Testing Helper: NewsAPI/parseArticle', () => {
  it('should parse the raw article with the field url as id', () => {
    expect(parseArticle(rawArticleWithNullId)).toEqual(articleWithURLId);
  });

  it('should parse the raw article with the field id as id', () => {
    expect(parseArticle(rawArticleWithId)).toEqual(articleWithId);
  });
});
