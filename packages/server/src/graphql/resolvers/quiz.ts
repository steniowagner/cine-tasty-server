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
};

export default resolvers;
