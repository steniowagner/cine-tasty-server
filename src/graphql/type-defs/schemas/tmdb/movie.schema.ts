export default `#graphql
  type MovieProductionCompany {
    id: Int!
    logoPath: String
    name: String
    originCountry: String
  }

  type MovieBelongsToCollection {
    id: Int!
    name: String
    posterPath: String
    backdropPath: String
  }

  type Movie {
    adult: Boolean
    backdropPath: String
    belongsToCollection: MovieBelongsToCollection
    budget: Float
    genres: [String!]!
    homepage: String
    id: Int!
    imdbId: String
    originalLanguage: String
    originalTitle: String
    overview: String
    popularity: Float
    posterPath: String
    productionCompanies: [MovieProductionCompany!]!
    productionCountries: [String!]!
    releaseDate: String
    revenue: Float
    runtime: Int
    spokenLanguages: [String!]!
    status: String
    tagline: String
    title: String
    video: Boolean
    voteAverage: Float
    voteCount: Int
  }
`;
