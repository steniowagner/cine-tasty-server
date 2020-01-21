import { gql } from 'apollo-server';

export default gql`
  type CastTVShow implements Cast {
    episode_count: Int
    origin_country: [String!]!
    original_name: String
    name: String
    first_air_date: String
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
