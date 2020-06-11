import { QuestionCategory } from '@lib/types';

export const drawnTypeQuestionMixed = (): QuestionCategory => {
  const randomNumber = Math.round(Math.random() * 10);

  if (randomNumber % 2 === 0) {
    return QuestionCategory.Tv;
  }

  return QuestionCategory.Movie;
};
