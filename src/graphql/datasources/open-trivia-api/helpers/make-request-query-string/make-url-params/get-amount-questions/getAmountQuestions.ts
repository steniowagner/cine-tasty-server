import CONSTANTS from '../../../../utils/constants';

const getQuestionAmount = (amount: number): number => {
  if (amount < CONSTANTS.MIN_QUESTIONS_REQUEST) {
    return CONSTANTS.MIN_QUESTIONS_REQUEST;
  }

  if (amount > CONSTANTS.MAX_QUESTIONS_REQUEST) {
    return CONSTANTS.MAX_QUESTIONS_REQUEST;
  }

  return amount;
};

export default getQuestionAmount;
