export default `#graphql
  type FamousCast {
    moviesCast: [CastMovie!]!
    tvShowsCast: [CastTVShow!]!
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
