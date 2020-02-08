const mockRestDataSourceGet = jest.fn();

import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';

import {
  QuestionDifficulty,
  QuestionType,
  QuestionCategory,
} from '../../../../../lib/types';
import { question } from '../../../../../__tests__/mocks/quiz.stub';
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

describe('Integration: DataSources-OpenTriviaAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Query - Quiz', () => {
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
        ENDPOINT,
        `category=${
          CONSTANTS.MOVIE_CATEGORY_CODE
        }&amount=10&difficulty=${QuestionDifficulty.Easy.toLowerCase()}&type=${QuestionType.Multiple.toLowerCase()}`,
      );

      expect(data!.quiz).toEqual([question]);
    });

    it('should query an array of questions from the OpenTrivia API and return it correctly when all "any-able" params have "any" as value', async () => {
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
            difficulty: QuestionDifficulty.Any,
            type: QuestionType.Any,
            category: QuestionCategory.Movie,
            number_questions: 10,
          },
        },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        ENDPOINT,
        `category=${CONSTANTS.MOVIE_CATEGORY_CODE}&amount=10`,
      );

      expect(data!.quiz).toEqual([question]);
    });

    it('should query an array of questions from the OpenTrivia API and return it correctly when some "any-able" params have "any" as value', async () => {
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
            type: QuestionType.Any,
            category: QuestionCategory.Movie,
            number_questions: 10,
          },
        },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        ENDPOINT,
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
        ENDPOINT,
        `category=${
          CONSTANTS.MOVIE_CATEGORY_CODE
        }&amount=10&difficulty=${QuestionDifficulty.Easy.toLowerCase()}&type=${QuestionType.Multiple.toLowerCase()}`,
      );

      expect(data!.quiz).toEqual([]);
    });
  });
});
