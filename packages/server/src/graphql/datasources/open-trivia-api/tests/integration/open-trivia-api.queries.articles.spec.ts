const mockRestDataSourceGet = jest.fn();

import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';

import {
  QuestionDifficulty,
  QuestionType,
  Question,
  QuestionCategory,
} from '../../../../../lib/types';
import {
  question,
  tvQuestion,
  movieQuestion,
} from '../../../../../__tests__/mocks/quiz.stub';
import resolvers from '../../../../resolvers';
import CONSTANTS from '../../utils/constants';
import typeDefs from '../../../../typeDefs';
import OpenTriviaAPI from '../..';

const GET_QUIZ_QUESTIONS = gql`
  query GetQuizQuestions($input: QuizInput!) {
    quiz(input: $input) {
      incorrect_answers
      category
      type
      difficulty
      question
      correct_answer
    }
  }
`;

const makeTestServer = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      openTrivia: new OpenTriviaAPI(),
    }),
  });

  return server;
};

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

describe('Integration: DataSources-OpenTriviaAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Query - Quiz (Single type)', () => {
    it('should query an array of questions from the OpenTrivia API and return it correctly', async () => {
      mockRestDataSourceGet.mockResolvedValueOnce({
        response_code: 0,
        results: [question],
      });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_QUIZ_QUESTIONS,
        variables: {
          input: {
            difficulty: QuestionDifficulty.Easy,
            type: QuestionType.Multiple,
            category: QuestionCategory.Movie,
            number_questions: 10,
          },
        },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        CONSTANTS.ENDPOINT,
        `category=${
          CONSTANTS.MOVIE_CATEGORY_CODE
        }&amount=10&difficulty=${QuestionDifficulty.Easy.toLowerCase()}&type=${QuestionType.Multiple.toLowerCase()}`,
      );

      expect(data!.quiz).toEqual([question]);
    });

    it('should query an array of questions from the OpenTrivia API and return it correctly when all "mixed-able" params have "any" as value', async () => {
      mockRestDataSourceGet.mockResolvedValueOnce({
        response_code: 0,
        results: [question],
      });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_QUIZ_QUESTIONS,
        variables: {
          input: {
            difficulty: QuestionDifficulty.Mixed,
            type: QuestionType.Mixed,
            category: QuestionCategory.Movie,
            number_questions: 10,
          },
        },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        CONSTANTS.ENDPOINT,
        `category=${CONSTANTS.MOVIE_CATEGORY_CODE}&amount=10`,
      );

      expect(data!.quiz).toEqual([question]);
    });

    it('should query an array of questions from the OpenTrivia API and return it correctly when some "mixed-able" params have "any" as value', async () => {
      mockRestDataSourceGet.mockResolvedValueOnce({
        response_code: 0,
        results: [question],
      });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_QUIZ_QUESTIONS,
        variables: {
          input: {
            difficulty: QuestionDifficulty.Hard,
            type: QuestionType.Mixed,
            category: QuestionCategory.Movie,
            number_questions: 10,
          },
        },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        CONSTANTS.ENDPOINT,
        `category=${
          CONSTANTS.MOVIE_CATEGORY_CODE
        }&amount=10&difficulty=${QuestionDifficulty.Hard.toLowerCase()}`,
      );

      expect(data!.quiz).toEqual([question]);
    });

    it('should query an empty array when the OpenTrivia API and returns the response_code = 1', async () => {
      mockRestDataSourceGet.mockResolvedValueOnce({
        response_code: CONSTANTS.NO_RESPONSE_CODE,
      });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_QUIZ_QUESTIONS,
        variables: {
          input: {
            difficulty: QuestionDifficulty.Easy,
            type: QuestionType.Multiple,
            category: QuestionCategory.Movie,
            number_questions: 10,
          },
        },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        CONSTANTS.ENDPOINT,
        `category=${
          CONSTANTS.MOVIE_CATEGORY_CODE
        }&amount=10&difficulty=${QuestionDifficulty.Easy.toLowerCase()}&type=${QuestionType.Multiple.toLowerCase()}`,
      );

      expect(data!.quiz).toEqual([]);
    });
  });

  describe('Query - Quiz (Mixed type)', () => {
    it('should query an array of mixed questions (movie and tv) from the OpenTrivia API and return it correctly', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({ response_code: 0, results: [tvQuestion] })
        .mockReturnValueOnce({ response_code: 0, results: [movieQuestion] });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_QUIZ_QUESTIONS,
        variables: {
          input: {
            difficulty: QuestionDifficulty.Easy,
            type: QuestionType.Multiple,
            category: QuestionCategory.Mixed,
            number_questions: 2,
          },
        },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        CONSTANTS.ENDPOINT,
        `category=${
          CONSTANTS.TV_CATEGORY_CODE
        }&amount=1&difficulty=${QuestionDifficulty.Easy.toLowerCase()}&type=${QuestionType.Multiple.toLowerCase()}`,
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        CONSTANTS.ENDPOINT,
        `category=${
          CONSTANTS.MOVIE_CATEGORY_CODE
        }&amount=1&difficulty=${QuestionDifficulty.Easy.toLowerCase()}&type=${QuestionType.Multiple.toLowerCase()}`,
      );

      expect(
        data!.quiz.findIndex((item: Question) => item.category === tvQuestion.category),
      ).toBeGreaterThanOrEqual(0);

      expect(
        data!.quiz.findIndex(
          (item: Question) => item.category === movieQuestion.category,
        ),
      ).toBeGreaterThanOrEqual(0);
    });

    it('should query an array of mixed questions (movie and tv) from the OpenTrivia API and return it correctly when all "mixed-able" params have "any" as value', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({ response_code: 0, results: [tvQuestion] })
        .mockReturnValueOnce({ response_code: 0, results: [movieQuestion] });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_QUIZ_QUESTIONS,
        variables: {
          input: {
            difficulty: QuestionDifficulty.Mixed,
            type: QuestionType.Mixed,
            category: QuestionCategory.Mixed,
            number_questions: 2,
          },
        },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        CONSTANTS.ENDPOINT,
        `category=${CONSTANTS.TV_CATEGORY_CODE}&amount=1`,
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        CONSTANTS.ENDPOINT,
        `category=${CONSTANTS.MOVIE_CATEGORY_CODE}&amount=1`,
      );

      expect(
        data!.quiz.findIndex((item: Question) => item.category === tvQuestion.category),
      ).toBeGreaterThanOrEqual(0);

      expect(
        data!.quiz.findIndex(
          (item: Question) => item.category === movieQuestion.category,
        ),
      ).toBeGreaterThanOrEqual(0);
    });

    it('should query an array of mixed questions (movie and tv) from the OpenTrivia API and return it correctly when some "mixed-able" params have "any" as value', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({ response_code: 0, results: [tvQuestion] })
        .mockReturnValueOnce({ response_code: 0, results: [movieQuestion] });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_QUIZ_QUESTIONS,
        variables: {
          input: {
            difficulty: QuestionDifficulty.Hard,
            type: QuestionType.Mixed,
            category: QuestionCategory.Mixed,
            number_questions: 2,
          },
        },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        CONSTANTS.ENDPOINT,
        `category=${
          CONSTANTS.TV_CATEGORY_CODE
        }&amount=1&difficulty=${QuestionDifficulty.Hard.toLowerCase()}`,
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        CONSTANTS.ENDPOINT,
        `category=${
          CONSTANTS.MOVIE_CATEGORY_CODE
        }&amount=1&difficulty=${QuestionDifficulty.Hard.toLowerCase()}`,
      );

      expect(
        data!.quiz.findIndex((item: Question) => item.category === tvQuestion.category),
      ).toBeGreaterThanOrEqual(0);

      expect(
        data!.quiz.findIndex(
          (item: Question) => item.category === movieQuestion.category,
        ),
      ).toBeGreaterThanOrEqual(0);
    });

    it('should query an array of mixed questions (movie and tv) from the OpenTrivia API and return it correctly when the tv response contains status_code = 1', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({ response_code: CONSTANTS.NO_RESPONSE_CODE })
        .mockReturnValueOnce({ response_code: 0, results: [movieQuestion] });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_QUIZ_QUESTIONS,
        variables: {
          input: {
            difficulty: QuestionDifficulty.Easy,
            type: QuestionType.Multiple,
            category: QuestionCategory.Mixed,
            number_questions: 2,
          },
        },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        CONSTANTS.ENDPOINT,
        `category=${
          CONSTANTS.TV_CATEGORY_CODE
        }&amount=1&difficulty=${QuestionDifficulty.Easy.toLowerCase()}&type=${QuestionType.Multiple.toLowerCase()}`,
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        CONSTANTS.ENDPOINT,
        `category=${
          CONSTANTS.MOVIE_CATEGORY_CODE
        }&amount=1&difficulty=${QuestionDifficulty.Easy.toLowerCase()}&type=${QuestionType.Multiple.toLowerCase()}`,
      );

      expect(
        data!.quiz.findIndex((item: Question) => item.category === tvQuestion.category),
      ).toEqual(-1);

      expect(
        data!.quiz.findIndex(
          (item: Question) => item.category === movieQuestion.category,
        ),
      ).toBeGreaterThanOrEqual(0);
    });

    it('should query an array of mixed questions (movie and tv) from the OpenTrivia API and return it correctly when the movie response contains status_code = 1', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({ response_code: 0, results: [tvQuestion] })
        .mockReturnValueOnce({ response_code: CONSTANTS.NO_RESPONSE_CODE });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_QUIZ_QUESTIONS,
        variables: {
          input: {
            difficulty: QuestionDifficulty.Easy,
            type: QuestionType.Multiple,
            category: QuestionCategory.Mixed,
            number_questions: 2,
          },
        },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        CONSTANTS.ENDPOINT,
        `category=${
          CONSTANTS.TV_CATEGORY_CODE
        }&amount=1&difficulty=${QuestionDifficulty.Easy.toLowerCase()}&type=${QuestionType.Multiple.toLowerCase()}`,
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        CONSTANTS.ENDPOINT,
        `category=${
          CONSTANTS.MOVIE_CATEGORY_CODE
        }&amount=1&difficulty=${QuestionDifficulty.Easy.toLowerCase()}&type=${QuestionType.Multiple.toLowerCase()}`,
      );

      expect(
        data!.quiz.every((item: Question) => item.category !== movieQuestion.category),
      ).toEqual(true);

      expect(
        data!.quiz.every((item: Question) => item.category === tvQuestion.category),
      ).toEqual(true);
    });

    it('should return an array of question correctly when user want a single question fo mixed types', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({ response_code: 0, results: [tvQuestion] })
        .mockReturnValueOnce({ response_code: 0, results: [movieQuestion] });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_QUIZ_QUESTIONS,
        variables: {
          input: {
            difficulty: QuestionDifficulty.Hard,
            type: QuestionType.Multiple,
            category: QuestionCategory.Mixed,
            number_questions: 1,
          },
        },
      });

      const tvRequestURL = `category=${
        CONSTANTS.TV_CATEGORY_CODE
      }&amount=1&difficulty=${QuestionDifficulty.Hard.toLowerCase()}&type=${QuestionType.Multiple.toLowerCase()}`;

      const movieRequestURL = `category=${
        CONSTANTS.MOVIE_CATEGORY_CODE
      }&amount=${Math.ceil(
        [movieQuestion].length / 2,
      )}&difficulty=${QuestionDifficulty.Hard.toLowerCase()}&type=${QuestionType.Multiple.toLowerCase()}`;

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(data!.quiz.length).toEqual(1);

      const isTVURLCalled = mockRestDataSourceGet.mock.calls[0][1] === tvRequestURL;
      const isMovieURLCalled = mockRestDataSourceGet.mock.calls[0][1] === movieRequestURL;

      expect(mockRestDataSourceGet.mock.calls[0][0]).toEqual(CONSTANTS.ENDPOINT);

      expect(isTVURLCalled || isMovieURLCalled).toBe(true);
    });
  });
});
