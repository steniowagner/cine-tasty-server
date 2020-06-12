import getQuestionAmount from './getAmountQuestions';
import CONSTANTS from '../../../../utils/constants';

describe('Testing Helper: OpenTriviaAPI/getQuestionAmount', () => {
  it('it should return the minimum number of questions when the amount received is less than the minimum number of questions', () => {
    expect(getQuestionAmount(CONSTANTS.MIN_QUESTIONS_REQUEST - 1)).toEqual(
      CONSTANTS.MIN_QUESTIONS_REQUEST,
    );
  });

  it('it should return the maximum number of questions when the amount received is less than the maximum number of questions', () => {
    expect(getQuestionAmount(CONSTANTS.MAX_QUESTIONS_REQUEST + 1)).toEqual(
      CONSTANTS.MAX_QUESTIONS_REQUEST,
    );
  });

  it('it should return the amount received when it is less than the maximum and greater than the minimum number of questions', () => {
    expect(getQuestionAmount(CONSTANTS.MAX_QUESTIONS_REQUEST - 1)).toEqual(
      CONSTANTS.MAX_QUESTIONS_REQUEST - 1,
    );
  });

  it('it should return the amount received when it is equal than the maximum number of questions', () => {
    expect(getQuestionAmount(CONSTANTS.MAX_QUESTIONS_REQUEST)).toEqual(
      CONSTANTS.MAX_QUESTIONS_REQUEST,
    );
  });

  it('it should return the amount received when it is equal than the minimum number of questions', () => {
    expect(getQuestionAmount(CONSTANTS.MIN_QUESTIONS_REQUEST)).toEqual(
      CONSTANTS.MIN_QUESTIONS_REQUEST,
    );
  });
});
