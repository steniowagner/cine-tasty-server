import { resolvers as newsResolvers } from "./news.resolvers";
import { resolvers as quizResolvers } from "./quiz.resolvers";
import { resolvers as famousResolvers } from "./famous.resolvers";
import { resolvers as castResolvers } from "./cast.resolvers";
import { resolvers as searchResolvers } from "./search.resolvers";

export default [
  newsResolvers,
  quizResolvers,
  famousResolvers,
  castResolvers,
  searchResolvers,
];
