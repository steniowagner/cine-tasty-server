const mockRestDataSourceGet = jest.fn();

import { gql } from 'apollo-server';

import { tvQuestion, movieQuestion } from '../../../../../../__tests__/mocks/quiz';
import makeTestQuery from '../../../../../../__tests__/utils/makeTestQuery';
import CONSTANTS from '../../utils/constants';
import {
  QuestionDifficulty,
  QuestionCategory,
  QuestionType,
  Question,
} from '../../../../../lib/types';

const GET_QUIZ_QUESTIONS = gql`
  query GetQuizQuestions($input: QuizInput!) {
    quiz(input: $input) {
      options
      category
      type
      difficulty
      question
      correctAnswer
    }
  }
`;

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

describe('Integration: DataSources/OpenTriviaAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Query - Quiz (Movie category)', () => {
    it('should return an array of questions correctly', async () => {
      const results = [movieQuestion];

      mockRestDataSourceGet.mockResolvedValueOnce({
        response_code: 0,
        results,
      });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_QUIZ_QUESTIONS,
        variables: {
          input: {
            difficulty: QuestionDifficulty.Easy,
            category: QuestionCategory.Movie,
            type: QuestionType.Multiple,
            numberOfQuestions: 10,
          },
        },
      });

      expect(
        data.quiz.every(
          (question, index) =>
            question.correctAnswer === results[index].correct_answer &&
            question.difficulty === results[index].difficulty &&
            question.category === results[index].category &&
            question.question === results[index].question &&
            question.type === results[index].type,
        ),
      ).toBe(true);

      expect(
        data.quiz.every((question, index) => {
          const questionAlternatives = [
            results[index].correct_answer,
            ...results[index].incorrect_answers,
          ];

          const isOptionIncluded = question.options.every(option =>
            questionAlternatives.includes(option),
          );

          return isOptionIncluded;
        }),
      );
    });

    it('should return an empty array when the "response_code" is "1"', async () => {
      mockRestDataSourceGet.mockResolvedValueOnce({
        response_code: CONSTANTS.NO_RESPONSE_CODE,
      });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_QUIZ_QUESTIONS,
        variables: {
          input: {
            difficulty: QuestionDifficulty.Easy,
            category: QuestionCategory.Movie,
            type: QuestionType.Multiple,
            numberOfQuestions: 10,
          },
        },
      });

      expect(data.quiz).toEqual([]);
    });
  });

  describe('Query - Quiz (TV category)', () => {
    it('should return an array of questions correctly', async () => {
      const results = [tvQuestion];

      mockRestDataSourceGet.mockResolvedValueOnce({
        response_code: 0,
        results,
      });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_QUIZ_QUESTIONS,
        variables: {
          input: {
            difficulty: QuestionDifficulty.Easy,
            category: QuestionCategory.Tv,
            type: QuestionType.Multiple,
            numberOfQuestions: 10,
          },
        },
      });

      expect(
        data.quiz.every(
          (question, index) =>
            question.correctAnswer === results[index].correct_answer &&
            question.difficulty === results[index].difficulty &&
            question.category === results[index].category &&
            question.question === results[index].question &&
            question.type === results[index].type,
        ),
      ).toBe(true);

      expect(
        data.quiz.every((question, index) => {
          const questionAlternatives = [
            results[index].correct_answer,
            ...results[index].incorrect_answers,
          ];

          const isOptionIncluded = question.options.every(option =>
            questionAlternatives.includes(option),
          );

          return isOptionIncluded;
        }),
      );
    });

    it('should return an empty array when the "response_code" is "1"', async () => {
      mockRestDataSourceGet.mockResolvedValueOnce({
        response_code: CONSTANTS.NO_RESPONSE_CODE,
      });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_QUIZ_QUESTIONS,
        variables: {
          input: {
            difficulty: QuestionDifficulty.Easy,
            category: QuestionCategory.Tv,
            type: QuestionType.Multiple,
            numberOfQuestions: 10,
          },
        },
      });

      expect(data.quiz).toEqual([]);
    });
  });

  describe('Query - Quiz (Mixed categories)', () => {
    it('should return an array of mixed questions correctly', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({ response_code: 0, results: [tvQuestion] })
        .mockReturnValueOnce({ response_code: 0, results: [movieQuestion] });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_QUIZ_QUESTIONS,
        variables: {
          input: {
            difficulty: QuestionDifficulty.Easy,
            category: QuestionCategory.Mixed,
            type: QuestionType.Multiple,
            numberOfQuestions: 2,
          },
        },
      });

      expect(
        data.quiz.findIndex((item: Question) => item.category === tvQuestion.category),
      ).toBeGreaterThanOrEqual(0);

      expect(
        data.quiz.findIndex((item: Question) => item.category === movieQuestion.category),
      ).toBeGreaterThanOrEqual(0);
    });

    it('should return an array of mixed questions correctly when "type" is "Mixed', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({ response_code: 0, results: [tvQuestion] })
        .mockReturnValueOnce({ response_code: 0, results: [movieQuestion] });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_QUIZ_QUESTIONS,
        variables: {
          input: {
            difficulty: QuestionDifficulty.Mixed,
            category: QuestionCategory.Mixed,
            type: QuestionType.Mixed,
            numberOfQuestions: 2,
          },
        },
      });

      expect(
        data.quiz.findIndex((item: Question) => item.category === tvQuestion.category),
      ).toBeGreaterThanOrEqual(0);

      expect(
        data.quiz.findIndex((item: Question) => item.category === movieQuestion.category),
      ).toBeGreaterThanOrEqual(0);
    });

    it('should return an array of mixed questions correctly when the "status_code" of "TV response" is "1"', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({ response_code: CONSTANTS.NO_RESPONSE_CODE })
        .mockReturnValueOnce({ response_code: 0, results: [movieQuestion] });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_QUIZ_QUESTIONS,
        variables: {
          input: {
            difficulty: QuestionDifficulty.Easy,
            category: QuestionCategory.Mixed,
            type: QuestionType.Multiple,
            numberOfQuestions: 2,
          },
        },
      });

      expect(
        data.quiz.findIndex((item: Question) => item.category === tvQuestion.category),
      ).toEqual(-1);

      expect(
        data.quiz.findIndex((item: Question) => item.category === movieQuestion.category),
      ).toBeGreaterThanOrEqual(0);
    });

    it('should return an array of mixed questions correctly when the "status_code" of "Movie response" is "1"', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({ response_code: 0, results: [tvQuestion] })
        .mockReturnValueOnce({ response_code: CONSTANTS.NO_RESPONSE_CODE });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_QUIZ_QUESTIONS,
        variables: {
          input: {
            difficulty: QuestionDifficulty.Easy,
            category: QuestionCategory.Mixed,
            type: QuestionType.Multiple,
            numberOfQuestions: 2,
          },
        },
      });

      expect(
        data.quiz.every((item: Question) => item.category !== movieQuestion.category),
      ).toEqual(true);

      expect(
        data.quiz.every((item: Question) => item.category === tvQuestion.category),
      ).toEqual(true);
    });
  });
});
