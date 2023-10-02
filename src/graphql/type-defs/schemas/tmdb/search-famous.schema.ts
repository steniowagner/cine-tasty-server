export default `#graphql
  type SearchFamousKnownForTVShow {
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

  type SearchFamousKnownForMovie {
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

  union SearchFamousKnownFor = SearchFamousKnownForTVShow | SearchFamousKnownForMovie

  type SearchFamousItem {
    adult: Boolean
    id: Int
    gender: Int
    knownForDepartment: String
    knownFor: [SearchFamousKnownFor!]!
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
