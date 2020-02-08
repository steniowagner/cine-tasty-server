import { RESTDataSource } from 'apollo-datasource-rest';

import {
  QuestionCategory,
  QuestionDifficulty,
  Question,
  QuestionType,
  QuizInput,
} from '../../../lib/types';
import CONSTANTS from './utils/constants';

const BASE_URL = 'https://opentdb.com';
const ENDPOINT = 'api.php';

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
    this.baseURL = BASE_URL;
  }

  async getQuestions(input: QuizInput): Promise<Question[]> {
    const urlParams = this.getURLParams(input);

    const { results, response_code: responseCode } = await this.get<GetRequestResponse>(
      ENDPOINT,
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

    if (difficulty.toLowerCase() !== QuestionDifficulty.Any.toLowerCase()) {
      queryParams = {
        ...queryParams,
        difficulty: difficulty.toLowerCase(),
      };
    }

    if (type.toLowerCase() !== QuestionType.Any.toLowerCase()) {
      queryParams = {
        ...queryParams,
        type: type.toLowerCase(),
      };
    }

    return this.parseQueryParams(queryParams);
  }
}

export default OpenTriviaAPI;
