import { QuestionCategory, QuizInput, Question } from '@lib/types';
import { OpenTriviaAPIHandler } from '@open-trivia-api-types';
import shuffleArray from '@utils/shuffle-array/shuffleArray';

import QuestionSingleTypeHandler from '../question-single-type/QuestionSingleTypeHandler';
import { drawnTypeQuestionMixed } from '../../helpers';

type InputParam = Omit<QuizInput, 'category'>;

class QuestionsMixedTypesHandler implements OpenTriviaAPIHandler<InputParam> {
  questionSingleTypeHandler: QuestionSingleTypeHandler;

  constructor(questionSingleTypeHandler: QuestionSingleTypeHandler) {
    this.questionSingleTypeHandler = questionSingleTypeHandler;
  }

  async handle(input: InputParam): Promise<Question[]> {
    if (input.numberOfQuestions === 1) {
      return this.questionSingleTypeHandler.handle({
        ...input,
        category: drawnTypeQuestionMixed(),
      });
    }

    const movieQuestionsAmount = Math.ceil(input.numberOfQuestions / 2);
    const tvQuestionsAmount = Math.floor(input.numberOfQuestions / 2);

    const [tvQuestions, movieQuestions] = await Promise.all<Question[], Question[]>([
      this.questionSingleTypeHandler.handle({
        ...input,
        category: QuestionCategory.Tv,
        numberOfQuestions: tvQuestionsAmount,
      }),
      this.questionSingleTypeHandler.handle({
        ...input,
        category: QuestionCategory.Movie,
        numberOfQuestions: movieQuestionsAmount,
      }),
    ]);

    const mixedShuffledQuestions = shuffleArray<Question>([
      ...tvQuestions,
      ...movieQuestions,
    ]);

    return mixedShuffledQuestions;
  }
}

export default QuestionsMixedTypesHandler;
