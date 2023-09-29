import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { Iso6391Language } from "@generated-types";
import { CONSTANTS as TMDBAPI_CONSTANTS } from "@tmdb-api/utils";

import { tvShowGenres } from "../../../../../../__test__/datasources/tmdb-api/fixtures";
import { handler } from "./media-genres-tv-series.handlers";
import { CONSTANTS } from "./media-genres.constants";

const mockGet = jest.fn();
const requestGenreIds = [9648, 10751, 18, 37];

jest.mock("@apollo/datasource-rest", () => {
  class MockRESTDataSource {
    baseUrl = "";
    get = mockGet;
  }
  return {
    RESTDataSource: MockRESTDataSource,
  };
});

describe("DataSources/TheMovieDBApi/TVShowsGenres-Query-Handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When the "language" is defined', () => {
    it('should call "RESTDatasource.get" correctly', async () => {
      await handler.handle({
        tmdbAPI: new TheMovieDBAPI(),
        language: Iso6391Language.Pt,
        genreIds: requestGenreIds,
      });
      expect(mockGet.mock.calls[0][0]).toEqual(CONSTANTS.TV_SHOWS_ENDPOINT);
      expect(mockGet.mock.calls[0][1].params).toEqual({
        language: Iso6391Language.Pt,
      });
      expect(typeof mockGet.mock.calls[0][1].headers.Authorization).toEqual("string");
    });
  });

  describe('When the "language" is not defined', () => {
    it('should call "RESTDatasource.get" correctly', async () => {
      await handler.handle({
        tmdbAPI: new TheMovieDBAPI(),
        genreIds: requestGenreIds,
      });
      expect(mockGet.mock.calls[0][0]).toEqual(CONSTANTS.TV_SHOWS_ENDPOINT);
      expect(mockGet.mock.calls[0][1].params).toEqual({
        language: TMDBAPI_CONSTANTS.FALLBACK_LANGUAGE,
      });
      expect(typeof mockGet.mock.calls[0][1].headers.Authorization).toEqual("string");
    });
  });

  describe('When the response is "undefined"', () => {
    it("should return the response correctly", async () => {
      mockGet.mockReturnValueOnce(undefined);
      const response = await handler.handle({
        tmdbAPI: new TheMovieDBAPI(),
        genreIds: requestGenreIds,
      });
      expect(response).toEqual([]);
    });
  });

  describe('When the response is "undefined"', () => {
    it("should return the response correctly", async () => {
      mockGet.mockReturnValueOnce(undefined);
      const response = await handler.handle({
        tmdbAPI: new TheMovieDBAPI(),
        genreIds: requestGenreIds,
      });
      expect(response).toEqual([]);
    });
  });

  describe('When the response is "defined"', () => {
    it("should return the response correctly", async () => {
      mockGet.mockReturnValueOnce(tvShowGenres);
      const response = await handler.handle({
        tmdbAPI: new TheMovieDBAPI(),
        genreIds: requestGenreIds,
      });
      expect(response).toEqual(["Mistério", "Família", "Drama", "Faroeste"]);
    });
  });
});
