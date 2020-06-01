import { RESTDataSource } from 'apollo-datasource-rest';

import { QuestionCategory, QuizInput, Question } from '@lib/types';

import drawTypeQuestionMixed from './helpers/drawn-type-question-mixed/drawnTypeQuestionMixed';
import makeQueryString from './helpers/make-query-string/makeQueryString';
import makeURLParams from './helpers/make-url-params/makeURLParams';
import shuffleQuestions from './helpers/shuffleQuestions';
import CONSTANTS from './utils/constants';

type GetRequestResponse = {
  response_code: number;
  results: Question[];
};

export interface Props {
  getQuestions(input: QuizInput): Promise<Question[]>;
}

class OpenTriviaAPI extends RESTDataSource implements Props {
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
        category: drawTypeQuestionMixed(),
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

    return shuffleQuestions([...tvQuestions, ...movieQuestions]);
  }

  async getQuestionsSingleType(input: QuizInput): Promise<Question[]> {
    const urlParams = makeURLParams(input);
    const queryString = makeQueryString(urlParams);

    const { results, response_code: responseCode } = await this.get<GetRequestResponse>(
      CONSTANTS.ENDPOINT,
      queryString,
    );

    if (responseCode === CONSTANTS.NO_RESPONSE_CODE) {
      return [];
    }

    return results;
  }
}

export default OpenTriviaAPI;
