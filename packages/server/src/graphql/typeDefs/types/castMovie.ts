import { gql } from 'apollo-server';

export default gql`
  type CastMovie implements Cast {
    original_title: String
    video: Boolean
    title: String
    adult: Boolean
    release_date: String
    character: String
    backdrop_path: String
    genre_ids(language: ISO6391Language): [String!]!
    overview: String
    vote_average: Float
    media_type: String
    poster_path: String
    popularity: Float
    original_language: String
    vote_count: Float
    credit_id: String
    id: Int
  }
`;
