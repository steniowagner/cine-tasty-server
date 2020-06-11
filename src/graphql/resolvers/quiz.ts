import { QueryResolvers, Question, QueryQuizArgs } from '@lib/types';
import { Context } from '@types';

import { parseEncodedChars } from '../datasources/open-trivia-api/helpers';

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

    options: ({ options }: Question): string[] =>
      options.map(option => parseEncodedChars(option)),
  },
};

export default resolvers;
