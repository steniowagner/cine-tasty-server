import { gql } from 'apollo-server';

export default gql`
  extend type Query {
    search(input: SearchInput!, genresLanguage: ISO6391Language): SearchQueryResult!
    trendingMovies: TrendingMovies!
    trendingTvShows: TrendingTVShows!
    tvShow(id: ID!, language: ISO6391Language): TVShow
    tvShowSeason(id: ID!, season: Int!, language: ISO6391Language): TVShowSeason
    movie(id: ID!, language: ISO6391Language): Movie
    articles(page: Int!, language: ArticleLanguage!): Articles!
    people(page: Int!, language: ISO6391Language): PeopleQueryResult!
    person(id: Int!, language: ISO6391Language): Person
    quiz(input: QuizInput!): [Question!]!
  }
`;
