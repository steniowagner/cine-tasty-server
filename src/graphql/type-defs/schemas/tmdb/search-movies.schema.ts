export default `#graphql
  "Describes the Searched Movie"
  type SearchMovieItem {
    "Indicates if the Searched Movie has the 'adult' classification"
    adult: Boolean
    "Backdrop image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    backdropPath: String
    "Searched Movie genres"
    genres(input: SearchInput!): [String!]!
    "Searched Movie id"
    id: Int!
    "Searched Movie original language"
    originalLanguage: String
    "Searched Movie original title"
    originalTitle: String
    "Searched Movie original overview"
    overview: String
    "Number indicating the popularity of the Movie"
    popularity: Float
    "Poster image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    posterPath: String
    "Searched Movie release date (MM-DD-YYYY)"
    releaseDate: String
    "Searched Movie title"
    title: String
    "Indicates if the Searched Movie has some video"
    video: Boolean
    "Number indicating the average of votes for the Searched Movie"
    voteAverage: Float
    "Number indicating how many votes the Searched Movie has"
    voteCount: Int
  }

  "Describes the results of a Search-Movie"
  type SearchMoviesResult {
    "How many results will be returned"
    totalResults: Int!
    "How many pages exists for the search"
    totalPages: Int!
    "Items returned by the search"
    items: [SearchMovieItem!]!
    "Indicates if there is more items to be returned"
    hasMore: Boolean!
  }
`;
