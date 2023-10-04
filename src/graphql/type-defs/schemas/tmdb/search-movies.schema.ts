export default `#graphql
  type SearchMovieItem {
    adult: Boolean
    backdropPath: String
    genres(language: ISO6391Language): [String!]!
    id: Int!
    originalLanguage: String
    originalTitle: String
    overview: String
    popularity: Int
    posterPath: String
    releaseDate: String
    title: String
    video: Boolean
    voteAverage: Int
    voteCount: Int
  }

  type SearchMoviesResult {
    totalResults: Int!
    totalPages: Int!
    items: [SearchMovieItem!]!
    hasMore: Boolean!
  }
`;
