import he from "he";

import { QuizQuestion } from "@generated-types";

import { shuffleArray } from "../shuffle-array";
import { OpenTriviaResult } from "../../types";

export const parseOpenTriviaAPIResult = (results: OpenTriviaResult[]): QuizQuestion[] =>
  results.map((result) => {
    const options = shuffleArray([
      ...result.incorrect_answers,
      result.correct_answer,
    ]).map((option) => he.decode(option));
    return {
      correctAnswer: he.decode(result.correct_answer),
      question: he.decode(result.question),
      difficulty: result.difficulty,
      category: result.category,
      type: result.type,
      options,
    };
  });
