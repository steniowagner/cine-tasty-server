export default `#graphql
  type SearchTVShowItem {
    "Indicates if the Searched TV-Show has the 'adult' classification"
    adult: Boolean
    "Backdrop image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    backdropPath: String
    "Searched TV-Show genres"
    genres(input: SearchInput!): [String!]!
    "Searched TV-Show id"
    id: Int!
    "Searched TV-Show origin countries"
    originCountry: [String!]!
    "Searched TV-Show original language"
    originalLanguage: String
    "Searched TV-Show original name"
    originalName: String
    "Searched TV-Show original overview"
    overview: String
    "Searched TV-Show original popularity"
    popularity: Float
    "Poster image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    posterPath: String
    "Searched TV-Show fisrt-air date (MM-DD-YYYY)"
    firstAirDate: String
    "Searched TV-Show name"
    name: String
    "Number indicating the average of votes for the Searched TV-Show"
    voteAverage: Float
    "Number indicating how many votes the Searched TV-Show has"
    voteCount: Int
  }

  "Describes the results of a Search-Movie"
  type SearchTVShowsResult {
    "How many results will be returned"
    totalResults: Int!
    "How many pages exists for the search"
    totalPages: Int!
    "Items returned by the search"
    items: [SearchTVShowItem!]!
    "Indicates if there is more items to be returned"
    hasMore: Boolean!
  }
`;
