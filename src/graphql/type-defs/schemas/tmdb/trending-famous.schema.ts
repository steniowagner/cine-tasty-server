export default `#graphql
  "Describes the Trending-Famous-Known-For-TV-Show in which the trending Actor/Actress were in the known for"
  type TrendingFamousKnownForTVShow {
    "Backdrop image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    backdropPath: String
    "Trending-Famous-Known-For-TV-Show first-air-date (MM-DD-YYYY)"
    firstAirDate: String
    "Trending-Famous-Known-For-TV-Show genres"
    genres(language: ISO6391Language): [String!]!
    "Trending-Famous-Known-For-TV-Show id"
    id: Int!
    "For TV-Shows, this value will always be 'tv-show'"
    mediaType: String
    "Trending-Famous-Known-For-TV-Show name"
    name: String
    "Trending-Famous-Known-For-TV-Show origin countries"
    originCountry: [String!]!
    "Trending-Famous-Known-For-TV-Show original language"
    originalLanguage: String
    "Trending-Famous-Known-For-TV-Show original name"
    originalName: String
    "Trending-Famous-Known-For-TV-Show original overview"
    overview: String
    "Poster image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    posterPath: String
    "Number indicating the average of votes for the Trending-Famous-Known-For-TV-Show"
    voteAverage: Float
    "Number indicating how many votes the Trending-Famous-Known-For-TV-Show has"
    voteCount: Int
  }

  "Describes the Trending-Famous-Known-For-Movie in which the trending Actor/Actress were in the known for"
  type TrendingFamousKnownForMovie {
    "Indicates if the Trending-Famous-Known-For-Movie has the 'adult' classification"
    adult: Boolean
    "Backdrop image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    backdropPath: String
    "Trending-Famous-Known-For-Movie genres"
    genres(language: ISO6391Language): [String!]!
    id: Int!
    "For Movies, this value will always be 'movie'"
    mediaType: String
    "Trending-Famous-Known-For-Movie original language"
    originalLanguage: String
    "Trending-Famous-Known-For-Movie title"
    originalTitle: String
    "Trending-Famous-Known-For-Movie overview"
    overview: String
    "Poster image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    posterPath: String
    "Trending-Famous-Known-For-Movie first-air-date (MM-DD-YYYY)"
    releaseDate: String
    "Trending-Famous-Known-For-Movie title"
    title: String
    "Indicates if the Trending-Famous-Known-For-Movie has some video"
    video: Boolean
    "Number indicating the average of votes for the Trending-Famous-Known-For-Movie"
    voteAverage: Float
    "Number indicating how many votes the Trending-Famous-Known-For-Movie has"
    voteCount: Int
  }

  "The Actor/Actress can be know for Movies or TV-Shows"
  union TrendingFamousKnownFor = TrendingFamousKnownForTVShow | TrendingFamousKnownForMovie

  "Describes the item returned by the Trending-Famous"
  type TrendingFamousItem {
    "Indicates if the Actor/Actress is adult"
    adult: Boolean
    "Department in which the Actor/Actress works (filming, acting...)"
    gender: Int
    "Actor/Actress id"
    id: Int
    "Movies and TV-Shows in which the Actor/Actress were in the cast"
    knownFor: [TrendingFamousKnownFor!]!
    "Department in which the Actor/Actress works (filming, acting...)"
    knownForDepartment: String
    "Actor/Actress name"
    name: String
    "Number indicating the popularity of the Actor/Actress"
    popularity: Float
    "Profile image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    profilePath: String
  }

  "Describes the results of a Search-Movie"
  type TrendingFamousResult {
    "How many results will be returned"
    totalResults: Int!
    "How many pages exists for the search"
    totalPages: Int!
    "Items returned by the search"
    items: [TrendingFamousItem!]!
    "Indicates if there is more items to be returned"
    hasMore: Boolean!
  }
`;
