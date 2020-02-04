const mockRestDataSourceGet = jest.fn();

import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';

import { rawTVShow, tvshow } from '../../../../__tests__/mocks/tvshows.stub';
import { tvGenres } from '../../../../__tests__/mocks/mediaGenres.stub';
import { TVShowsEndpoints } from '../../../../types';
import env from '../../../../config/environment';
import resolvers from '../../../resolvers';
import typeDefs from '../../../typeDefs';
import TheMovieDBAPI from '..';

const GENRE_TV_ENDPOINT = '/genre/tv/list';

const GET_TRENDING_TV_SHOWS = gql`
  fragment TrendingTVShowItem on BaseTVShow {
    origin_country
    original_name
    name
    first_air_date
    backdrop_path
    genre_ids
    overview
    vote_average
    poster_path
    popularity
    original_language
    vote_count
    id
  }

  query TrendingTVShows($page: Int!) {
    trending_tv_shows {
      on_the_air(args: { page: $page }) {
        total_results
        total_pages
        hasMore
        items {
          ...TrendingTVShowItem
        }
      }
      popular(args: { page: $page }) {
        total_results
        total_pages
        hasMore
        items {
          ...TrendingTVShowItem
        }
      }
      top_rated(args: { page: $page }) {
        total_results
        total_pages
        hasMore
        items {
          ...TrendingTVShowItem
        }
      }
    }
  }
`;

const makeTestServer = (): ApolloServer => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      tmdb: new TheMovieDBAPI(),
    }),
  });
};

jest.mock('apollo-datasource-rest', () => {
  class MockRESTDataSource {
    baseUrl = '';
    get = mockRestDataSourceGet;
  }

  return {
    RESTDataSource: MockRESTDataSource,
    HTTPCache: class HTTPCache {},
  };
});

describe('Integration: DataSources-TVShow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Query - Trending TV Shows', () => {
    it('should query the on-the-air/popular/top_rated tv shows from TheMovieDB API and returns the result correctly', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({
          total_pages: 1,
          total_results: 1,
          results: [rawTVShow],
        })
        .mockReturnValueOnce({
          total_pages: 1,
          total_results: 1,
          results: [rawTVShow],
        })
        .mockReturnValueOnce({
          total_pages: 1,
          total_results: 1,
          results: [rawTVShow],
        })
        .mockReturnValueOnce({ genres: tvGenres })
        .mockReturnValueOnce({ genres: tvGenres })
        .mockReturnValueOnce({ genres: tvGenres });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data, errors } = await query({
        query: GET_TRENDING_TV_SHOWS,
        variables: { page: 1 },
      });
      console.log(errors);
      expect(mockRestDataSourceGet.mock.calls.length).toBe(6);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(TVShowsEndpoints.OnTheAir, {
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
        page: 1,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(TVShowsEndpoints.Popular, {
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
        page: 1,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(TVShowsEndpoints.TopRated, {
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
        page: 1,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(GENRE_TV_ENDPOINT, {
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(GENRE_TV_ENDPOINT, {
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(GENRE_TV_ENDPOINT, {
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
      });

      expect(data!.trending_tv_shows).toEqual({
        on_the_air: {
          hasMore: false,
          total_pages: 1,
          total_results: 1,
          items: [tvshow],
        },
        top_rated: {
          hasMore: false,
          total_pages: 1,
          total_results: 1,
          items: [tvshow],
        },
        popular: {
          hasMore: false,
          total_pages: 1,
          total_results: 1,
          items: [tvshow],
        },
      });
    });

    it('should query the on-the-air/popular/top_rated tv shows from TheMovieDB API and return the field hasMore as true when has more items to be paginated', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({
          total_pages: 2,
          total_results: 2,
          results: [rawTVShow],
        })
        .mockReturnValueOnce({
          total_pages: 2,
          total_results: 2,
          results: [rawTVShow],
        })
        .mockReturnValueOnce({
          total_pages: 2,
          total_results: 2,
          results: [rawTVShow],
        })
        .mockReturnValueOnce({ genres: tvGenres })
        .mockReturnValueOnce({ genres: tvGenres })
        .mockReturnValueOnce({ genres: tvGenres });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_TRENDING_TV_SHOWS,
        variables: { page: 1 },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(6);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(TVShowsEndpoints.OnTheAir, {
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
        page: 1,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(TVShowsEndpoints.Popular, {
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
        page: 1,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(TVShowsEndpoints.TopRated, {
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
        page: 1,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(GENRE_TV_ENDPOINT, {
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(GENRE_TV_ENDPOINT, {
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(GENRE_TV_ENDPOINT, {
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
      });

      expect(data!.trending_tv_shows).toEqual({
        on_the_air: {
          hasMore: true,
          total_pages: 2,
          total_results: 2,
          items: [tvshow],
        },
        top_rated: {
          hasMore: true,
          total_pages: 2,
          total_results: 2,
          items: [tvshow],
        },
        popular: {
          hasMore: true,
          total_pages: 2,
          total_results: 2,
          items: [tvshow],
        },
      });
    });
  });
});
