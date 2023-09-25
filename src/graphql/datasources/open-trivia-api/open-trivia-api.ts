import { RESTDataSource } from "@apollo/datasource-rest";

import { QuizInput, QueryQuizArgs, QuizQuestionCategory } from "@generated-types";

import { makeRequestParams, parseOpenTriviaAPIResult, CONSTANTS } from "./utils";
import { OpenTriviaAPIResponse } from "./types";

type HandleRequestParams = {
  numberOfQuestions?: number;
  category?: QuizQuestionCategory;
  input: QuizInput;
};

export default class OpenTriviaAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = CONSTANTS.BASE_URL;
  }

  private async execRequest(params: HandleRequestParams) {
    const response = await this.get<OpenTriviaAPIResponse>(CONSTANTS.ENDPOINT, {
      params: makeRequestParams({
        ...params.input,
        numberOfQuestions: params.numberOfQuestions ?? params.input.numberOfQuestions,
        category: params.category ?? params.input.category,
      }),
    });
    return parseOpenTriviaAPIResult(response.results);
  }

  private async handleRequestSingleMixedQuestionQuiz(params: QuizInput) {
    const category =
      Math.round(Math.random() * 2) % 2 === 0
        ? QuizQuestionCategory.Tv
        : QuizQuestionCategory.Movie;
    return this.execRequest({ input: params, category });
  }

  private async handleRequestMixedCategoryQuiz(params: QuizInput) {
    if (params.numberOfQuestions === 1) {
      return this.handleRequestSingleMixedQuestionQuiz(params);
    }
    const numberOfMovieQuestions = Math.ceil(params.numberOfQuestions / 2);
    const numberOfTVQuestions = params.numberOfQuestions - numberOfMovieQuestions;
    const [tvResponse, moviesResponse] = await Promise.all([
      this.execRequest({
        input: params,
        numberOfQuestions: numberOfTVQuestions,
        category: QuizQuestionCategory.Tv,
      }),
      this.execRequest({
        input: params,
        numberOfQuestions: numberOfMovieQuestions,
        category: QuizQuestionCategory.Movie,
      }),
    ]);
    return [...tvResponse, ...moviesResponse];
  }

  async getQuiz(params: QueryQuizArgs) {
    try {
      if (
        params.input.category.toLowerCase() === QuizQuestionCategory.Mixed.toLowerCase()
      ) {
        return this.handleRequestMixedCategoryQuiz(params.input);
      }
      return this.execRequest({ input: params.input });
    } catch (err) {
      console.error(err);
    }
  }
}
