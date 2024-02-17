export default `#graphql
  type TrendingTVShow {
    backdropPath: String
    firstAirDate: String
    genres(language: ISO6391Language): [String!]!
    id: Int
    name: String
    originCountry: [String!]!
    originalLanguage: String
    originalName: String
    overview: String
    popularity: Float
    posterPath: String
    voteAverage: Float
    voteCount: Int
  }

  "Describes the Trending-TV-Shows charts"
  type TrendingTVShows {
    "TV-Shows airing today"
    airingToday(language: ISO6391Language): [TrendingTVShow!]!
    "TV-Shows on the air"
    onTheAir(language: ISO6391Language): [TrendingTVShow!]!
    "Popular TV-Shows"
    popular(language: ISO6391Language): [TrendingTVShow!]!
    "Top rated TV-Shows"
    topRated(language: ISO6391Language): [TrendingTVShow!]!
  }
`;
