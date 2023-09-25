import * as GeneratedTypes from "@generated-types";

import { makeRequestParams } from "./make-request-params";
import { CONSTANTS } from "../constants";

const DEFAULT_AMOUNT = 3;

describe("DataSources/OpenTriviaAPI/make-request-params", () => {
  describe('When none of the params are "MIXED"', () => {
    it('should return the "request-params" correctly', () => {
      const params = makeRequestParams({
        numberOfQuestions: DEFAULT_AMOUNT,
        category: GeneratedTypes.QuizQuestionCategory.Movie,
        difficulty: GeneratedTypes.QuizQuestionDifficulty.Medium,
        type: GeneratedTypes.QuizQuestionType.Multiple,
      });
      expect(params).toEqual({
        amount: String(DEFAULT_AMOUNT),
        category: CONSTANTS.MOVIE_CATEGORY_CODE,
        difficulty: GeneratedTypes.QuizQuestionDifficulty.Medium.toLowerCase(),
        type: GeneratedTypes.QuizQuestionType.Multiple.toLowerCase(),
      });
    });
  });

  describe('When all params are "MIXED"', () => {
    it('should return the "request-params" correctly', () => {
      const params = makeRequestParams({
        numberOfQuestions: DEFAULT_AMOUNT,
        category: GeneratedTypes.QuizQuestionCategory.Mixed,
        difficulty: GeneratedTypes.QuizQuestionDifficulty.Mixed,
        type: GeneratedTypes.QuizQuestionType.Mixed,
      });
      expect(params).toEqual({
        amount: String(DEFAULT_AMOUNT),
        category: undefined,
        difficulty: undefined,
        type: undefined,
      });
    });
  });

  describe('When "difficulty" is "MIXED"', () => {
    it('should return the "request-params" correctly', () => {
      const params = makeRequestParams({
        numberOfQuestions: DEFAULT_AMOUNT,
        category: GeneratedTypes.QuizQuestionCategory.Movie,
        difficulty: GeneratedTypes.QuizQuestionDifficulty.Mixed,
        type: GeneratedTypes.QuizQuestionType.Multiple,
      });
      expect(params).toEqual({
        amount: String(DEFAULT_AMOUNT),
        category: CONSTANTS.MOVIE_CATEGORY_CODE,
        difficulty: undefined,
        type: GeneratedTypes.QuizQuestionType.Multiple.toLowerCase(),
      });
    });
  });

  describe('When "category" is "MIXED"', () => {
    it('should return the "request-params" correctly', () => {
      const params = makeRequestParams({
        numberOfQuestions: DEFAULT_AMOUNT,
        category: GeneratedTypes.QuizQuestionCategory.Mixed,
        difficulty: GeneratedTypes.QuizQuestionDifficulty.Medium,
        type: GeneratedTypes.QuizQuestionType.Multiple,
      });
      expect(params).toEqual({
        amount: String(DEFAULT_AMOUNT),
        category: undefined,
        difficulty: GeneratedTypes.QuizQuestionDifficulty.Medium.toLowerCase(),
        type: GeneratedTypes.QuizQuestionType.Multiple.toLowerCase(),
      });
    });
  });

  describe('When "type" is "MIXED"', () => {
    it('should return the "request-params" correctly', () => {
      const params = makeRequestParams({
        numberOfQuestions: DEFAULT_AMOUNT,
        category: GeneratedTypes.QuizQuestionCategory.Tv,
        difficulty: GeneratedTypes.QuizQuestionDifficulty.Medium,
        type: GeneratedTypes.QuizQuestionType.Mixed,
      });
      expect(params).toEqual({
        amount: String(DEFAULT_AMOUNT),
        category: CONSTANTS.TV_CATEGORY_CODE,
        difficulty: GeneratedTypes.QuizQuestionDifficulty.Medium.toLowerCase(),
        type: undefined,
      });
    });
  });
});
