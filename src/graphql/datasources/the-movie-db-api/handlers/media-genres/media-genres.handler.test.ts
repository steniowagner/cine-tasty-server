import { CONSTANTS as TMDB_CONSTANTS } from "@tmdb-api/utils";
import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { Iso6391Language } from "@generated-types";

import {
  tvShowGenres,
  moviesGenres,
} from "../../../../../../__test__/datasources/tmdb-api/fixtures";
import { MockCacheHandler } from "../../../../../../__test__/exec-datasource-test-operation";
import { handler } from "./media-genres.handler";
import { CONSTANTS } from "./media-genres.constants";

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

describe("DataSources/TheMovieDBApi/MediaGenres-Query-Handler", () => {
  describe('When the "media-type" is "Movie"', () => {
    const genreIds = [28, 12, 16, 35];
    const cacheKey = TMDB_CONSTANTS.KEYS.MOVIES_GENRES_CACHE_KEY(Iso6391Language.Pt);
    const endpoint = CONSTANTS.MOVIES_ENDPOINT;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('When the "language" is defined', () => {
      it('should call "RESTDatasource.get" correctly', async () => {
        await handler.handle({
          tmdbAPI: new TheMovieDBAPI(),
          language: Iso6391Language.Pt,
          cacheHandler: new MockCacheHandler(),
          genreIds,
          cacheKey,
          endpoint,
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
          cacheHandler: new MockCacheHandler(),
          genreIds,
          cacheKey,
          endpoint,
        });
        expect(mockGet.mock.calls[0][0]).toEqual(CONSTANTS.MOVIES_ENDPOINT);
        expect(mockGet.mock.calls[0][1].params).toEqual({
          language: TMDB_CONSTANTS.FALLBACK_LANGUAGE,
        });
        expect(typeof mockGet.mock.calls[0][1].headers.Authorization).toEqual("string");
      });
    });

    describe('When the response is "undefined"', () => {
      it("should return the response correctly", async () => {
        mockGet.mockReturnValueOnce(undefined);
        const response = await handler.handle({
          tmdbAPI: new TheMovieDBAPI(),
          cacheHandler: new MockCacheHandler(),
          genreIds,
          cacheKey,
          endpoint,
        });
        expect(response).toEqual([]);
      });
    });

    describe('When the response is "undefined"', () => {
      it("should return the response correctly", async () => {
        mockGet.mockReturnValueOnce(undefined);
        const response = await handler.handle({
          tmdbAPI: new TheMovieDBAPI(),
          cacheHandler: new MockCacheHandler(),
          genreIds,
          cacheKey,
          endpoint,
        });
        expect(response).toEqual([]);
      });
    });

    describe('When the response is "defined"', () => {
      it("should return the response correctly", async () => {
        mockGet.mockReturnValueOnce(moviesGenres);
        const response = await handler.handle({
          tmdbAPI: new TheMovieDBAPI(),
          cacheHandler: new MockCacheHandler(),
          genreIds,
          cacheKey,
          endpoint,
        });
        expect(response).toEqual(["Ação", "Aventura", "Animação", "Comédia"]);
      });
    });
  });

  describe('When the "media-type" is "Tv"', () => {
    const genreIds = [9648, 10751, 18, 37];
    const cacheKey = TMDB_CONSTANTS.KEYS.TV_SHOWS_GENRES_CACHE_KEY(Iso6391Language.Pt);
    const endpoint = CONSTANTS.TV_SHOWS_ENDPOINT;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('When the "language" is defined', () => {
      it('should call "RESTDatasource.get" correctly', async () => {
        await handler.handle({
          tmdbAPI: new TheMovieDBAPI(),
          language: Iso6391Language.Pt,
          cacheHandler: new MockCacheHandler(),
          genreIds,
          cacheKey,
          endpoint,
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
          cacheHandler: new MockCacheHandler(),
          genreIds,
          cacheKey,
          endpoint,
        });
        expect(mockGet.mock.calls[0][0]).toEqual(CONSTANTS.TV_SHOWS_ENDPOINT);
        expect(mockGet.mock.calls[0][1].params).toEqual({
          language: TMDB_CONSTANTS.FALLBACK_LANGUAGE,
        });
        expect(typeof mockGet.mock.calls[0][1].headers.Authorization).toEqual("string");
      });
    });

    describe('When the response is "undefined"', () => {
      it("should return the response correctly", async () => {
        mockGet.mockReturnValueOnce(undefined);
        const response = await handler.handle({
          tmdbAPI: new TheMovieDBAPI(),
          language: Iso6391Language.Pt,
          cacheHandler: new MockCacheHandler(),
          genreIds,
          cacheKey,
          endpoint,
        });
        expect(response).toEqual([]);
      });
    });

    describe('When the response is "undefined"', () => {
      it("should return the response correctly", async () => {
        mockGet.mockReturnValueOnce(undefined);
        const response = await handler.handle({
          tmdbAPI: new TheMovieDBAPI(),
          language: Iso6391Language.Pt,
          cacheHandler: new MockCacheHandler(),
          genreIds,
          cacheKey,
          endpoint,
        });
        expect(response).toEqual([]);
      });
    });

    describe('When the response is "defined"', () => {
      it("should return the response correctly", async () => {
        mockGet.mockReturnValueOnce(tvShowGenres);
        const response = await handler.handle({
          tmdbAPI: new TheMovieDBAPI(),
          language: Iso6391Language.Pt,
          cacheHandler: new MockCacheHandler(),
          genreIds,
          cacheKey,
          endpoint,
        });
        expect(response).toEqual(["Mistério", "Família", "Drama", "Faroeste"]);
      });
    });
  });
});
