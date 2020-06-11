import { parseResult } from './parseResult';

const questionResponseItems = [
  {
    incorrect_answers: ['incorrect_answer'],
    correct_answer: 'correct_answer',
    difficulty: 'difficulty',
    question: 'question',
    category: 'category',
    type: 'type',
  },
];

describe('Testing Helper: OpenTriviaAPI/parseResult', () => {
  it('should parse the items correctly', () => {
    const parsedResults = parseResult(questionResponseItems);

    expect(
      parsedResults.every(
        (parsedResult, index) =>
          parsedResult.correctAnswer === questionResponseItems[index].correct_answer &&
          parsedResult.difficulty === questionResponseItems[index].difficulty &&
          parsedResult.category === questionResponseItems[index].category &&
          parsedResult.question === questionResponseItems[index].question &&
          parsedResult.type === questionResponseItems[index].type,
      ),
    ).toBe(true);

    expect(
      parsedResults.every((parsedResult, index) => {
        const questionResponseItemsAlternatives = [
          questionResponseItems[index].correct_answer,
          ...questionResponseItems[index].incorrect_answers,
        ];

        const isOptionIncluded = parsedResult.options.every(option =>
          questionResponseItemsAlternatives.includes(option),
        );

        return isOptionIncluded;
      }),
    );
  });

  it('should replace the fields written in snake_case with camelCase', () => {
    const parsedResults = parseResult(questionResponseItems);

    expect(
      parsedResults.every(
        parsedResult => !parsedResult.incorrect_answers && !parsedResult.correct_answer,
      ),
    ).toBe(true);
  });
});
