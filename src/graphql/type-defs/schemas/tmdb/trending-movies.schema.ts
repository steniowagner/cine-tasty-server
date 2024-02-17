export default `#graphql
  "Describes a Trending-Movie"
  type TrendingMovie {
    "Indicates if the Trending Movie has the 'adult' classification"
    adult: Boolean
    "Backdrop image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    backdropPath: String
    "Trending Movie genres"
    genres(language: ISO6391Language): [String!]!
    "Trending Movie id"
    id: Int
    "Trending Movie original language"
    originalLanguage: String
    "Trending Movie original title"
    originalTitle: String
    "Trending Movie overview"
    overview: String
    "Trending Movie popularity"
    popularity: Float
    "Poster image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    posterPath: String
    "Trending Movie first-air-date (MM-DD-YYYY)"
    releaseDate: String
    "Trending Movie title"
    title: String
    "Indicates if the Movie has some video"
    video: Boolean
    "Number indicating the average of votes for the Trending Movie"
    voteAverage: Float
    "Number indicating how many votes the Trending Movie has"
    voteCount: Int
  }

  "Describes the Trending-Movies charts"
  type TrendingMovies {
    "Now playing Movies"
    nowPlaying(language: ISO6391Language): [TrendingMovie!]!
    "Popular Movies"
    popular(language: ISO6391Language): [TrendingMovie!]!
    "Top rated Movies"
    topRated(language: ISO6391Language): [TrendingMovie!]!
    "Upcoming Movies"
    upcoming(language: ISO6391Language): [TrendingMovie!]!
  }
`;
