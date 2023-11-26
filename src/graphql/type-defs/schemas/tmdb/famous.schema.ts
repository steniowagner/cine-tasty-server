export default `#graphql
  type FamousCast {
    moviesCast: [FamousCastMovie!]!
    tvShowsCast: [FamousCastTVShow!]!
  }

  type Famous {
    biography: String
    birthday: String
    deathday: String
    id: Int!
    images: [String!]!
    knownForDepartment: String
    name: String
    placeOfBirth: String
    popularity: Float
    profilePath: String
    cast(language: ISO6391Language): FamousCast!
  }
`;
