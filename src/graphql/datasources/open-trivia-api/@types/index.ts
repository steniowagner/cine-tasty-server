export type QuestionResponse = {
  incorrect_answers: string[];
  correct_answer: string;
  difficulty: string;
  question: string;
  category: string;
  type: string;
};

export type OpenTriviaQueryParams = {
  difficulty?: string;
  category: number;
  amount: number;
  type?: string;
};
