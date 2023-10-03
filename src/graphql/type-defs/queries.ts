export default `#graphql
  extend type Query {
    quiz(input: QuizInput!): [QuizQuestion!]!
    news(page: Int!, language: NewsLanguage!): NewsResult!
    famous(id: Int!, language: ISO6391Language): Famous!
    searchFamous(input: SearchInput!): SearchFamousResult!
    trendingFamous(page: Int!, language: ISO6391Language): TrendingFamousResult!
    tvShow(id: Int!, language: ISO6391Language): TVShow!
    tvShowSeason(input: TVShowSeasonInput!): TVShowSeason!
    trendingTVShows(language: ISO6391Language): TrendingTVShows!
  }
`;
