import { QuestionCategory } from '../../../../../../../lib/types';
import getCategoryCode from './getCategoryCode';
import CONSTANTS from '../../../../utils/constants';

describe('Testing Helper: OpenTriviaAPI/getCategoryCode', () => {
  it('should return the movie code when the category is Movie', () => {
    expect(getCategoryCode(QuestionCategory.Movie)).toEqual(
      CONSTANTS.MOVIE_CATEGORY_CODE,
    );
  });

  it('should return the tv code when the category is Tv', () => {
    expect(getCategoryCode(QuestionCategory.Tv)).toEqual(CONSTANTS.TV_CATEGORY_CODE);
  });

  it('should return the rv code when the category is Mixed', () => {
    expect(getCategoryCode(QuestionCategory.Mixed)).toEqual(CONSTANTS.TV_CATEGORY_CODE);
  });
});
