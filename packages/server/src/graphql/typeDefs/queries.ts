import { gql } from 'apollo-server';

export default gql`
  extend type Query {
    search(input: SearchInput!, genresLanguage: ISO6391Language): SearchQueryResult!
    trending_movies(language: ISO6391Language): TrendingMovies!
    trending_tv_shows(language: ISO6391Language): TrendingTVShows!
    tv_show(id: ID!, language: ISO6391Language): TVShow
    movie(id: ID!, language: ISO6391Language): Movie
    articles(page: Int!, language: ArticleLanguage): ArticleQueryResult!
    people(page: Int!, language: ISO6391Language): PeopleQueryResult!
    person(id: Int!, language: ISO6391Language): Person
    quiz(input: QuizInput!): [Question!]!
  }
`;
