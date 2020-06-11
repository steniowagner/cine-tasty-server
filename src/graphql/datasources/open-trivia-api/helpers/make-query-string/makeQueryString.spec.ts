import { QuestionDifficulty, QuestionType } from '../../../../../lib/types';
import { makeQueryString } from './makeQueryString';
import CONSTANTS from '../../utils/constants';

describe('Testing Helper: OpenTriviaAPI/parseQueryParams', () => {
  it('should return the query-string correctly when all the query-params fields are provided', () => {
    const queryParams = {
      category: CONSTANTS.MOVIE_CATEGORY_CODE,
      difficulty: QuestionDifficulty.Easy,
      type: QuestionType.Boolean,
      amount: 10,
    };

    const queryString = makeQueryString(queryParams);

    expect(queryString).toEqual(
      `category=${
        queryParams.category
      }&difficulty=${queryParams.difficulty.toLowerCase()}&type=${queryParams.type.toLowerCase()}&amount=${
        queryParams.amount
      }`,
    );
  });

  it('should return the query-string correctly when the "difficulty" is missed', () => {
    const queryParams = {
      category: CONSTANTS.MOVIE_CATEGORY_CODE,
      type: QuestionType.Boolean,
      amount: 10,
    };

    const queryString = makeQueryString(queryParams);

    expect(queryString).toEqual(
      `category=${queryParams.category}&type=${queryParams.type.toLowerCase()}&amount=${
        queryParams.amount
      }`,
    );
  });

  it('should return the query-string correctly when the "type" is missed', () => {
    const queryParams = {
      category: CONSTANTS.MOVIE_CATEGORY_CODE,
      difficulty: QuestionDifficulty.Easy,
      amount: 10,
    };

    const queryString = makeQueryString(queryParams);

    expect(queryString).toEqual(
      `category=${
        queryParams.category
      }&difficulty=${queryParams.difficulty.toLowerCase()}&amount=${queryParams.amount}`,
    );
  });

  it('should return the query-string correctly when "difficulty" and "type" fields are missing', () => {
    const queryParams = {
      category: CONSTANTS.MOVIE_CATEGORY_CODE,
      amount: 10,
    };

    const queryString = makeQueryString(queryParams);

    expect(queryString).toEqual(
      `category=${queryParams.category}&amount=${queryParams.amount}`,
    );
  });
});
