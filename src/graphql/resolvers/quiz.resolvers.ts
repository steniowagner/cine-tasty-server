import { QueryQuizArgs } from "@generated-types";
import { Context } from "@types";

export const resolvers = {
  Query: {
    quiz: (_parent: undefined, args: QueryQuizArgs, context: Context) =>
      context.openTriviaAPI.getQuiz(args),
  },
};
