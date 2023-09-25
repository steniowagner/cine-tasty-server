import * as GeneratedTypes from "@generated-types";

import OpenTriviaAPI from "./open-trivia-api";
import { CONSTANTS } from "./utils";

const DEFAULT_AMOUNT = 3;

const mockGet = jest.fn().mockReturnValue({
  response_code: 0,
  results: [],
});

jest.mock("@apollo/datasource-rest", () => {
  ("");
  class MockRESTDataSource {
    baseUrl = "";
    get = mockGet;
  }
  return {
    RESTDataSource: MockRESTDataSource,
  };
});

describe("DataSources/OpenTriviaAPI/Unit", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When "category" is "MIXED"', () => {
    describe('When "numberOfQuestions" is greater than "1"', () => {
      describe('When "difficulty" and "type" are not "MIXED"', () => {
        it('should call "RESTDatasource.get" with the correct "query-params"', async () => {
          const openTriviaAPI = new OpenTriviaAPI();
          await openTriviaAPI.getQuiz({
            input: {
              numberOfQuestions: 3,
              category: GeneratedTypes.QuizQuestionCategory.Mixed,
              difficulty: GeneratedTypes.QuizQuestionDifficulty.Easy,
              type: GeneratedTypes.QuizQuestionType.Boolean,
            },
          });
          const tvRequestParams = mockGet.mock.calls[0][1].params;
          const movieRequestParams = mockGet.mock.calls[1][1].params;
          expect(mockGet.mock.calls[0][0]).toEqual(CONSTANTS.ENDPOINT);
          expect(mockGet.mock.calls[1][0]).toEqual(CONSTANTS.ENDPOINT);
          // tv-request-params
          expect(tvRequestParams.amount).toEqual(String(1));
          expect(tvRequestParams.category).toEqual(CONSTANTS.TV_CATEGORY_CODE);
          expect(tvRequestParams.difficulty).toEqual(
            GeneratedTypes.QuizQuestionDifficulty.Easy.toLowerCase(),
          );
          expect(tvRequestParams.type).toEqual(
            GeneratedTypes.QuizQuestionType.Boolean.toLowerCase(),
          );
          // movie-request-params
          expect(movieRequestParams.amount).toEqual(String(2));
          expect(movieRequestParams.category).toEqual(CONSTANTS.MOVIE_CATEGORY_CODE);
          expect(movieRequestParams.difficulty).toEqual(
            GeneratedTypes.QuizQuestionDifficulty.Easy.toLowerCase(),
          );
          expect(movieRequestParams.type).toEqual(
            GeneratedTypes.QuizQuestionType.Boolean.toLowerCase(),
          );
        });
      });

      describe('When "difficulty" is "MIXED"', () => {
        it('should call "RESTDatasource.get" with the correct "query-params"', async () => {
          const openTriviaAPI = new OpenTriviaAPI();
          await openTriviaAPI.getQuiz({
            input: {
              numberOfQuestions: 3,
              category: GeneratedTypes.QuizQuestionCategory.Mixed,
              difficulty: GeneratedTypes.QuizQuestionDifficulty.Mixed,
              type: GeneratedTypes.QuizQuestionType.Multiple,
            },
          });
          const tvRequestParams = mockGet.mock.calls[0][1].params;
          const movieRequestParams = mockGet.mock.calls[1][1].params;
          expect(mockGet.mock.calls[0][0]).toEqual(CONSTANTS.ENDPOINT);
          expect(mockGet.mock.calls[1][0]).toEqual(CONSTANTS.ENDPOINT);
          // tv-request-params
          expect(tvRequestParams).toEqual({
            amount: String(1),
            category: CONSTANTS.TV_CATEGORY_CODE,
            type: GeneratedTypes.QuizQuestionType.Multiple.toLowerCase(),
          });
          // movie-request-params
          expect(movieRequestParams).toEqual({
            amount: String(2),
            category: CONSTANTS.MOVIE_CATEGORY_CODE,
            type: GeneratedTypes.QuizQuestionType.Multiple.toLowerCase(),
          });
        });
      });

      describe('When "type" is "MIXED"', () => {
        it('should call "RESTDatasource.get" with the correct "query-params"', async () => {
          const openTriviaAPI = new OpenTriviaAPI();
          await openTriviaAPI.getQuiz({
            input: {
              numberOfQuestions: 3,
              category: GeneratedTypes.QuizQuestionCategory.Mixed,
              difficulty: GeneratedTypes.QuizQuestionDifficulty.Hard,
              type: GeneratedTypes.QuizQuestionType.Mixed,
            },
          });
          const tvRequestParams = mockGet.mock.calls[0][1].params;
          const movieRequestParams = mockGet.mock.calls[1][1].params;
          expect(mockGet.mock.calls[0][0]).toEqual(CONSTANTS.ENDPOINT);
          expect(mockGet.mock.calls[1][0]).toEqual(CONSTANTS.ENDPOINT);
          // tv-request-params
          expect(tvRequestParams).toEqual({
            amount: String(1),
            category: CONSTANTS.TV_CATEGORY_CODE,
            difficulty: GeneratedTypes.QuizQuestionDifficulty.Hard.toLowerCase(),
          });
          // movie-request-params
          expect(movieRequestParams).toEqual({
            amount: String(2),
            category: CONSTANTS.MOVIE_CATEGORY_CODE,
            difficulty: GeneratedTypes.QuizQuestionDifficulty.Hard.toLowerCase(),
          });
        });
      });

      describe('When "type" and "difficulty" are "MIXED"', () => {
        it('should call "RESTDatasource.get" with the correct "query-params"', async () => {
          const openTriviaAPI = new OpenTriviaAPI();
          await openTriviaAPI.getQuiz({
            input: {
              numberOfQuestions: 3,
              category: GeneratedTypes.QuizQuestionCategory.Mixed,
              difficulty: GeneratedTypes.QuizQuestionDifficulty.Mixed,
              type: GeneratedTypes.QuizQuestionType.Mixed,
            },
          });
          const tvRequestParams = mockGet.mock.calls[0][1].params;
          const movieRequestParams = mockGet.mock.calls[1][1].params;
          expect(mockGet.mock.calls[0][0]).toEqual(CONSTANTS.ENDPOINT);
          expect(mockGet.mock.calls[1][0]).toEqual(CONSTANTS.ENDPOINT);
          // tv-request-params
          expect(tvRequestParams).toEqual({
            amount: String(1),
            category: CONSTANTS.TV_CATEGORY_CODE,
          });
          // movie-request-params
          expect(movieRequestParams).toEqual({
            amount: String(2),
            category: CONSTANTS.MOVIE_CATEGORY_CODE,
          });
        });
      });
    });

    describe('When "numberOfQuestions" is "1"', () => {
      describe('When "difficulty" and "type" are not "MIXED"', () => {
        it('should call "RESTDatasource.get" with the correct "query-params"', async () => {
          const openTriviaAPI = new OpenTriviaAPI();
          await openTriviaAPI.getQuiz({
            input: {
              numberOfQuestions: 1,
              category: GeneratedTypes.QuizQuestionCategory.Mixed,
              difficulty: GeneratedTypes.QuizQuestionDifficulty.Easy,
              type: GeneratedTypes.QuizQuestionType.Boolean,
            },
          });
          expect(mockGet.mock.calls[0][0]).toEqual(CONSTANTS.ENDPOINT);
          expect(mockGet.mock.calls[0][1].params.amount).toEqual(String(1));
          expect(
            mockGet.mock.calls[0][1].params.category === CONSTANTS.MOVIE_CATEGORY_CODE ||
              mockGet.mock.calls[0][1].params.category === CONSTANTS.TV_CATEGORY_CODE,
          ).toEqual(true);
          expect(mockGet.mock.calls[0][1].params.difficulty).toEqual(
            GeneratedTypes.QuizQuestionDifficulty.Easy.toLowerCase(),
          );
          expect(mockGet.mock.calls[0][1].params.type).toEqual(
            GeneratedTypes.QuizQuestionType.Boolean.toLowerCase(),
          );
        });
      });

      describe('When "difficulty" is "MIXED"', () => {
        it('should call "RESTDatasource.get" with the correct "query-params"', async () => {
          const openTriviaAPI = new OpenTriviaAPI();
          await openTriviaAPI.getQuiz({
            input: {
              numberOfQuestions: 1,
              category: GeneratedTypes.QuizQuestionCategory.Mixed,
              difficulty: GeneratedTypes.QuizQuestionDifficulty.Mixed,
              type: GeneratedTypes.QuizQuestionType.Boolean,
            },
          });
          expect(mockGet.mock.calls[0][0]).toEqual(CONSTANTS.ENDPOINT);
          expect(mockGet.mock.calls[0][1].params.amount).toEqual(String(1));
          expect(
            mockGet.mock.calls[0][1].params.category === CONSTANTS.MOVIE_CATEGORY_CODE ||
              mockGet.mock.calls[0][1].params.category === CONSTANTS.TV_CATEGORY_CODE,
          ).toEqual(true);
          expect(mockGet.mock.calls[0][1].params.difficulty).toEqual(undefined);
          expect(mockGet.mock.calls[0][1].params.type).toEqual(
            GeneratedTypes.QuizQuestionType.Boolean.toLowerCase(),
          );
        });
      });

      describe('When "type" is "MIXED"', () => {
        it('should call "RESTDatasource.get" with the correct "query-params"', async () => {
          const openTriviaAPI = new OpenTriviaAPI();
          await openTriviaAPI.getQuiz({
            input: {
              numberOfQuestions: 1,
              category: GeneratedTypes.QuizQuestionCategory.Mixed,
              difficulty: GeneratedTypes.QuizQuestionDifficulty.Hard,
              type: GeneratedTypes.QuizQuestionType.Mixed,
            },
          });
          expect(mockGet.mock.calls[0][0]).toEqual(CONSTANTS.ENDPOINT);
          expect(mockGet.mock.calls[0][1].params.amount).toEqual(String(1));
          expect(
            mockGet.mock.calls[0][1].params.category === CONSTANTS.MOVIE_CATEGORY_CODE ||
              mockGet.mock.calls[0][1].params.category === CONSTANTS.TV_CATEGORY_CODE,
          ).toEqual(true);
          expect(mockGet.mock.calls[0][1].params.difficulty).toEqual(
            GeneratedTypes.QuizQuestionDifficulty.Hard.toLowerCase(),
          );
          expect(mockGet.mock.calls[0][1].params.type).toEqual(undefined);
        });
      });

      describe('When "difficulty" and "type" are not "MIXED"', () => {
        it('should call "RESTDatasource.get" with the correct "query-params"', async () => {
          const openTriviaAPI = new OpenTriviaAPI();
          await openTriviaAPI.getQuiz({
            input: {
              numberOfQuestions: 1,
              category: GeneratedTypes.QuizQuestionCategory.Mixed,
              difficulty: GeneratedTypes.QuizQuestionDifficulty.Mixed,
              type: GeneratedTypes.QuizQuestionType.Mixed,
            },
          });
          expect(mockGet.mock.calls[0][0]).toEqual(CONSTANTS.ENDPOINT);
          expect(mockGet.mock.calls[0][1].params.amount).toEqual(String(1));
          expect(
            mockGet.mock.calls[0][1].params.category === CONSTANTS.MOVIE_CATEGORY_CODE ||
              mockGet.mock.calls[0][1].params.category === CONSTANTS.TV_CATEGORY_CODE,
          ).toEqual(true);
          expect(mockGet.mock.calls[0][1].params.difficulty).toEqual(undefined);
          expect(mockGet.mock.calls[0][1].params.type).toEqual(undefined);
        });
      });
    });
  });

  describe('When "category" is not "MIXED"', () => {
    it('should call "RESTDatasource.get" with the correct "query-params"', async () => {
      const openTriviaAPI = new OpenTriviaAPI();
      await openTriviaAPI.getQuiz({
        input: {
          numberOfQuestions: DEFAULT_AMOUNT,
          category: GeneratedTypes.QuizQuestionCategory.Movie,
          difficulty: GeneratedTypes.QuizQuestionDifficulty.Medium,
          type: GeneratedTypes.QuizQuestionType.Multiple,
        },
      });
      expect(mockGet.mock.calls[0][0]).toEqual(CONSTANTS.ENDPOINT);
      expect(mockGet.mock.calls[0][1].params).toEqual({
        amount: String(DEFAULT_AMOUNT),
        category: CONSTANTS.MOVIE_CATEGORY_CODE,
        difficulty: GeneratedTypes.QuizQuestionDifficulty.Medium.toLowerCase(),
        type: GeneratedTypes.QuizQuestionType.Multiple.toLowerCase(),
      });
    });
  });
});
