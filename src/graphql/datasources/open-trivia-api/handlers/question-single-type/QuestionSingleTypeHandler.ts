import { OpenTriviaAPIHandler, GetOpenTriviaAPIRequest } from '@open-trivia-api-types';
import { QuizInput, Question } from '@lib/types';

import { makeRequestQueryString, parseResult } from '../../helpers';
import CONSTANTS from '../../utils/constants';

class QuestionSingleTypeHandler implements OpenTriviaAPIHandler<QuizInput> {
  execGetRequest: GetOpenTriviaAPIRequest;

  constructor(execGetRequest: GetOpenTriviaAPIRequest) {
    this.execGetRequest = execGetRequest;
  }

  async handle(input: QuizInput): Promise<Question[]> {
    const queryString = makeRequestQueryString(input);

    const { results, response_code: responseCode } = await this.execGetRequest(
      CONSTANTS.ENDPOINT,
      queryString,
    );

    if (responseCode === CONSTANTS.NO_RESPONSE_CODE) {
      return [];
    }

    const parsedResult = parseResult(results);

    return parsedResult;
  }
}

export default QuestionSingleTypeHandler;
