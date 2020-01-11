import { gql } from 'apollo-server';

export default gql`
  type KnownFor {
    originalLanguage: String
    backdropImage: String
    originalTitle: String
    releaseDate: String
    posterImage: String
    voteAverage: Float
    mediaType: String
    isAdult: Boolean
    overview: String
    genres: [String!]!
    voteCount: Int
    title: String
    id: ID
  }

  type PeopleQueryItem {
    knownForDepartment: String
    knownFor: [KnownFor!]!
    profileImage: String
    popularity: Float
    adult: Boolean
    name: String
    gender: Int
    id: ID
  }

  type Cast {
    originalLanguage: String
    originalTitle: String
    backdropImage: String
    releaseDate: String
    genres: [String!]!
    voteAvarage: Float
    popularity: Float
    character: String
    mediaType: String
    overview: String
    poster: String
    voteCount: Int
    video: Boolean
    adult: Boolean
    title: String
    creditId: ID
    id: Int
  }

  type Person {
    knownForDepartment: String
    imagesGallery: [String!]!
    alsoKnownAs: [String!]!
    placeOfBirth: String
    profileImage: String
    biography: String
    popularity: Float
    homepage: String
    birthday: String
    deathday: String
    cast: [Cast!]!
    imbdId: String
    adult: Boolean
    name: String
    gender: Int
    id: Int
  }

  type PeopleQueryResult {
    items: [PeopleQueryItem!]!
    hasMore: Boolean!
  }

  extend type Query {
    people(page: Int!, language: ISO6391Language): PeopleQueryResult!
    person(id: Int!, language: ISO6391Language): Person
  }
`;
