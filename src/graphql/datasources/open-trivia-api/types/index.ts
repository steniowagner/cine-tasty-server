export type OpenTriviaResult = {
  category: string;
  type: string;
  difficulty: "hard" | "medium" | "easy";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type OpenTriviaAPIResponse = {
  response_code: number;
  results: OpenTriviaResult[];
};
