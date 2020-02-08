const mockRestDataSourceGet = jest.fn();

import {
  QuestionDifficulty,
  QuestionType,
  QuestionCategory,
} from '../../../../../lib/types';
import { question } from '../../../../../__tests__/mocks/quiz.stub';
import CONSTANTS from '../../utils/constants';
import OpenTriviaAPI from '../..';

const ENDPOINT = 'api.php';

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

const movieQuestionsInput = {
  difficulty: QuestionDifficulty.Hard,
  type: QuestionType.Multiple,
  category: QuestionCategory.Movie,
  number_questions: 10,
};

const tvQuestionsInput = {
  difficulty: QuestionDifficulty.Hard,
  type: QuestionType.Multiple,
  category: QuestionCategory.Tv,
  number_questions: 10,
};

const triviaAPI = new OpenTriviaAPI();

describe('Unity: OpenTriviaAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getQuestions()', () => {
    describe('Getting questions about Movies', () => {
      it('should return an array with questions about movie from OpenTriviaAPI', async () => {
        mockRestDataSourceGet.mockReturnValue({ response_code: 0, results: [question] });

        const result = await triviaAPI.getQuestions(movieQuestionsInput);

        expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

        expect(result).toMatchSnapshot();

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          ENDPOINT,
          `category=${CONSTANTS.MOVIE_CATEGORY_CODE}&amount=${
            movieQuestionsInput.number_questions
          }&difficulty=${movieQuestionsInput.difficulty.toLowerCase()}&type=${movieQuestionsInput.type.toLowerCase()}`,
        );
      });

      it('should return an empty array when the OpenTriviaAPI returns the response_code = 1', async () => {
        mockRestDataSourceGet.mockReturnValue({
          response_code: CONSTANTS.NO_RESPONSE_CODE,
        });

        const result = await triviaAPI.getQuestions(movieQuestionsInput);

        expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

        expect(result).toEqual([]);

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          ENDPOINT,
          `category=${CONSTANTS.MOVIE_CATEGORY_CODE}&amount=${
            movieQuestionsInput.number_questions
          }&difficulty=${movieQuestionsInput.difficulty.toLowerCase()}&type=${movieQuestionsInput.type.toLowerCase()}`,
        );
      });
    });

    describe('Getting questions about Tv', () => {
      it('should return an array questions about tv from OpenTriviaAPI', async () => {
        mockRestDataSourceGet.mockReturnValue({ response_code: 0, results: [question] });

        const result = await triviaAPI.getQuestions(tvQuestionsInput);

        expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

        expect(result).toMatchSnapshot();

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          ENDPOINT,
          `category=${CONSTANTS.TV_CATEGORY_CODE}&amount=${
            tvQuestionsInput.number_questions
          }&difficulty=${tvQuestionsInput.difficulty.toLowerCase()}&type=${tvQuestionsInput.type.toLowerCase()}`,
        );
      });

      it('should return an empty array when the OpenTriviaAPI returns the response_code = 1', async () => {
        mockRestDataSourceGet.mockReturnValue({
          response_code: CONSTANTS.NO_RESPONSE_CODE,
        });

        const result = await triviaAPI.getQuestions(tvQuestionsInput);

        expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

        expect(result).toEqual([]);

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          ENDPOINT,
          `category=${CONSTANTS.TV_CATEGORY_CODE}&amount=${
            tvQuestionsInput.number_questions
          }&difficulty=${tvQuestionsInput.difficulty.toLowerCase()}&type=${tvQuestionsInput.type.toLowerCase()}`,
        );
      });
    });
  });

  describe('getCategoryCode()', () => {
    it('should return the category code correctly for Movies', () => {
      const code = triviaAPI.getCategoryCode(QuestionCategory.Movie);

      expect(code).toEqual(CONSTANTS.MOVIE_CATEGORY_CODE);
    });

    it('should return the category code correctly for Tv', () => {
      const code = triviaAPI.getCategoryCode(QuestionCategory.Tv);

      expect(code).toEqual(CONSTANTS.TV_CATEGORY_CODE);
    });
  });

  describe('parseQueryParams()', () => {
    it('should return a query string correctly', () => {
      const queryParamsParsed = triviaAPI.parseQueryParams({
        category: 14,
        amount: 10,
        difficulty: 'difficulty',
        type: 'type',
      });

      expect(queryParamsParsed).toEqual(
        'category=14&amount=10&difficulty=difficulty&type=type',
      );
    });

    it('should return a query string correctly when the amount is greater than 50', () => {
      const queryParamsParsed = triviaAPI.parseQueryParams({
        category: 14,
        amount: 45,
        difficulty: 'difficulty',
        type: 'type',
      });

      expect(queryParamsParsed).toEqual(
        'category=14&amount=45&difficulty=difficulty&type=type',
      );
    });

    it('should return a query string correctly when the amount is less than 1', () => {
      const queryParamsParsed = triviaAPI.parseQueryParams({
        category: 14,
        amount: 1,
        difficulty: 'difficulty',
        type: 'type',
      });

      expect(queryParamsParsed).toEqual(
        'category=14&amount=1&difficulty=difficulty&type=type',
      );
    });
  });

  describe('getQuestionAmount()', () => {
    it('should return the question amount correctly when the amount is beteween [max, min] interval', () => {
      expect(triviaAPI.getQuestionAmount(10)).toEqual(10);
    });

    it('should return the max question amount when the input is greater than the max amount supported', () => {
      expect(triviaAPI.getQuestionAmount(CONSTANTS.MAX_QUESTIONS_REQUEST + 1)).toEqual(
        CONSTANTS.MAX_QUESTIONS_REQUEST,
      );
    });

    it('should return the min question amount when the input is less than the min amount supported', () => {
      expect(triviaAPI.getQuestionAmount(CONSTANTS.MIN_QUESTIONS_REQUEST - 1)).toEqual(
        CONSTANTS.MIN_QUESTIONS_REQUEST,
      );
    });
  });

  describe('getURLParams()', () => {
    it('should return the query params string correctly when all possible params are set', () => {
      const input = {
        number_questions: 10,
        difficulty: QuestionDifficulty.Hard,
        category: QuestionCategory.Movie,
        type: QuestionType.Multiple,
      };

      const urlParams = triviaAPI.getURLParams(input);

      expect(urlParams).toBe(
        `category=${
          CONSTANTS.MOVIE_CATEGORY_CODE
        }&amount=10&difficulty=${input.difficulty.toLowerCase()}&type=${input.type.toLowerCase()}`,
      );
    });

    it('should return the query params string correctly when some params have "any" as value', () => {
      let input = {
        number_questions: 10,
        difficulty: QuestionDifficulty.Easy,
        category: QuestionCategory.Movie,
        type: QuestionType.Any,
      };

      expect(triviaAPI.getURLParams(input)).toBe(
        `category=${
          CONSTANTS.MOVIE_CATEGORY_CODE
        }&amount=10&difficulty=${input.difficulty.toLowerCase()}`,
      );

      input = {
        number_questions: 10,
        difficulty: QuestionDifficulty.Any,
        category: QuestionCategory.Movie,
        type: QuestionType.Any,
      };

      expect(triviaAPI.getURLParams(input)).toBe(
        `category=${CONSTANTS.MOVIE_CATEGORY_CODE}&amount=10`,
      );
    });
  });
});
