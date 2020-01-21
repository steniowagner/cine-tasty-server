import { gql } from 'apollo-server';

export default gql`
  type BasePerson {
    profile_path: String
    adult: Boolean
    id: Int
    popularity: Float
    known_for: [PersonKnowFor!]!
    name: String
  }
`;
