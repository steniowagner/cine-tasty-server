import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { Iso6391Language } from "@generated-types";
import { CONSTANTS as TMDBAPI_CONSTANTS } from "@tmdb-api/utils";

import { moviesGenres } from "../../../../../../__test__/datasources/tmdb-api/fixtures";
import { handler } from "./media-genres-movies.handler";
import { CONSTANTS } from "./media-genres.constants";

const mockGet = jest.fn();

const requestGenreIds = [28, 12, 16, 35];

jest.mock("@apollo/datasource-rest", () => {
  class MockRESTDataSource {
    baseUrl = "";
    get = mockGet;
  }
  return {
    RESTDataSource: MockRESTDataSource,
  };
});

describe("DataSources/TheMovieDBApi/MoviesGenres-Query-Handler", () => {
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
      expect(mockGet.mock.calls[0][0]).toEqual(CONSTANTS.MOVIES_ENDPOINT);
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
      expect(mockGet.mock.calls[0][0]).toEqual(CONSTANTS.MOVIES_ENDPOINT);
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
      mockGet.mockReturnValueOnce(moviesGenres);
      const response = await handler.handle({
        tmdbAPI: new TheMovieDBAPI(),
        genreIds: requestGenreIds,
      });
      expect(response).toEqual(["Ação", "Aventura", "Animação", "Comédia"]);
    });
  });
});
