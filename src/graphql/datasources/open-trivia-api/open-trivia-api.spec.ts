/* eslint-disable @typescript-eslint/no-explicit-any */
import { RESTDataSource } from "@apollo/datasource-rest";

import * as GeneratedTypes from "@generated-types";

import { execDatasourceTestOperation } from "../../../../__test__";
import { CONSTANTS } from "./utils";

type ExecDatasourceTestOperationResponse = {
  quiz: GeneratedTypes.QuizQuestion[];
};

const makeResults = (length: number) =>
  Array(length)
    .fill({})
    .map((_, index) => ({
      category: `category-${index}`,
      type: `type-${index}`,
      difficulty: `difficulty-${index}`,
      question: `question-${index}`,
      correct_answer: `correct_answer-${index}`,
      incorrect_answers: ["incorrect_answer-1", "incorrect_answer-2"],
    }));

const QUERY_QUIZ = `#graphql
  query QuizQuestions($input: QuizInput!) {
    quiz(input: $input) {
      options,
      difficulty,
      category,
      question,
      type,
    }
  }
`;

describe("DataSources/OpenTriviaAPI/Integration", () => {
  describe("When the request finishes successfuly", () => {
    describe('When "category" is "MIXED"', () => {
      it(`should return the data correctly when the "response_code" is "${CONSTANTS.SUCCESS_RESPONSE_CODE}"`, async () => {
        jest
          .spyOn(RESTDataSource.prototype as any, "get")
          .mockImplementationOnce(async () =>
            Promise.resolve({
              response_code: CONSTANTS.SUCCESS_RESPONSE_CODE,
              results: makeResults(1),
            }),
          )
          .mockImplementationOnce(async () =>
            Promise.resolve({
              response_code: CONSTANTS.SUCCESS_RESPONSE_CODE,
              results: makeResults(2),
            }),
          );
        const numberOfQuestions = 3;
        const response =
          await execDatasourceTestOperation<ExecDatasourceTestOperationResponse>({
            query: QUERY_QUIZ,
            variables: {
              input: {
                difficulty: GeneratedTypes.QuizQuestionDifficulty.Hard,
                type: GeneratedTypes.QuizQuestionType.Boolean,
                category: GeneratedTypes.QuizQuestionCategory.Mixed,
                numberOfQuestions,
              },
            },
          });
        const quiz = response.body.singleResult.data.quiz;
        expect(quiz.length).toEqual(numberOfQuestions);
        for (let i = 0; i < quiz.length; i++) {
          expect(quiz[i].options).toBeDefined();
          expect(Array.isArray(quiz[i].options)).toEqual(true);
          expect(
            quiz[i].options.every((option: string) => typeof option === "string"),
          ).toEqual(true);
          expect(quiz[i].difficulty).toBeDefined();
          expect(typeof quiz[i].difficulty === "string").toEqual(true);
          expect(quiz[i].category).toBeDefined();
          expect(typeof quiz[i].category === "string").toEqual(true);
          expect(quiz[i].question).toBeDefined();
          expect(typeof quiz[i].question === "string").toEqual(true);
          expect(quiz[i].type).toBeDefined();
          expect(typeof quiz[i].type === "string").toEqual(true);
        }
      });
    });

    describe('When "category" different of "MIXED"', () => {
      it(`should return the data correctly when the "response_code" is "${CONSTANTS.SUCCESS_RESPONSE_CODE}"`, async () => {
        const numberOfQuestions = 3;
        jest
          .spyOn(RESTDataSource.prototype as any, "get")
          .mockImplementationOnce(async () =>
            Promise.resolve({
              response_code: CONSTANTS.SUCCESS_RESPONSE_CODE,
              results: makeResults(numberOfQuestions),
            }),
          );
        const response =
          await execDatasourceTestOperation<ExecDatasourceTestOperationResponse>({
            query: QUERY_QUIZ,
            variables: {
              input: {
                difficulty: GeneratedTypes.QuizQuestionDifficulty.Medium,
                type: GeneratedTypes.QuizQuestionType.Boolean,
                category: GeneratedTypes.QuizQuestionCategory.Tv,
                numberOfQuestions,
              },
            },
          });
        const quiz = response.body.singleResult.data.quiz;
        expect(quiz.length).toEqual(numberOfQuestions);
        for (let i = 0; i < quiz.length; i++) {
          expect(quiz[i].options).toBeDefined();
          expect(Array.isArray(quiz[i].options)).toEqual(true);
          expect(
            quiz[i].options.every((option: string) => typeof option === "string"),
          ).toEqual(true);
          expect(quiz[i].difficulty).toBeDefined();
          expect(typeof quiz[i].difficulty === "string").toEqual(true);
          expect(quiz[i].category).toBeDefined();
          expect(typeof quiz[i].category === "string").toEqual(true);
          expect(quiz[i].question).toBeDefined();
          expect(typeof quiz[i].question === "string").toEqual(true);
          expect(quiz[i].type).toBeDefined();
          expect(typeof quiz[i].type === "string").toEqual(true);
        }
      });
    });
  });

  describe("When some error happens", () => {
    it('should return an empty array when the "response_code" is different of "0"', async () => {
      jest
        .spyOn(RESTDataSource.prototype as any, "get")
        .mockImplementationOnce(async () =>
          Promise.resolve({
            response_code: 1,
            results: makeResults(1),
          }),
        );
      const numberOfQuestions = 3;
      const response =
        await execDatasourceTestOperation<ExecDatasourceTestOperationResponse>({
          query: QUERY_QUIZ,
          variables: {
            input: {
              difficulty: GeneratedTypes.QuizQuestionDifficulty.Hard,
              type: GeneratedTypes.QuizQuestionType.Boolean,
              category: GeneratedTypes.QuizQuestionCategory.Tv,
              numberOfQuestions,
            },
          },
        });
      const quiz = response.body.singleResult.data.quiz;
      expect(quiz.length).toEqual(0);
    });

    it("should return an empty array when some error happens during the request", async () => {
      jest
        .spyOn(RESTDataSource.prototype as any, "get")
        .mockImplementationOnce(async () => Promise.reject({}));
      const numberOfQuestions = 3;
      const response =
        await execDatasourceTestOperation<ExecDatasourceTestOperationResponse>({
          query: QUERY_QUIZ,
          variables: {
            input: {
              difficulty: GeneratedTypes.QuizQuestionDifficulty.Easy,
              type: GeneratedTypes.QuizQuestionType.Multiple,
              category: GeneratedTypes.QuizQuestionCategory.Movie,
              numberOfQuestions,
            },
          },
        });
      expect(response.body.singleResult.data.quiz.length).toEqual(0);
    });
  });
});
