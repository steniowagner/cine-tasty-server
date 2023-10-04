export default `#graphql
  type TrendingMovie {
    adult: Boolean
    backdropPath: String
    genres(language: ISO6391Language): [String!]!
    id: Int
    originalLanguage: String
    originalTitle: String
    overview: String
    popularity: Float
    posterPath: String
    releaseDate: String
    title: String
    video: Boolean
    voteAverage: Float
    voteCount: Int
  }

  type TrendingMovies {
    nowPlaying(language: ISO6391Language): [TrendingMovie!]!
    popular(language: ISO6391Language): [TrendingMovie!]!
    topRated(language: ISO6391Language): [TrendingMovie!]!
    upcoming(language: ISO6391Language): [TrendingMovie!]!
  }
`;
