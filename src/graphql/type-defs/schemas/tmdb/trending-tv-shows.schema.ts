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

  type TrendingTVShows {
    airingToday(language: ISO6391Language): [TrendingTVShow!]!
    onTheAir(language: ISO6391Language): [TrendingTVShow!]!
    popular(language: ISO6391Language): [TrendingTVShow!]!
    topRated(language: ISO6391Language): [TrendingTVShow!]!
  }
`;
