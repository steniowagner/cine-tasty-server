import { QuestionCategory, QuizInput, Question } from '@lib/types';
import { RESTDataSource } from 'apollo-datasource-rest';

import { GetRequestResponse, GetOpenTriviaAPIRequest } from '@open-trivia-api-types';

import QuestionsMixedTypesHandler from './handlers/questions-mixed-types/QuestionsMixedTypesHandler';
import QuestionSingleTypeHandler from './handlers/question-single-type/QuestionSingleTypeHandler';

import CONSTANTS from './utils/constants';

class OpenTriviaAPI extends RESTDataSource {
  questionsMixedTypesHandler: QuestionsMixedTypesHandler;
  questionSingleTypeHandler: QuestionSingleTypeHandler;

  constructor() {
    super();

    this.questionSingleTypeHandler = new QuestionSingleTypeHandler(this.execGetRequest);

    this.questionsMixedTypesHandler = new QuestionsMixedTypesHandler(
      this.questionSingleTypeHandler,
    );

    this.baseURL = CONSTANTS.BASE_URL;
  }

  private execGetRequest: GetOpenTriviaAPIRequest = async (
    endpoint: string,
    queryString: string,
  ): Promise<GetRequestResponse> => this.get<GetRequestResponse>(endpoint, queryString);

  async getQuestions(input: QuizInput): Promise<Question[]> {
    if (input.category.toLowerCase() === QuestionCategory.Mixed.toLowerCase()) {
      const questionsMixedTypes = await this.questionsMixedTypesHandler.handle({
        numberOfQuestions: input.numberOfQuestions,
        difficulty: input.difficulty,
        type: input.type,
      });

      return questionsMixedTypes;
    }

    const questionsSingleType = this.questionSingleTypeHandler.handle(input);

    return questionsSingleType;
  }
}

export default OpenTriviaAPI;
