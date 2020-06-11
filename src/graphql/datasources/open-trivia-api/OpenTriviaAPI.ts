import { RESTDataSource } from 'apollo-datasource-rest';

import { QuestionCategory, QuizInput, Question } from '@lib/types';
import shuffleArray from '@utils/shuffle-array/shuffleArray';
import { QuestionResponse } from '@open-trivia-api-types';

import {
  drawnTypeQuestionMixed,
  makeQueryString,
  makeURLParams,
  parseResult,
} from './helpers';

import CONSTANTS from './utils/constants';

type GetRequestResponse = {
  results: QuestionResponse[];
  response_code: number;
};

class OpenTriviaAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = CONSTANTS.BASE_URL;
  }

  async getQuestions(input: QuizInput): Promise<Question[]> {
    if (input.category.toLowerCase() === QuestionCategory.Mixed.toLowerCase()) {
      return this.getQuestionsMixedTypes({
        numberOfQuestions: input.numberOfQuestions,
        difficulty: input.difficulty,
        type: input.type,
      });
    }

    return this.getQuestionsSingleType(input);
  }

  async getQuestionsMixedTypes(input: Omit<QuizInput, 'category'>): Promise<Question[]> {
    if (input.numberOfQuestions === 1) {
      return this.getQuestionsSingleType({
        ...input,
        category: drawnTypeQuestionMixed(),
      });
    }

    const movieQuestionsAmount = Math.ceil(input.numberOfQuestions / 2);
    const tvQuestionsAmount = Math.floor(input.numberOfQuestions / 2);

    const [tvQuestions, movieQuestions] = await Promise.all<Question[], Question[]>([
      this.getQuestionsSingleType({
        ...input,
        category: QuestionCategory.Tv,
        numberOfQuestions: tvQuestionsAmount,
      }),
      this.getQuestionsSingleType({
        ...input,
        category: QuestionCategory.Movie,
        numberOfQuestions: movieQuestionsAmount,
      }),
    ]);

    return shuffleArray<Question>([...tvQuestions, ...movieQuestions]);
  }

  getRequestQueryString(input: QuizInput): string {
    const urlParams = makeURLParams(input);

    const queryString = makeQueryString(urlParams);

    return queryString;
  }

  async getQuestionsSingleType(input: QuizInput): Promise<Question[]> {
    const queryString = this.getRequestQueryString(input);

    const { results, response_code: responseCode } = await this.get<GetRequestResponse>(
      CONSTANTS.ENDPOINT,
      queryString,
    );

    if (responseCode === CONSTANTS.NO_RESPONSE_CODE) {
      return [];
    }

    return parseResult(results);
  }
}

export default OpenTriviaAPI;
