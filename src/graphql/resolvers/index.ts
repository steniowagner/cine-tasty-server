import { resolvers as newsResolvers } from "./news.resolvers";
import { resolvers as quizResolvers } from "./quiz.resolvers";
import { resolvers as famousResolvers } from "./famous.resolvers";
import { resolvers as castResolvers } from "./cast.resolvers";
import { resolvers as searchResolvers } from "./search.resolvers";
import { resolvers as ISO6391LanguageResolvers } from "./ISO6391Language.resolvers";
import { resolvers as searchFamousResolvers } from "./search-famous.resolvers";
import { resolvers as trendingFamousResolvers } from "./trending-famous.resolvers";
import { resolvers as tvShowResolvers } from "./tv-show.resolvers";
import { resolvers as tvShowSeasonResolvers } from "./tv-show-season.resolvers";
import { resolvers as trendingTVShowsResolvers } from "./trending-tv-shows.resolvers";
import { resolvers as searchTVShowsResolvers } from "./search-tv-shows.resolvers";

export default [
  searchTVShowsResolvers,
  trendingTVShowsResolvers,
  tvShowSeasonResolvers,
  tvShowResolvers,
  trendingFamousResolvers,
  ISO6391LanguageResolvers,
  searchFamousResolvers,
  newsResolvers,
  quizResolvers,
  famousResolvers,
  castResolvers,
  searchResolvers,
];
