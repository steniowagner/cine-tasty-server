export default `#graphql
  extend type Query {
    quiz(input: QuizInput!): [QuizQuestion!]!
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
    mediaGenres(mediaTye: MediaType!, language: ISO6391Language): [MediaGenre!]!
  }
`;
