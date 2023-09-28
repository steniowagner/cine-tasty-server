export default `#graphql
  type Famous {
    biography: String
    birthday: String
    deathday: String
    id: Int!
    images: [String!]!
    knownForDepartment: String
    moviesCast(language: ISO6391Language): [CastMovie!]!
    name: String
    placeOfBirth: String
    popularity: Float
    profilePath: String
    tvShowsCast(language: ISO6391Language): [CastTVShow!]!
  }
`;
