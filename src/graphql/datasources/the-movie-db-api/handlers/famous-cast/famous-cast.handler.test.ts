import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { Iso6391Language } from "@generated-types";
import { CONSTANTS as TMDBAPI_CONSTANS } from "@tmdb-api/utils";

import {
  movieCast,
  tvShowCast,
} from "../../../../../../__test__/datasources/tmdb-api/fixtures";
import { handler } from "./famous-cast.handler";

const response = {
  cast: [movieCast, tvShowCast],
  crew: [],
  id: 64,
};

const mockGet = jest.fn();

jest.mock("@apollo/datasource-rest", () => {
  ("");
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
      const id = 123;
      await handler.handle({
        tmdbAPI: new TheMovieDBAPI(),
        language: Iso6391Language.Pt,
        id,
      });
      expect(mockGet.mock.calls[0][0]).toEqual(`person/${id}/combined_credits`);
      expect(mockGet.mock.calls[0][1].params).toEqual({
        language: Iso6391Language.Pt,
      });
      expect(typeof mockGet.mock.calls[0][1].headers.Authorization).toEqual("string");
    });
  });

  describe('When the "language" is not defined', () => {
    it('should call "RESTDatasource.get" correctly', async () => {
      const id = 123;
      await handler.handle({
        tmdbAPI: new TheMovieDBAPI(),
        id,
      });
      expect(mockGet.mock.calls[0][0]).toEqual(`person/${id}/combined_credits`);
      expect(mockGet.mock.calls[0][1].params).toEqual({
        language: TMDBAPI_CONSTANS.FALLBACK_LANGUAGE,
      });
      expect(typeof mockGet.mock.calls[0][1].headers.Authorization).toEqual("string");
    });
  });

  describe('When the response is "undefined"', () => {
    it("should return the data correctly", async () => {
      mockGet.mockReturnValueOnce(undefined);
      const result = await handler.handle({
        tmdbAPI: new TheMovieDBAPI(),
        id: 123,
      });
      expect(result).toEqual({
        moviesCast: [],
        tvShowsCast: [],
      });
    });
  });

  describe('When the response is "defined"', () => {
    it("should return the data correctly", async () => {
      const id = 123;
      mockGet.mockReturnValueOnce(response);
      const result = await handler.handle({
        tmdbAPI: new TheMovieDBAPI(),
        id,
      });
      expect(result).toEqual({
        moviesCast: [movieCast],
        tvShowsCast: [tvShowCast],
      });
    });
  });
});
