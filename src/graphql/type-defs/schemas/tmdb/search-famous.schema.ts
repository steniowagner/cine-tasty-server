export default `#graphql
  type SearchFamousItemKnownFor {
    adult: Boolean
    backdropPath: String
    genreIds: [Int!]!
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
    mediaType: String
  }

  type SearchFamousItem {
    adult: Boolean
    id: Int
    gender: Int
    knownForDepartment: String
    knownFor: [SearchFamousItemKnownFor!]!
    name: String
    originalName: String
    popularity: Float
    profilePath: String
}

  type SearchFamousResult {
    totalResults: Int!
    totalPages: Int!
    items: [SearchFamousItem!]!
    hasMore: Boolean!
  }
`;
