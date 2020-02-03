import {
  articleWithFalsyField,
  articleWithNullField,
  rawArticleWithNullId,
} from '../../../../../__tests__/mocks/articles.stub';
import validateArticleResultItem from '.';

describe('Helper: validateArticleResultItem()', () => {
  it('should validate if an article from News API has falsy or null fields at its first level', () => {
    expect(validateArticleResultItem(articleWithFalsyField)).toEqual(false);
    expect(validateArticleResultItem(articleWithNullField)).toEqual(false);
    expect(validateArticleResultItem(rawArticleWithNullId)).toEqual(true);
  });
});
