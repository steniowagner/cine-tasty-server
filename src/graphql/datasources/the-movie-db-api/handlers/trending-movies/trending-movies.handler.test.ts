import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { Iso6391Language } from "@generated-types";
import { TMDBApiErrors } from "@errors";

import * as fixtures from "../../../../../../__test__/datasources/tmdb-api/fixtures";
import { trendEndpointMapping, handler, Trend } from "./trending-movies.handler";

const mockGet = jest.fn();

jest.mock("@apollo/datasource-rest", () => {
  class MockRESTDataSource {
    baseUrl = "";
    get = mockGet;
  }
  return {
    RESTDataSource: MockRESTDataSource,
  };
});

describe("DataSources/TheMovieDBApi/TrendingMovies-Query-Handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When the "language" is "defined"', () => {
    test.each(Object.keys(trendEndpointMapping))(
      'should call "RESTDatasource.get" correctly when the trend is %p',
      async (trend: string) => {
        mockGet.mockReturnValueOnce(fixtures.trendingMovie);
        await handler.handle({
          tmdbAPI: new TheMovieDBAPI(),
          language: Iso6391Language.Pt,
          trend: trend as Trend,
        });
        expect(mockGet.mock.calls[0][0]).toEqual(trendEndpointMapping[trend as Trend]);
        expect(mockGet.mock.calls[0][1].params).toEqual({
          language: Iso6391Language.Pt,
          page: "1",
        });
        expect(typeof mockGet.mock.calls[0][1].headers.Authorization).toEqual("string");
      },
    );
  });

  describe('When the "language" is "undefined"', () => {
    test.each(Object.keys(trendEndpointMapping))(
      'should call "RESTDatasource.get" correctly when the trend is %p',
      async (trend: string) => {
        mockGet.mockReturnValueOnce(fixtures.trendingMovie);
        await handler.handle({
          tmdbAPI: new TheMovieDBAPI(),
          trend: trend as Trend,
        });
        expect(mockGet.mock.calls[0][0]).toEqual(trendEndpointMapping[trend as Trend]);
        expect(mockGet.mock.calls[0][1].params).toEqual({
          language: Iso6391Language.En,
          page: "1",
        });
        expect(typeof mockGet.mock.calls[0][1].headers.Authorization).toEqual("string");
      },
    );
  });

  describe('When the "response" is "defined"', () => {
    test.each(Object.keys(trendEndpointMapping))(
      "should return the data correctly when the trend is %p",
      async (trend: string) => {
        mockGet.mockReturnValueOnce(fixtures.trendingMovie);
        const response = await handler.handle({
          tmdbAPI: new TheMovieDBAPI(),
          trend: trend as Trend,
        });
        expect(response).toEqual(fixtures.trendingMovie.results);
      },
    );
  });

  describe('When the "response" is "undefined"', () => {
    test.each(Object.keys(trendEndpointMapping))(
      "should throw the QuerytrendingMoviesError error",
      async (trend: string) => {
        mockGet.mockReturnValueOnce(undefined);
        const response = await handler.handle({
          tmdbAPI: new TheMovieDBAPI(),
          trend: trend as Trend,
        });
        expect(response).toEqual([]);
      },
    );
  });
});
