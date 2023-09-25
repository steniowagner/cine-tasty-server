import * as GeneratedTypes from "@generated-types";

import { CONSTANTS } from "../constants";

const getDifficulty = (difficulty: GeneratedTypes.QuizQuestionDifficulty) =>
  difficulty.toLowerCase() === GeneratedTypes.QuizQuestionDifficulty.Mixed.toLowerCase()
    ? undefined
    : difficulty.toLowerCase();

const getCategory = (category: GeneratedTypes.QuizQuestionCategory) => {
  const categoryCodeMapping: Record<
    GeneratedTypes.QuizQuestionCategory,
    string | undefined
  > = {
    MOVIE: CONSTANTS.MOVIE_CATEGORY_CODE,
    TV: CONSTANTS.TV_CATEGORY_CODE,
    MIXED: undefined,
  };
  return categoryCodeMapping[category];
};

const getType = (type: GeneratedTypes.QuizQuestionType) => {
  const quizTypeMapping: Record<GeneratedTypes.QuizQuestionType, string | undefined> = {
    BOOLEAN: CONSTANTS.BOOLEAN_CHOICE_QUIZ_PARAM,
    MULTIPLE: CONSTANTS.MULTIPLE_CHOICE_QUIZ_PARAM,
    MIXED: undefined,
  };
  return quizTypeMapping[type];
};

export const makeRequestParams = (params: GeneratedTypes.QuizInput) => ({
  amount: String(params.numberOfQuestions),
  category: getCategory(params.category),
  difficulty: getDifficulty(params.difficulty),
  type: getType(params.type),
});
