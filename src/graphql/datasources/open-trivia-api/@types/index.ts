import { Question } from '@lib/types';

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

export interface OpenTriviaAPIHandler<P> {
  handle(params: P): Promise<Question[]>;
}

export type GetRequestResponse = {
  results: QuestionResponse[];
  response_code: number;
};

export type GetOpenTriviaAPIRequest = (
  endpoint: string,
  queryString: string,
) => Promise<GetRequestResponse>;
