const mockRestDataSourceGet = jest.fn();

import {
  QuestionDifficulty,
  QuestionType,
  QuestionCategory,
} from '../../../../../lib/types';
import {
  question,
  movieQuestion,
  tvQuestion,
} from '../../../../../__tests__/mocks/quiz.stub';
import CONSTANTS from '../../utils/constants';
import OpenTriviaAPI from '../..';

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

const mixedQuestionsInput = {
  difficulty: QuestionDifficulty.Hard,
  type: QuestionType.Multiple,
  category: QuestionCategory.Mixed,
  number_questions: 2,
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
          CONSTANTS.ENDPOINT,
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
          CONSTANTS.ENDPOINT,
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
          CONSTANTS.ENDPOINT,
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
          CONSTANTS.ENDPOINT,
          `category=${CONSTANTS.TV_CATEGORY_CODE}&amount=${
            tvQuestionsInput.number_questions
          }&difficulty=${tvQuestionsInput.difficulty.toLowerCase()}&type=${tvQuestionsInput.type.toLowerCase()}`,
        );
      });
    });

    describe('Getting questions about Movies and TV', () => {
      it('should return an array with questions about movies and tv from OpenTriviaAPI', async () => {
        mockRestDataSourceGet
          .mockReturnValueOnce({ response_code: 0, results: [tvQuestion] })
          .mockReturnValueOnce({ response_code: 0, results: [movieQuestion] });

        const result = await triviaAPI.getQuestions(mixedQuestionsInput);

        expect(
          result.findIndex(item => item.category === tvQuestion.category),
        ).toBeGreaterThanOrEqual(0);

        expect(
          result.findIndex(item => item.category === movieQuestion.category),
        ).toBeGreaterThanOrEqual(0);

        expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          CONSTANTS.ENDPOINT,
          `category=${
            CONSTANTS.TV_CATEGORY_CODE
          }&amount=1&difficulty=${mixedQuestionsInput.difficulty.toLowerCase()}&type=${movieQuestionsInput.type.toLowerCase()}`,
        );

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          CONSTANTS.ENDPOINT,
          `category=${CONSTANTS.MOVIE_CATEGORY_CODE}&amount=${Math.ceil(
            [movieQuestion].length / 2,
          )}&difficulty=${mixedQuestionsInput.difficulty.toLowerCase()}&type=${tvQuestionsInput.type.toLowerCase()}`,
        );
      });

      it('should return only tv questions when the movie request response return the response_code = 1', async () => {
        mockRestDataSourceGet
          .mockReturnValueOnce({ response_code: 0, results: [tvQuestion] })
          .mockReturnValueOnce({
            response_code: CONSTANTS.NO_RESPONSE_CODE,
          });

        const result = await triviaAPI.getQuestions(mixedQuestionsInput);

        expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

        expect(result).toEqual([tvQuestion]);

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          CONSTANTS.ENDPOINT,
          `category=${
            CONSTANTS.TV_CATEGORY_CODE
          }&amount=1&difficulty=${mixedQuestionsInput.difficulty.toLowerCase()}&type=${movieQuestionsInput.type.toLowerCase()}`,
        );

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          CONSTANTS.ENDPOINT,
          `category=${CONSTANTS.MOVIE_CATEGORY_CODE}&amount=${Math.ceil(
            [movieQuestion].length / 2,
          )}&difficulty=${mixedQuestionsInput.difficulty.toLowerCase()}&type=${tvQuestionsInput.type.toLowerCase()}`,
        );
      });

      it('should return only movie questions when the tv request response return the response_code = 1', async () => {
        mockRestDataSourceGet
          .mockReturnValueOnce({
            response_code: CONSTANTS.NO_RESPONSE_CODE,
          })
          .mockReturnValueOnce({ response_code: 0, results: [movieQuestion] });

        const result = await triviaAPI.getQuestions(mixedQuestionsInput);

        expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

        expect(result).toEqual([movieQuestion]);

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          CONSTANTS.ENDPOINT,
          `category=${
            CONSTANTS.TV_CATEGORY_CODE
          }&amount=1&difficulty=${mixedQuestionsInput.difficulty.toLowerCase()}&type=${movieQuestionsInput.type.toLowerCase()}`,
        );

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          CONSTANTS.ENDPOINT,
          `category=${CONSTANTS.MOVIE_CATEGORY_CODE}&amount=${Math.ceil(
            [movieQuestion].length / 2,
          )}&difficulty=${mixedQuestionsInput.difficulty.toLowerCase()}&type=${tvQuestionsInput.type.toLowerCase()}`,
        );
      });

      it('should return an empty array when both requests return response_code = 1', async () => {
        mockRestDataSourceGet
          .mockReturnValueOnce({
            response_code: CONSTANTS.NO_RESPONSE_CODE,
          })
          .mockReturnValueOnce({
            response_code: CONSTANTS.NO_RESPONSE_CODE,
          });

        const result = await triviaAPI.getQuestions(mixedQuestionsInput);

        expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

        expect(result).toEqual([]);

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          CONSTANTS.ENDPOINT,
          `category=${
            CONSTANTS.TV_CATEGORY_CODE
          }&amount=1&difficulty=${mixedQuestionsInput.difficulty.toLowerCase()}&type=${movieQuestionsInput.type.toLowerCase()}`,
        );

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          CONSTANTS.ENDPOINT,
          `category=${CONSTANTS.MOVIE_CATEGORY_CODE}&amount=${Math.ceil(
            [movieQuestion].length / 2,
          )}&difficulty=${mixedQuestionsInput.difficulty.toLowerCase()}&type=${tvQuestionsInput.type.toLowerCase()}`,
        );
      });

      it('should return an array of question correctly when user want a single question fo mixed types', async () => {
        mockRestDataSourceGet
          .mockReturnValueOnce({ response_code: 0, results: [tvQuestion] })
          .mockReturnValueOnce({ response_code: 0, results: [movieQuestion] });

        const tvRequestURL = `category=${
          CONSTANTS.TV_CATEGORY_CODE
        }&amount=1&difficulty=${mixedQuestionsInput.difficulty.toLowerCase()}&type=${movieQuestionsInput.type.toLowerCase()}`;

        const movieRequestURL = `category=${
          CONSTANTS.MOVIE_CATEGORY_CODE
        }&amount=${Math.ceil(
          [movieQuestion].length / 2,
        )}&difficulty=${mixedQuestionsInput.difficulty.toLowerCase()}&type=${tvQuestionsInput.type.toLowerCase()}`;

        const result = await triviaAPI.getQuestions({
          ...mixedQuestionsInput,
          number_questions: 1,
        });

        expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

        expect(result.length).toEqual(1);

        const isTVDrawn = JSON.stringify(tvQuestion) === JSON.stringify(result[0]);
        const isMovieDrawn = JSON.stringify(movieQuestion) === JSON.stringify(result[0]);

        const isTVURLCalled = mockRestDataSourceGet.mock.calls[0][1] === tvRequestURL;
        const isMovieURLCalled =
          mockRestDataSourceGet.mock.calls[0][1] === movieRequestURL;

        expect(mockRestDataSourceGet.mock.calls[0][0]).toEqual(CONSTANTS.ENDPOINT);

        expect(isTVURLCalled || isMovieURLCalled).toBe(true);

        expect(isTVDrawn || isMovieDrawn).toBe(true);
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
        type: QuestionType.Mixed,
      };

      expect(triviaAPI.getURLParams(input)).toBe(
        `category=${
          CONSTANTS.MOVIE_CATEGORY_CODE
        }&amount=10&difficulty=${input.difficulty.toLowerCase()}`,
      );

      input = {
        number_questions: 10,
        difficulty: QuestionDifficulty.Mixed,
        category: QuestionCategory.Movie,
        type: QuestionType.Mixed,
      };

      expect(triviaAPI.getURLParams(input)).toBe(
        `category=${CONSTANTS.MOVIE_CATEGORY_CODE}&amount=10`,
      );
    });
  });
});
