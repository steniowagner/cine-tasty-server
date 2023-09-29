import { resolvers as newsResolvers } from "./news.resolvers";
import { resolvers as quizResolvers } from "./quiz.resolvers";
import { resolvers as famousResolvers } from "./famous.resolvers";
import { resolvers as castResolvers } from "./cast.resolvers";
import { resolvers as searchResolvers } from "./search.resolvers";
import { resolvers as ISO6391LanguageResolvers } from "./ISO6391Language.resolvers";

export default [
  ISO6391LanguageResolvers,
  newsResolvers,
  quizResolvers,
  famousResolvers,
  castResolvers,
  searchResolvers,
];
