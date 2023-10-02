import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { Iso6391Language } from "@generated-types";
import { CONSTANTS as TMDBAPI_CONSTANS } from "@tmdb-api/utils";

import * as fixtures from "../../../../../../__test__/datasources/tmdb-api/fixtures";

import { handler } from "./trending-famous.handler";
import { CONSTANTS } from "./trending-famous.constants";

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

describe("DataSources/TheMovieDBApi/FamousCast-Query-Handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When the "language" is defined', () => {
    it('should call "RESTDatasource.get" correctly', async () => {
      const tmdbAPI = new TheMovieDBAPI();
      const language = Iso6391Language.Pt;
      const page = 1;
      await handler.handle(
        {
          language,
          page,
        },
        tmdbAPI,
      );
      expect(mockGet.mock.calls[0][0]).toEqual(CONSTANTS.ENDPOINT);
      expect(mockGet.mock.calls[0][1].params).toEqual({
        language,
        page: String(page),
      });
      expect(typeof mockGet.mock.calls[0][1].headers.Authorization).toEqual("string");
    });
  });

  describe('When the "language" is not defined', () => {
    it('should call "RESTDatasource.get" correctly', async () => {
      const tmdbAPI = new TheMovieDBAPI();
      const page = 1;
      await handler.handle(
        {
          page,
        },
        tmdbAPI,
      );
      expect(mockGet.mock.calls[0][0]).toEqual(CONSTANTS.ENDPOINT);
      expect(mockGet.mock.calls[0][1].params).toEqual({
        language: TMDBAPI_CONSTANS.FALLBACK_LANGUAGE,
        page: String(page),
      });
      expect(typeof mockGet.mock.calls[0][1].headers.Authorization).toEqual("string");
    });
  });

  describe('When the fixtures.trendingFamous is "undefined"', () => {
    it("should return the data correctly", async () => {
      mockGet.mockReturnValueOnce(undefined);
      const tmdbAPI = new TheMovieDBAPI();
      const result = await handler.handle(
        {
          page: 1,
        },
        tmdbAPI,
      );
      expect(result).toEqual({
        hasMore: false,
        items: [],
        totalResults: 0,
        totalPages: 0,
      });
    });
  });

  describe('When the response is "defined"', () => {
    it("should return the data correctly", async () => {
      mockGet.mockReturnValueOnce(fixtures.trendingFamous);
      const tmdbAPI = new TheMovieDBAPI();
      const result = await handler.handle(
        {
          page: 1,
        },
        tmdbAPI,
      );
      expect(result).toEqual({
        hasMore: true,
        items: fixtures.trendingFamous.results,
        totalResults: fixtures.trendingFamous.total_results,
        totalPages: fixtures.trendingFamous.total_pages,
      });
    });
  });

  describe("When there is no more pages to be paginated", () => {
    it("should return the data correctly", async () => {
      mockGet.mockReturnValueOnce({ ...fixtures.trendingFamous, total_pages: 1 });
      const tmdbAPI = new TheMovieDBAPI();
      const result = await handler.handle(
        {
          page: 1,
        },
        tmdbAPI,
      );
      expect(result).toEqual({
        hasMore: false,
        items: fixtures.trendingFamous.results,
        totalResults: fixtures.trendingFamous.total_results,
        totalPages: 1,
      });
    });
  });
});
