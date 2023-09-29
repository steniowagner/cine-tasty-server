export default `#graphql
  type KnowForTVShow {
    adult: Boolean
    backdropPath: String
    id: Int!
    name: String
    originalLanguage: String
    originalName: String
    overview: String
    posterPath: String
    mediaType: String
    genres(input: SearchInput!): [String!]!
    popularity: Float
    firstAirDate: String
    voteAverage: Float
    voteCount: Int
    originCountry: [String!]!
  }

  type KnowForMovie {
    adult: Boolean
    backdropPath: String
    id: Int!
    title: String
    originalLanguage: String
    originalTitle: String
    overview: String
    posterPath: String
    mediaType: String
    genres(input: SearchInput!): [String!]!
    popularity: Float
    releaseDate: String
    video: Boolean
    voteAverage: Float
    voteCount: Int
  }

  union KnownFor = KnowForTVShow | KnowForMovie

  type SearchFamousItem {
    adult: Boolean
    id: Int
    gender: Int
    knownForDepartment: String
    knownFor: [KnownFor!]!
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
