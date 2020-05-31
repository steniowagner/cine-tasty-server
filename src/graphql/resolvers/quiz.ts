import parseEncodedChars from '../datasources/open-trivia-api/helpers/parse-encoded-chars/parseEncodedChars';
import { QueryResolvers, Question, QueryQuizArgs } from '../../lib/types';
import { Context } from '../../types';

const resolvers: QueryResolvers = {
  Query: {
    quiz: (
      _: {},
      { input }: QueryQuizArgs,
      { dataSources }: Context,
    ): Promise<Question[]> => dataSources.openTrivia.getQuestions(input),
  },

  Question: {
    question: ({ question }: Question): string => parseEncodedChars(question),

    incorrect_answers: ({ incorrect_answers }: Question): string[] =>
      incorrect_answers.map(incorrectAnswer => parseEncodedChars(incorrectAnswer)),
  },
};

export default resolvers;
