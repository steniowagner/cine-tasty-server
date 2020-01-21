import { gql } from 'apollo-server';

export default gql`
  union PersonKnowFor = BaseMovie | BaseTVShow

  type BasePerson {
    profile_path: String
    adult: Boolean
    id: Int
    popularity: Float
    known_for: [PersonKnowFor!]!
    name: String
  }
`;
