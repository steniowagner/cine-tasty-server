import { QuestionDifficulty, QuestionType, QuizInput } from '@lib/types';
import { OpenTriviaQueryParams } from '@open-trivia-api-types';

import getQuestionAmount from './get-amount-questions/getAmountQuestions';
import getCategoryCode from './get-category-code/getCategoryCode';

export const makeURLParams = ({
  numberOfQuestions,
  difficulty,
  category,
  type,
}: QuizInput): OpenTriviaQueryParams => {
  const queryParams: OpenTriviaQueryParams = {
    amount: getQuestionAmount(numberOfQuestions),
    category: getCategoryCode(category),
  };

  if (!difficulty && !type) {
    return queryParams;
  }

  if (difficulty && difficulty.toLowerCase() !== QuestionDifficulty.Mixed.toLowerCase()) {
    queryParams.difficulty = difficulty.toLowerCase();
  }

  if (type && type.toLowerCase() !== QuestionType.Mixed.toLowerCase()) {
    queryParams.type = type.toLowerCase();
  }

  return queryParams;
};
