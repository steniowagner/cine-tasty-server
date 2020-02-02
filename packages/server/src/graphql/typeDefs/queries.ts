import { gql } from 'apollo-server';

export default gql`
  extend type Query {
    trending_movies: TrendingMovies!
    movie(id: ID!, language: ISO6391Language): Movie
    articles(page: Int!, language: ArticleLanguage): ArticleQueryResult!
    people(page: Int!, language: ISO6391Language): PeopleQueryResult!
    person(id: Int!, language: ISO6391Language): Person
    search(
      page: Int!
      query: String!
      type: SearchType!
      language: ISO6391Language
    ): SearchResult
  }
`;
