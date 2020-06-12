const mockRestDataSourceGet = jest.fn();

import QuestionSingleTypeHandler from './QuestionSingleTypeHandler';
import { question } from '../../../../../../__tests__/mocks/quiz';
import CONSTANTS from '../../utils/constants';
import {
  QuestionDifficulty,
  QuestionCategory,
  QuestionType,
} from '../../../../../lib/types';

const tvQuestionsInput = {
  difficulty: QuestionDifficulty.Hard,
  category: QuestionCategory.Tv,
  type: QuestionType.Multiple,
  numberOfQuestions: 10,
};

const movieQuestionsInput = {
  difficulty: QuestionDifficulty.Hard,
  category: QuestionCategory.Movie,
  type: QuestionType.Multiple,
  numberOfQuestions: 10,
};

jest.mock('apollo-datasource-rest', () => {
  class MockRESTDataSource {
    baseUrl = '';
    get = mockRestDataSourceGet;
  }

  return {
    RESTDataSource: MockRESTDataSource,
    HTTPCache: class HTTPCache {},
  };
});

const tvDefaultQueryString = `amount=${tvQuestionsInput.numberOfQuestions}&category=${
  CONSTANTS.TV_CATEGORY_CODE
}&difficulty=${tvQuestionsInput.difficulty.toLowerCase()}&type=${tvQuestionsInput.type.toLowerCase()}`;

const movieDefaultQueryString = `amount=${
  movieQuestionsInput.numberOfQuestions
}&category=${
  CONSTANTS.MOVIE_CATEGORY_CODE
}&difficulty=${movieQuestionsInput.difficulty.toLowerCase()}&type=${movieQuestionsInput.type.toLowerCase()}`;

let questionSingleTypeHandler: QuestionSingleTypeHandler = null;

describe('Unity: DataSources/OpenTriviaAPI/handlers/question-single-type/QuestionSingleTypeHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    questionSingleTypeHandler = new QuestionSingleTypeHandler(mockRestDataSourceGet);
  });

  it('should return the questions correctly when request for tv-show questions and the "response code" is other than "no response"', async () => {
    const questions = [question];

    mockRestDataSourceGet.mockReturnValue({ response_code: 0, results: questions });

    const result = await questionSingleTypeHandler.handle(tvQuestionsInput);

    expect(Array.isArray(result)).toBe(true);

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      CONSTANTS.ENDPOINT,
      tvDefaultQueryString,
    );

    expect(
      result.every((resultItem, index) => {
        return (
          resultItem.correctAnswer === questions[index].correct_answer &&
          resultItem.difficulty === questions[index].difficulty &&
          resultItem.category === questions[index].category &&
          resultItem.question === questions[index].question &&
          resultItem.type === questions[index].type
        );
      }),
    ).toBe(true);

    expect(
      result.every((resultItem, index) => {
        const questionAlternatives = [
          questions[index].correct_answer,
          ...questions[index].incorrect_answers,
        ];

        return questionAlternatives[index].includes(resultItem.options[index]);
      }),
    );
  });

  it('should return the questions correctly when request for movie questions and the "response code" is other than "no response"', async () => {
    const questions = [question];

    mockRestDataSourceGet.mockReturnValue({ response_code: 0, results: questions });

    const result = await questionSingleTypeHandler.handle(movieQuestionsInput);

    expect(Array.isArray(result)).toBe(true);

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      CONSTANTS.ENDPOINT,
      movieDefaultQueryString,
    );

    expect(
      result.every((resultItem, index) => {
        return (
          resultItem.correctAnswer === questions[index].correct_answer &&
          resultItem.difficulty === questions[index].difficulty &&
          resultItem.category === questions[index].category &&
          resultItem.question === questions[index].question &&
          resultItem.type === questions[index].type
        );
      }),
    ).toBe(true);

    expect(
      result.every((resultItem, index) => {
        const questionAlternatives = [
          questions[index].correct_answer,
          ...questions[index].incorrect_answers,
        ];

        return questionAlternatives[index].includes(resultItem.options[index]);
      }),
    );
  });

  it('should return an "empty array" when request for tv-show questions and the "response code" is "no response"', async () => {
    mockRestDataSourceGet.mockReturnValue({
      response_code: CONSTANTS.NO_RESPONSE_CODE,
    });

    const result = await questionSingleTypeHandler.handle(tvQuestionsInput);

    expect(Array.isArray(result)).toBe(true);

    expect(result.length).toBe(0);

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      CONSTANTS.ENDPOINT,
      tvDefaultQueryString,
    );
  });

  it('should return an "empty array" when request for movie questions and the "response code" is "no response"', async () => {
    mockRestDataSourceGet.mockReturnValue({
      response_code: CONSTANTS.NO_RESPONSE_CODE,
    });

    const result = await questionSingleTypeHandler.handle(movieQuestionsInput);

    expect(Array.isArray(result)).toBe(true);

    expect(result.length).toBe(0);

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      CONSTANTS.ENDPOINT,
      movieDefaultQueryString,
    );
  });
});
