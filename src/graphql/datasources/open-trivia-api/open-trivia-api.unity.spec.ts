const drawnTypeQuestionMixed = jest.fn();
const mockRestDataSourceGet = jest.fn();

import { movieQuestion, tvQuestion, question } from '../../../../__tests__/mocks/quiz';
import OpenTriviaAPI from './OpenTriviaAPI';
import CONSTANTS from './utils/constants';
import {
  QuestionDifficulty,
  QuestionCategory,
  QuestionType,
  QuizInput,
} from '../../../lib/types';

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

jest.mock(
  './helpers/drawn-type-question-mixed/drawnTypeQuestionMixed',
  () => (): QuestionCategory => QuestionCategory.Tv,
);

const defaultQueryString =
  'difficulty=difficulty&category=category&type=type&amount=amount';

jest.mock('./helpers/make-query-string/makeQueryString', () => (): string =>
  defaultQueryString,
);

const movieQuestionsInput = {
  difficulty: QuestionDifficulty.Hard,
  category: QuestionCategory.Movie,
  type: QuestionType.Multiple,
  number_questions: 10,
};

const tvQuestionsInput = {
  difficulty: QuestionDifficulty.Hard,
  category: QuestionCategory.Tv,
  type: QuestionType.Multiple,
  number_questions: 10,
};

const mixedQuestionsInput = {
  difficulty: QuestionDifficulty.Hard,
  category: QuestionCategory.Mixed,
  type: QuestionType.Multiple,
  number_questions: 2,
};

const triviaAPI = new OpenTriviaAPI();

describe('Unity: DataSources/OpenTriviaAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('getQuestions()', () => {
    it('should call "getQuestionsMixedTypes()" when the input has the field "category" with the value "MIXED"', async () => {
      mockRestDataSourceGet.mockReturnValue({ response_code: 0, results: [question] });

      const getQuestionsMixedTypes = jest.spyOn(triviaAPI, 'getQuestionsMixedTypes');

      await triviaAPI.getQuestions(mixedQuestionsInput);

      expect(getQuestionsMixedTypes).toHaveBeenCalledTimes(1);

      expect(getQuestionsMixedTypes).toHaveBeenCalledWith({
        number_questions: mixedQuestionsInput.number_questions,
        difficulty: mixedQuestionsInput.difficulty,
        type: mixedQuestionsInput.type,
      });
    });

    it('should call "getQuestionsSingleType()" when the input has the field "category" with the value "MOVIE"', async () => {
      mockRestDataSourceGet.mockReturnValue({ response_code: 0, results: [question] });

      const getQuestionsSingleType = jest.spyOn(triviaAPI, 'getQuestionsSingleType');

      await triviaAPI.getQuestions(movieQuestionsInput);

      expect(getQuestionsSingleType).toHaveBeenCalledTimes(1);

      expect(getQuestionsSingleType).toHaveBeenCalledWith(movieQuestionsInput);
    });

    it('should call "getQuestionsSingleType()" when the input has the field "category" with the value "TV"', async () => {
      mockRestDataSourceGet.mockReturnValue({ response_code: 0, results: [question] });

      const getQuestionsSingleType = jest.spyOn(triviaAPI, 'getQuestionsSingleType');

      await triviaAPI.getQuestions(tvQuestionsInput);

      expect(getQuestionsSingleType).toHaveBeenCalledTimes(1);

      expect(getQuestionsSingleType).toHaveBeenCalledWith(tvQuestionsInput);
    });
  });

  describe('getQuestionsMixedTypes()', () => {
    it('should call "getQuestionsSingleType()" with correct params when the number of questions is 1', async () => {
      mockRestDataSourceGet.mockReturnValue({ response_code: 0, results: [question] });

      const getQuestionsSingleType = jest.spyOn(triviaAPI, 'getQuestionsSingleType');

      const input: QuizInput = {
        ...mixedQuestionsInput,
        number_questions: 1,
      };

      await triviaAPI.getQuestionsMixedTypes(input);

      expect(getQuestionsSingleType).toHaveBeenCalledTimes(1);

      expect(getQuestionsSingleType).toHaveBeenCalledWith({
        ...input,
        category: QuestionCategory.Tv,
      });
    });

    it('should call "getQuestionsSingleType()" for Tv and Movie category and return the result correctly', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({
        response_code: 0,
        results: [tvQuestion],
      });

      mockRestDataSourceGet.mockReturnValueOnce({
        response_code: 0,
        results: [movieQuestion],
      });

      const getQuestionsSingleType = jest.spyOn(triviaAPI, 'getQuestionsSingleType');

      const input: QuizInput = {
        ...mixedQuestionsInput,
        number_questions: 2,
      };

      const movieQuestionsAmount = Math.ceil(input.number_questions / 2);
      const tvQuestionsAmount = Math.floor(input.number_questions / 2);

      const result = await triviaAPI.getQuestionsMixedTypes(input);

      expect(getQuestionsSingleType).toHaveBeenCalledTimes(2);

      expect(getQuestionsSingleType).toHaveBeenCalledWith({
        ...input,
        category: QuestionCategory.Tv,
        number_questions: tvQuestionsAmount,
      });

      expect(getQuestionsSingleType).toHaveBeenCalledWith({
        ...input,
        category: QuestionCategory.Movie,
        number_questions: movieQuestionsAmount,
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

  describe('getQuestionsSingleType()', () => {
    it('should return an "empty array" when the "response code" is "no response"', async () => {
      mockRestDataSourceGet.mockReturnValue({
        response_code: CONSTANTS.NO_RESPONSE_CODE,
      });

      const result = await triviaAPI.getQuestionsSingleType(tvQuestionsInput);

      expect(Array.isArray(result)).toBe(true);

      expect(result.length).toBe(0);

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        CONSTANTS.ENDPOINT,
        defaultQueryString,
      );
    });

    it('should return the questions correctly when the "response code" is other than "no response"', async () => {
      mockRestDataSourceGet.mockReturnValue({ response_code: 0, results: [question] });

      const result = await triviaAPI.getQuestionsSingleType(tvQuestionsInput);

      expect(Array.isArray(result)).toBe(true);

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        CONSTANTS.ENDPOINT,
        defaultQueryString,
      );

      expect(result).toEqual([question]);
    });
  });
});