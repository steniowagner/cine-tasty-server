export default `#graphql
  extend type Query {
    "Returns a set of questions related to TV-Shows, Movies and Cinema in general"
    quiz(input: QuizInput!): [QuizQuestion!]!
    "Returns paginated articles for the specified language"
    news(page: Int!, language: NewsLanguage!): NewsResult!
    famous(id: Int!, language: ISO6391Language): Famous!
    searchFamous(input: SearchInput!): SearchFamousResult!
    searchTVShows(input: SearchInput!): SearchTVShowsResult!
    searchMovies(input: SearchInput!): SearchMoviesResult!
    trendingFamous(page: Int!, language: ISO6391Language): TrendingFamousResult!
    tvShow(id: Int!, language: ISO6391Language): TVShow!
    tvShowSeason(input: TVShowSeasonInput!): TVShowSeason!
    trendingTVShows(language: ISO6391Language): TrendingTVShows!
    movie(id: Int!, language: ISO6391Language): Movie!
    trendingMovies(language: ISO6391Language): TrendingMovies!
    mediaGenres(mediaType: MediaType!, language: ISO6391Language): [MediaGenre!]!
  }
`;
