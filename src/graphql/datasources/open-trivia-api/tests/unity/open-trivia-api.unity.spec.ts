const mockRestDataSourceGet = jest.fn();

import { QuestionCategory } from '../../../../../lib/types';
import {
  mixedQuestionsInput,
  movieQuestionsInput,
  tvQuestionsInput,
  question,
} from '../../../../../../__tests__/mocks/quiz';
import OpenTriviaAPI from '../../OpenTriviaAPI';

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

jest.mock('../../helpers/drawn-type-question-mixed/drawnTypeQuestionMixed', () => ({
  drawnTypeQuestionMixed: (): QuestionCategory => QuestionCategory.Tv,
}));

let openTriviaAPI: OpenTriviaAPI = null;

describe('Unity: DataSources/OpenTriviaAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.resetModules();

    openTriviaAPI = new OpenTriviaAPI();
  });

  describe('getQuestions()', () => {
    it('should call "QuestionsMixedTypesHandler.handle()" when the input has the field "category" with the value "MIXED"', async () => {
      mockRestDataSourceGet.mockReturnValue({ response_code: 0, results: [question] });

      const getQuestionsMixedTypes = jest.spyOn(
        openTriviaAPI.questionsMixedTypesHandler,
        'handle',
      );

      await openTriviaAPI.getQuestions(mixedQuestionsInput);

      expect(getQuestionsMixedTypes).toHaveBeenCalledTimes(1);

      expect(getQuestionsMixedTypes).toHaveBeenCalledWith({
        numberOfQuestions: mixedQuestionsInput.numberOfQuestions,
        difficulty: mixedQuestionsInput.difficulty,
        type: mixedQuestionsInput.type,
      });
    });

    it('should call "QuestionsSingleTypeHandler.handle()" when the input has the field "category" with the value "MOVIE"', async () => {
      mockRestDataSourceGet.mockReturnValue({ response_code: 0, results: [question] });

      const getQuestionsSingleType = jest.spyOn(
        openTriviaAPI.questionSingleTypeHandler,
        'handle',
      );

      await openTriviaAPI.getQuestions(movieQuestionsInput);

      expect(getQuestionsSingleType).toHaveBeenCalledTimes(1);

      expect(getQuestionsSingleType).toHaveBeenCalledWith(movieQuestionsInput);
    });

    it('should call "getQuestionsSingleType()" when the input has the field "category" with the value "TV"', async () => {
      mockRestDataSourceGet.mockReturnValue({ response_code: 0, results: [question] });

      const getQuestionsSingleType = jest.spyOn(
        openTriviaAPI.questionSingleTypeHandler,
        'handle',
      );
      await openTriviaAPI.getQuestions(tvQuestionsInput);

      expect(getQuestionsSingleType).toHaveBeenCalledTimes(1);

      expect(getQuestionsSingleType).toHaveBeenCalledWith(tvQuestionsInput);
    });
  });
});
