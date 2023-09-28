export default `#graphql
  type Famous {
    biography: String
    birthday: String
    deathday: String
    id: Int!
    images: [String!]!
    knownForDepartment: String
    moviesCast: [CastMovie!]!
    name: String
    placeOfBirth: String
    popularity: Float
    profilePath: String
    tvCast: [CastTVShow!]!
  }
`;
