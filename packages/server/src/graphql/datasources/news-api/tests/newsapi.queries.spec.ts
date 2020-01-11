import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';

import {
  rawArticleWithId,
  articleWithId,
} from '../../../../__tests__/mocks/articles.stub';
import resolvers from '../../../resolvers';
import typeDefs from '../../../typeDefs';
import NewsAPI from '..';

const GET_ARTICLES = gql`
  query GetArticles($page: Int!) {
    articles(page: $page) {
      items {
        publishedAt
        content
        source
        author
        title
        image
        url
        id
      }
      hasMore
    }
  }
`;

const makeTestServer = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      news: new NewsAPI(),
    }),
  });

  return server;
};

const mockRestDataSourceGet = jest.fn();

jest.mock('apollo-datasource-rest', () => {
  class MockRESTDataSource {
    baseUrl = '';
    get = mockRestDataSourceGet;
  }

  return {
    RESTDataSource: MockRESTDataSource,
  };
});

describe('[Queries.NewsAPI]', () => {
  it('fetches an array of articles from the News API', async () => {
    mockRestDataSourceGet.mockResolvedValueOnce({
      articles: [rawArticleWithId],
      status: 'ok',
    });

    const server = makeTestServer();

    const { query } = createTestClient(server);

    const { data } = await query({
      query: GET_ARTICLES,
      variables: { page: 1 },
    });

    expect(data!.articles.items).toEqual([articleWithId]);
  });

  it('fetches an array of articles from the News API', async () => {
    mockRestDataSourceGet.mockResolvedValueOnce({
      articles: [rawArticleWithId],
      status: 'ok',
    });

    const server = makeTestServer();

    const { query } = createTestClient(server);

    const { data } = await query({
      query: GET_ARTICLES,
      variables: { page: 1 },
    });

    expect(data!.articles.items).toEqual([articleWithId]);
  });

  it("returns an empty array when the status isn't ok", async () => {
    mockRestDataSourceGet.mockResolvedValueOnce({
      variables: { page: 1 },
      status: 'error',
      articles: [],
    });

    const server = makeTestServer();

    const { query } = createTestClient(server);

    const { data } = await query({
      query: GET_ARTICLES,
      variables: { page: 1 },
    });

    expect(data!.articles.items).toEqual([]);
  });

  it('returns an empty array when already paginated all items', async () => {
    mockRestDataSourceGet.mockResolvedValueOnce({
      variables: { page: 2 },
      status: 'error',
      articles: [rawArticleWithId],
    });

    const server = makeTestServer();

    const { query } = createTestClient(server);

    const { data } = await query({
      query: GET_ARTICLES,
      variables: { page: 2 },
    });

    expect(data!.articles.items).toEqual([]);
  });

  it('returns hasMany as true when has more items to be paginated', async () => {
    mockRestDataSourceGet.mockResolvedValueOnce({
      variables: { page: 1 },
      status: 'ok',
      articles: Array(12).fill(rawArticleWithId),
    });

    const server = makeTestServer();

    const { query } = createTestClient(server);

    const { data } = await query({
      query: GET_ARTICLES,
      variables: { page: 1 },
    });

    expect(data!.articles.hasMore).toEqual(true);
  });

  it('returns hasMany as false when has no more items to be paginated', async () => {
    mockRestDataSourceGet.mockResolvedValueOnce({
      variables: { page: 1 },
      status: 'ok',
      articles: Array(11).fill(rawArticleWithId),
    });

    const server = makeTestServer();

    const { query } = createTestClient(server);

    const { data } = await query({
      query: GET_ARTICLES,
      variables: { page: 1 },
    });

    expect(data!.articles.hasMore).toEqual(false);
  });
});
