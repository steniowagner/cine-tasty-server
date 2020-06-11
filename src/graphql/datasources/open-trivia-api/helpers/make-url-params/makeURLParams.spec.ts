import {
  QuestionDifficulty,
  QuestionCategory,
  QuestionType,
  QuizInput,
} from '../../../../../lib/types';

const defaultAmountQuestions = 1;
const defaultCategoryCode = 1;

jest.mock('./get-amount-questions/getAmountQuestions', () => (): number =>
  defaultAmountQuestions,
);

jest.mock('./get-category-code/getCategoryCode', () => (): number => defaultCategoryCode);

import { makeURLParams } from './makeURLParams';

const defaultInput: QuizInput = {
  difficulty: QuestionDifficulty.Easy,
  category: QuestionCategory.Movie,
  type: QuestionType.Boolean,
  numberOfQuestions: 2,
};

describe('Testing Helper: OpenTriviaAPI/makeURLParams', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should return the queryParams with just "amount" and "cateogry" set when the "difficulty" and "type" is not provided', () => {
    const params = makeURLParams({
      ...defaultInput,
      difficulty: undefined,
      type: undefined,
    });

    expect(params).toEqual({
      amount: defaultAmountQuestions,
      category: defaultCategoryCode,
    });
  });

  it('should return the params with "difficulty" set when the difficulty is other than "Mixed"', () => {
    const params = makeURLParams({
      ...defaultInput,
      type: undefined,
    });

    expect(params).toEqual({
      difficulty: defaultInput.difficulty.toLowerCase(),
      amount: defaultAmountQuestions,
      category: defaultCategoryCode,
    });
  });

  it('should return the params with "type" set when the type is other than "Mixed"', () => {
    const params = makeURLParams({
      ...defaultInput,
      difficulty: undefined,
    });

    expect(params).toEqual({
      type: defaultInput.type.toLowerCase(),
      amount: defaultAmountQuestions,
      category: defaultCategoryCode,
    });
  });

  it('should return the params with "type" and "difficulty" set when the type and the difficulty is other than "Mixed"', () => {
    const params = makeURLParams(defaultInput);

    expect(params).toEqual({
      difficulty: defaultInput.difficulty.toLowerCase(),
      type: defaultInput.type.toLowerCase(),
      amount: defaultAmountQuestions,
      category: defaultCategoryCode,
    });
  });
});
