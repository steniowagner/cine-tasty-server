export default `#graphql
  "Describes the TV-Shows in which the searched Actor/Actress were in the cast"
  type SearchFamousKnownForTVShow {
    "Indicates if the Searched TV-Show has the 'adult' classification"
    adult: Boolean
    "Backdrop image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    backdropPath: String
    "Searched TV-Show id"
    id: Int!
    "Searched TV-Show name"
    name: String
    "Searched TV-Show original language"
    originalLanguage: String
    "Searched TV-Show original name"
    originalName: String
    "Searched TV-Show overview"
    overview: String
    "Poster image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    posterPath: String
    "For TV-Shows, this value will always be 'tv-show'"
    mediaType: String
    "Searched TV-Show genres"
    genres(input: SearchInput!): [String!]!
    "Number indicating the popularity of the Searched TV-Show"
    popularity: Float
    "Searched TV-Show first-air-date (MM-DD-YYYY)"
    firstAirDate: String
    "Number indicating the average of votes for the Searched TV-Show"
    voteAverage: Float
    "Number indicating how many votes the Searched TV-Show has"
    voteCount: Int
    "Searched TV-Show origin country"
    originCountry: [String!]!
  }

  "Describes the Movies in which the searched Actor/Actress were in the cast"
  type SearchFamousKnownForMovie {
    "Indicates if the Searched Movie has the 'adult' classification"
    adult: Boolean
    "Backdrop image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    backdropPath: String
    "Searched Movie id"
    id: Int!
    "Searched Movie title"
    title: String
    "Searched Movie original language"
    originalLanguage: String
    "Searched Movie original title"
    originalTitle: String
    "Searched Movie overview"
    overview: String
    "Poster image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    posterPath: String
    "For Movies, this value will always be 'movie'"
    mediaType: String
    "Searched Movie genres"
    genres(input: SearchInput!): [String!]!
    "Number indicating the popularity of the Searched Movie"
    popularity: Float
    "Searched Movie first-air-date (MM-DD-YYYY)"
    releaseDate: String
    "Indicates if the Movie has some video"
    video: Boolean
    "Number indicating the average of votes for the Searched Movie"
    voteAverage: Float
    "Number indicating how many votes the Searched Movie has"
    voteCount: Int
  }

  "The Actor/Actress can be know for Movies or TV-Shows"
  union SearchFamousKnownFor = SearchFamousKnownForTVShow | SearchFamousKnownForMovie

  "Describes the item returned by the search-for-famous"
  type SearchFamousItem {
    "Indicates if the Actor/Actress is adult"
    adult: Boolean
    "Actor/Actress id"
    id: Int
    "Actor/Actress gender"
    gender: Int
    "Department in which the Actor/Actress works (filming, acting...)"
    knownForDepartment: String
    "Movies and TV-Shows in which the Actor/Actress were in the cast"
    knownFor: [SearchFamousKnownFor!]!
    "Actor/Actress name"
    name: String
    "Actor/Actress original name"
    originalName: String
    "Number indicating the popularity of the Actor/Actress"
    popularity: Float
    "Profile image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    profilePath: String
  }

  "Describes the results of a Search-for-Famous"
  type SearchFamousResult {
    "How many results will be returned"
    totalResults: Int!
    "How many pages exists for the search"
    totalPages: Int!
    "Items returned by the search"
    items: [SearchFamousItem!]!
    "Indicates if there is more items to be returned"
    hasMore: Boolean!
  }
`;
