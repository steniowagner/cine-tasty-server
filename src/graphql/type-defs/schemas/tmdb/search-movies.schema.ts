export default `#graphql
  type SearchMovieItem {
    adult: Boolean
    backdropPath: String
    genres(input: SearchInput!): [String!]!
    id: Int!
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

  type SearchMoviesResult {
    totalResults: Int!
    totalPages: Int!
    items: [SearchMovieItem!]!
    hasMore: Boolean!
  }
`;
