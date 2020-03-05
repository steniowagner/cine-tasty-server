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

  union PersonKnowFor = BaseMovie | BaseTVShow

  type BasePerson {
    profile_path: String
    adult: Boolean
    id: Int
    popularity: Float
    known_for: [PersonKnowFor!]!
    name: String
  }

  type PeopleQueryResult {
    total_results: Int!
    total_pages: Int!
    items: [BasePerson!]!
    hasMore: Boolean!
  }
`;
