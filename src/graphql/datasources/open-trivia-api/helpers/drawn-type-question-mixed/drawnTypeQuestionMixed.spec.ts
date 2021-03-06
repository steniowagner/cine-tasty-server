import { drawnTypeQuestionMixed } from './drawnTypeQuestionMixed';
import { QuestionCategory } from '../../../../../lib/types';

describe('Testing Helper: OpenTriviaAPI/drawnTypeQuestionMixed', () => {
  it('should return "TV Category" when the drawn is odd', () => {
    jest.spyOn(global.Math, 'round').mockReturnValueOnce(1);

    expect(drawnTypeQuestionMixed()).toEqual(QuestionCategory.Movie);
  });

  it('should return "TV Category" when the drawn is even', () => {
    jest.spyOn(global.Math, 'round').mockReturnValueOnce(2);

    expect(drawnTypeQuestionMixed()).toEqual(QuestionCategory.Tv);
  });
});
