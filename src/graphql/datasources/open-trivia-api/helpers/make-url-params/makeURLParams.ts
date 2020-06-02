import { QuestionDifficulty, QuestionType, QuizInput } from '../../../../../lib/types';
import getAmountQuestions from '../get-amount-questions/getAmountQuestions';
import getCategoryCode from '../get-category-code/getCategoryCode';
import { OpenTriviaQueryParams } from '@types';

const makeURLParams = ({
  numberOfQuestions,
  difficulty,
  category,
  type,
}: QuizInput): OpenTriviaQueryParams => {
  const queryParams: OpenTriviaQueryParams = {
    amount: getAmountQuestions(numberOfQuestions),
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

export default makeURLParams;
