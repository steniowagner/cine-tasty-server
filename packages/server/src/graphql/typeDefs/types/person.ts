import { gql } from 'apollo-server';

export default gql`
  type Person {
    birthday: String
    known_for_department: String
    deathday: String
    id: Int
    name: String
    also_known_as: [String!]!
    place_of_birth: String
    profile_path: String
    adult: Boolean
    imdb_id: String
    homepage: String
    biography: String
    popularity: Float
    images: [String!]!
    gender: Int
    cast: [Cast!]!
  }
`;
