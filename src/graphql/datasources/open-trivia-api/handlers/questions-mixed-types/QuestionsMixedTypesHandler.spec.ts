const mockRestDataSourceGet = jest.fn();

import QuestionSingleTypeHandler from '../question-single-type/QuestionSingleTypeHandler';
import QuestionsMixedTypesHandler from './QuestionsMixedTypesHandler';
import {
  movieQuestion,
  tvQuestion,
  question,
} from '../../../../../../__tests__/mocks/quiz';
import {
  QuestionDifficulty,
  QuestionCategory,
  QuestionType,
  QuizInput,
} from '../../../../../lib/types';

jest.mock('apollo-datasource-rest', () => {
  class MockRESTDataSource {
    baseUrl = '';
    get = mockRestDataSourceGet;
  }

  return {
    RESTDataSource: MockRESTDataSource,
    HTTPCache: class HTTPCache {},
  };
});

const mixedQuestionsInput = {
  difficulty: QuestionDifficulty.Hard,
  category: QuestionCategory.Mixed,
  type: QuestionType.Multiple,
  numberOfQuestions: 2,
};

let questionsMixedTypesHandler: QuestionsMixedTypesHandler = null;
let questionSingleTypeHandler: QuestionSingleTypeHandler = null;

jest.mock('../../helpers/drawn-type-question-mixed/drawnTypeQuestionMixed', () => ({
  drawnTypeQuestionMixed: (): QuestionCategory => QuestionCategory.Tv,
}));

describe('Unity: DataSources/OpenTriviaAPI/handlers/questions-mixed-type/QuestionsMixedTypeHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.resetModules();

    questionSingleTypeHandler = new QuestionSingleTypeHandler(mockRestDataSourceGet);

    questionsMixedTypesHandler = new QuestionsMixedTypesHandler(
      questionSingleTypeHandler,
    );
  });

  describe('Unity: DataSources/OpenTriviaAPI/handlers/questions-mixed-types/QuestionsMixedTypesHandler', () => {
    it('should call "QuestionsMixedTypesHandler.handle()" with correct params when the number of questions is 1', async () => {
      mockRestDataSourceGet.mockReturnValue({ response_code: 0, results: [question] });

      const getQuestionsSingleType = jest.spyOn(questionSingleTypeHandler, 'handle');

      const input: QuizInput = {
        ...mixedQuestionsInput,
        numberOfQuestions: 1,
      };

      await questionsMixedTypesHandler.handle(input);

      expect(getQuestionsSingleType).toHaveBeenCalledTimes(1);

      expect(getQuestionsSingleType).toHaveBeenCalledWith({
        ...input,
        category: QuestionCategory.Tv,
      });
    });

    it('should call "QuestionsMixedTypesHandler.handle()" for "TV" and "MOVIE" category and return the result correctly', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({
        response_code: 0,
        results: [tvQuestion],
      });

      mockRestDataSourceGet.mockReturnValueOnce({
        response_code: 0,
        results: [movieQuestion],
      });

      const getQuestionsSingleType = jest.spyOn(questionSingleTypeHandler, 'handle');

      const input: QuizInput = {
        ...mixedQuestionsInput,
        numberOfQuestions: 2,
      };

      const movieQuestionsAmount = Math.ceil(input.numberOfQuestions / 2);
      const tvQuestionsAmount = Math.floor(input.numberOfQuestions / 2);

      const result = await questionsMixedTypesHandler.handle(input);

      expect(getQuestionsSingleType).toHaveBeenCalledTimes(2);

      expect(getQuestionsSingleType).toHaveBeenCalledWith({
        ...input,
        category: QuestionCategory.Tv,
        numberOfQuestions: tvQuestionsAmount,
      });

      expect(getQuestionsSingleType).toHaveBeenCalledWith({
        ...input,
        category: QuestionCategory.Movie,
        numberOfQuestions: movieQuestionsAmount,
      });

      expect(Array.isArray(result)).toBe(true);

      expect(result.length).toBe(movieQuestionsAmount + tvQuestionsAmount);

      const questionsCountByType = result.reduce(
        (accumulator, current) => {
          if (current.category.toLowerCase() === QuestionCategory.Movie.toLowerCase()) {
            return {
              ...accumulator,
              movie: accumulator.movie + 1,
            };
          }

          return {
            ...accumulator,
            tv: accumulator.tv + 1,
          };
        },
        { tv: 0, movie: 0 },
      );

      expect(questionsCountByType.movie).toEqual(movieQuestionsAmount);

      expect(questionsCountByType.tv).toEqual(tvQuestionsAmount);
    });
  });
});
