import shuffleArray from '@utils/shuffle-array/shuffleArray';
import { QuestionResponse } from '@types';
import { Question } from '@lib/types';

const parseQuizResponseToQuiz = (questionResponse: QuestionResponse): Question => {
  const options = shuffleArray<string>([
    ...questionResponse.incorrect_answers,
    questionResponse.correct_answer,
  ]);

  return {
    correctAnswer: questionResponse.correct_answer,
    difficulty: questionResponse.difficulty,
    category: questionResponse.category,
    question: questionResponse.question,
    type: questionResponse.type,
    options,
  };
};

export const parseResult = (results: QuestionResponse[]): Question[] => {
  const parsedResults = results.map(result => parseQuizResponseToQuiz(result));

  return parsedResults;
};
