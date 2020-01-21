import { gql } from 'apollo-server';

export default gql`
  interface Cast {
    character: String
    backdrop_path: String
    overview: String
    vote_average: Float
    media_type: String
    poster_path: String
    popularity: Float
    original_language: String
    genre_ids(language: ISO6391Language): [String!]!
    vote_count: Float
    credit_id: String
    id: Int
  }
`;
