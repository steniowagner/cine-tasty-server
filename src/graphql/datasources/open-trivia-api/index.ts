import { RESTDataSource } from 'apollo-datasource-rest';

import shuffleQuestions from './helpers/shuffleQuestions';
import {
  QuestionCategory,
  QuestionDifficulty,
  Question,
  QuestionType,
  QuizInput,
} from '../../../lib/types';
import CONSTANTS from './utils/constants';
type QueryParams = {
  category: number;
  amount: number;
  difficulty?: string;
  type?: string;
};

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
      return this.getQuestionsMixedTypes(input);
    }

    return this.getQuestionsSingleType(input);
  }

  async getQuestionsMixedTypes(input: QuizInput): Promise<Question[]> {
    if (input.number_questions === 1) {
      return this.getQuestionsSingleType({
        ...input,
        category: this.drawTypeQuestionMixed(),
      });
    }

    const movieQuestionsAmount = Math.ceil(input.number_questions / 2);
    const tvQuestionsAmount = Math.floor(input.number_questions / 2);

    const [tvQuestions, movieQuestions] = await Promise.all<Question[], Question[]>([
      this.getQuestionsSingleType({
        ...input,
        category: QuestionCategory.Tv,
        number_questions: tvQuestionsAmount,
      }),
      this.getQuestionsSingleType({
        ...input,
        category: QuestionCategory.Movie,
        number_questions: movieQuestionsAmount,
      }),
    ]);

    return shuffleQuestions([...tvQuestions, ...movieQuestions]);
  }

  async getQuestionsSingleType(input: QuizInput): Promise<Question[]> {
    const urlParams = this.getURLParams(input);

    const { results, response_code: responseCode } = await this.get<GetRequestResponse>(
      CONSTANTS.ENDPOINT,
      urlParams,
    );

    if (responseCode === CONSTANTS.NO_RESPONSE_CODE) {
      return [];
    }

    return results;
  }

  getQuestionAmount(amount: number): number {
    if (amount < CONSTANTS.MIN_QUESTIONS_REQUEST) {
      return CONSTANTS.MIN_QUESTIONS_REQUEST;
    }

    if (amount > CONSTANTS.MAX_QUESTIONS_REQUEST) {
      return CONSTANTS.MAX_QUESTIONS_REQUEST;
    }

    return amount;
  }

  getCategoryCode(category: QuestionCategory): number {
    if (category.toLowerCase() === QuestionCategory.Movie.toLowerCase()) {
      return CONSTANTS.MOVIE_CATEGORY_CODE;
    }

    return CONSTANTS.TV_CATEGORY_CODE;
  }

  parseQueryParams(queryParams: QueryParams): string {
    return Object.entries(queryParams)
      .reduce((accumulator: string[], current) => {
        const [key, value] = current;

        return [...accumulator, `${key}=${String(value).toLowerCase()}`];
      }, [])
      .join('&');
  }

  getURLParams({ number_questions, difficulty, category, type }: QuizInput): string {
    let queryParams: QueryParams = {
      category: this.getCategoryCode(category),
      amount: this.getQuestionAmount(number_questions),
    };

    if (difficulty.toLowerCase() !== QuestionDifficulty.Mixed.toLowerCase()) {
      queryParams = {
        ...queryParams,
        difficulty: difficulty.toLowerCase(),
      };
    }

    if (type.toLowerCase() !== QuestionType.Mixed.toLowerCase()) {
      queryParams = {
        ...queryParams,
        type: type.toLowerCase(),
      };
    }

    return this.parseQueryParams(queryParams);
  }

  drawTypeQuestionMixed(): QuestionCategory {
    const randomNumber = Math.round(Math.random() * 10);

    if (randomNumber % 2 === 0) {
      return QuestionCategory.Tv;
    }

    return QuestionCategory.Movie;
  }
}

export default OpenTriviaAPI;
