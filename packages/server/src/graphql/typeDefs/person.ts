import { gql } from 'apollo-server';

export default gql`
  type KnownFor {
    originalLanguage: String!
    backdropImage: String!
    originalTitle: String!
    releaseDate: String!
    posterImage: String!
    voteAverage: Float!
    mediaType: String!
    isAdult: Boolean!
    overview: String!
    genreIds: [Int!]!
    voteCount: Int!
    title: String!
    id: ID!
  }

  type Person {
    knownForDepartment: String!
    knownFor: [KnownFor!]!
    profileImage: String!
    popularity: Float!
    adult: Boolean!
    name: String!
    gender: Int!
    id: ID!
  }

  type PeopleQueryResult {
    items: [Person!]!
    hasMore: Boolean!
  }

  extend type Query {
    people(page: Int!, language: ISO6391Language): PeopleQueryResult!
  }
`;
