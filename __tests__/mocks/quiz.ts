import { QuestionDifficulty, QuestionCategory, QuestionType } from '../../src/lib/types';

export const question = {
  category: 'category',
  type: 'type',
  difficulty: 'difficulty',
  question: 'question',
  correct_answer: 'correct_answer',
  incorrect_answers: ['incorrect_answers'],
};

export const movieQuestion = {
  category: 'movie',
  type: 'type',
  difficulty: 'difficulty',
  question: 'question',
  correct_answer: 'correct_answer',
  incorrect_answers: ['incorrect_answers'],
};

export const tvQuestion = {
  category: 'tv',
  type: 'type',
  difficulty: 'difficulty',
  question: 'question',
  correct_answer: 'correct_answer',
  incorrect_answers: ['incorrect_answers'],
};

export const movieQuestionsInput = {
  difficulty: QuestionDifficulty.Hard,
  category: QuestionCategory.Movie,
  type: QuestionType.Multiple,
  numberOfQuestions: 10,
};

export const tvQuestionsInput = {
  difficulty: QuestionDifficulty.Hard,
  category: QuestionCategory.Tv,
  type: QuestionType.Multiple,
  numberOfQuestions: 10,
};

export const mixedQuestionsInput = {
  difficulty: QuestionDifficulty.Hard,
  category: QuestionCategory.Mixed,
  type: QuestionType.Multiple,
  numberOfQuestions: 2,
};
