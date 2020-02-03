import { gql } from 'apollo-server';

export default gql`
  type BaseTVShow {
    origin_country: [String!]!
    original_name: String
    name: String
    first_air_date: String
    backdrop_path: String
    genre_ids(language: ISO6391Language): [String!]!
    overview: String
    vote_average: Float
    media_type: String
    poster_path: String
    popularity: Float
    original_language: String
    vote_count: Float
    id: Int
  }
`;
