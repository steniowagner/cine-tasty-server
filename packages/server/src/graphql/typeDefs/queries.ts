import { gql } from 'apollo-server';

export default gql`
  extend type Query {
    trending_movies: TrendingMovies!
    trending_tv_shows: TrendingTVShows!
    tv_show(id: ID!, language: ISO6391Language): TVShow
    movie(id: ID!, language: ISO6391Language): Movie
    articles(page: Int!, language: ArticleLanguage): ArticleQueryResult!
    people(page: Int!, language: ISO6391Language): PeopleQueryResult!
    person(id: Int!, language: ISO6391Language): Person
    search(
      page: Int!
      query: String!
      type: SearchType!
      language: ISO6391Language
    ): SearchQueryResult!
  }
`;
