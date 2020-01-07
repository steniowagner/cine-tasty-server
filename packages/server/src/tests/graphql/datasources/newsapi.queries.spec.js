import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';

import { rawArticleWithId, articleWithId } from './fixtures/getAllArticlesStub';

import NewsAPI from '../../../graphql/datasources/NewsAPI';
import resolvers from '../../../graphql/resolvers';
import typeDefs from '../../../graphql/typeDefs';

const GET_ARTICLES = gql`
  query GetArticles($page: Int!) {
    articles(page: $page) {
      publishedAt
      source
      author
      title
      image
      url
      id
    }
  }
`;

const makeTestServer = () => {
  const newsAPI = new NewsAPI();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      news: newsAPI,
    }),
  });

  return { server, newsAPI };
};

describe('[Queries.NewsAPI]', () => {
  it('fetches an array of articles from the News API', async () => {
    const { server, newsAPI } = makeTestServer();

    newsAPI.get = jest.fn(() => ({
      articles: [rawArticleWithId],
      status: 'ok',
    }));

    const { query } = createTestClient(server);

    const result = await query({
      query: GET_ARTICLES,
      variables: { page: 1 },
    });

    expect(result.data.articles).toEqual([articleWithId]);
  });

  it("returns an empty array when the status isn't ok", async () => {
    const { server, newsAPI } = makeTestServer();

    newsAPI.get = jest.fn(() => ({
      variables: { page: 1 },
      status: 'error',
      articles: [],
    }));

    const { query } = createTestClient(server);

    const result = await query({
      query: GET_ARTICLES,
      variables: { page: 1 },
    });

    expect(result.data.articles).toEqual([]);
  });
});
