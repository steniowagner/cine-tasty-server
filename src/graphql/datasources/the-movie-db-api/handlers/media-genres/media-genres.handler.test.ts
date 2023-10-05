import { CONSTANTS as TMDB_CONSTANTS } from "@tmdb-api/utils";
import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { Iso6391Language, MediaType } from "@generated-types";
import { CacheHandler } from "@/utils";

import {
  tvShowGenres,
  moviesGenres,
} from "../../../../../../__test__/datasources/tmdb-api/fixtures";
import { MockCacheHandler } from "../../../../../../__test__/exec-datasource-test-operation";
import { handler, CACHE_EXPIRATION } from "./media-genres.handler";

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
    const mediaType = MediaType.Movie;
    const genreIds = [28, 12, 16, 35];
    const endpoint = "genre/movie/list";

    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe("Cache", () => {
      it('should call "CacheHandler.get" correctly', async () => {
        jest.spyOn(MockCacheHandler.prototype, "get");
        const cacheHandler = new MockCacheHandler();
        await handler.handle({
          tmdbAPI: new TheMovieDBAPI(),
          language: Iso6391Language.Pt,
          cacheHandler,
          shouldReturnRaw: true,
          genreIds,
          mediaType,
        });
        const mock = (cacheHandler.get as jest.Mock).mock;
        expect(cacheHandler.get).toHaveBeenCalledTimes(1);
        expect(mock.calls[0][0]).toEqual("movies/genres/pt");
      });

      it('should call "CacheHandler.set" correctly', async () => {
        mockGet.mockReturnValueOnce(tvShowGenres);
        jest.spyOn(MockCacheHandler.prototype, "set");
        const cacheHandler = new MockCacheHandler();
        await handler.handle({
          tmdbAPI: new TheMovieDBAPI(),
          language: Iso6391Language.Pt,
          cacheHandler,
          genreIds,
          mediaType,
        });
        const mock = (cacheHandler.set as jest.Mock).mock;
        expect(cacheHandler.set).toHaveBeenCalledTimes(1);
        expect(mock.calls[0][0]).toEqual({
          expireIn: CACHE_EXPIRATION,
          key: "movies/genres/pt",
          value: tvShowGenres,
        });
      });

      it('should not call "CacheHandler.set" when the response is "[]"', async () => {
        mockGet.mockReturnValueOnce(undefined);
        jest.spyOn(MockCacheHandler.prototype, "set");
        const cacheHandler = new MockCacheHandler();
        await handler.handle({
          tmdbAPI: new TheMovieDBAPI(),
          language: Iso6391Language.Pt,
          cacheHandler,
          genreIds,
          mediaType,
        });
        expect(cacheHandler.set).toHaveBeenCalledTimes(0);
      });

      describe("When there is some data cached", () => {
        it('should return the cached data correctly when "shouldReturnRaw" is "true"', async () => {
          class MockCacheHandler implements CacheHandler {
            async get<TData>(_key: string) {
              return Promise.resolve({
                genres: moviesGenres.genres.slice(1, 5),
              } as TData);
            }

            async set() {
              return Promise.resolve(undefined);
            }

            async init() {
              return Promise.resolve();
            }
          }
          const response = await handler.handle({
            tmdbAPI: new TheMovieDBAPI(),
            language: Iso6391Language.Pt,
            cacheHandler: new MockCacheHandler(),
            shouldReturnRaw: true,
            genreIds,
            mediaType,
          });
          expect(response).toEqual(moviesGenres.genres.slice(1, 5));
        });

        it('should return the cached data correctly when "shouldReturnRaw" is not defined', async () => {
          class MockCacheHandler implements CacheHandler {
            async get<TData>(_key: string) {
              return Promise.resolve(moviesGenres as TData);
            }

            async set() {
              return Promise.resolve(undefined);
            }

            async init() {
              return Promise.resolve();
            }
          }
          const response = await handler.handle({
            tmdbAPI: new TheMovieDBAPI(),
            language: Iso6391Language.Pt,
            cacheHandler: new MockCacheHandler(),
            genreIds,
            mediaType,
          });
          expect(response).toEqual(
            genreIds
              .map((genreId) => moviesGenres.genres.find((genre) => genre.id === genreId))
              .map((genre) => genre?.name),
          );
        });
      });

      describe("When there is no data cached", () => {
        it('should return the raw "response.genres" when "shouldReturnRaw" is "true"', async () => {
          mockGet.mockReturnValueOnce(moviesGenres);
          const response = await handler.handle({
            tmdbAPI: new TheMovieDBAPI(),
            language: Iso6391Language.Pt,
            cacheHandler: new MockCacheHandler(),
            shouldReturnRaw: true,
            genreIds: [],
            mediaType,
          });
          expect(response).toEqual(moviesGenres.genres);
        });
      });
    });

    describe('When the "language" is defined', () => {
      it('should call "RESTDatasource.get" correctly', async () => {
        await handler.handle({
          tmdbAPI: new TheMovieDBAPI(),
          language: Iso6391Language.Pt,
          cacheHandler: new MockCacheHandler(),
          mediaType,
          genreIds,
        });
        expect(mockGet.mock.calls[0][0]).toEqual(endpoint);
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
          mediaType,
          genreIds,
        });
        expect(mockGet.mock.calls[0][0]).toEqual(endpoint);
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
          mediaType,
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
          mediaType,
        });
        expect(response).toEqual(["Ação", "Aventura", "Animação", "Comédia"]);
      });
    });
  });

  describe('When the "media-type" is "Tv"', () => {
    const genreIds = [9648, 10751, 18, 37];
    const mediaType = MediaType.Tv;
    const endpoint = "genre/tv/list";

    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe("Cache", () => {
      it('should call "CacheHandler.get" correctly', async () => {
        jest.spyOn(MockCacheHandler.prototype, "get");
        const cacheHandler = new MockCacheHandler();
        await handler.handle({
          tmdbAPI: new TheMovieDBAPI(),
          language: Iso6391Language.Pt,
          cacheHandler,
          shouldReturnRaw: true,
          genreIds,
          mediaType,
        });
        const mock = (cacheHandler.get as jest.Mock).mock;
        expect(cacheHandler.get).toHaveBeenCalledTimes(1);
        expect(mock.calls[0][0]).toEqual("tv-shows/genres/pt");
      });

      it('should call "CacheHandler.set" correctly', async () => {
        mockGet.mockReturnValueOnce(tvShowGenres);
        jest.spyOn(MockCacheHandler.prototype, "set");
        const cacheHandler = new MockCacheHandler();
        await handler.handle({
          tmdbAPI: new TheMovieDBAPI(),
          language: Iso6391Language.Pt,
          cacheHandler,
          genreIds,
          mediaType,
        });
        const mock = (cacheHandler.set as jest.Mock).mock;
        expect(cacheHandler.set).toHaveBeenCalledTimes(1);
        expect(mock.calls[0][0]).toEqual({
          expireIn: CACHE_EXPIRATION,
          key: "tv-shows/genres/pt",
          value: tvShowGenres,
        });
      });

      it('should not call "CacheHandler.set" when the response is "[]"', async () => {
        mockGet.mockReturnValueOnce(undefined);
        jest.spyOn(MockCacheHandler.prototype, "set");
        const cacheHandler = new MockCacheHandler();
        await handler.handle({
          tmdbAPI: new TheMovieDBAPI(),
          language: Iso6391Language.Pt,
          cacheHandler,
          genreIds,
          mediaType,
        });
        expect(cacheHandler.set).toHaveBeenCalledTimes(0);
      });

      describe("When there is some data cached", () => {
        it('should return the cached data correctly when "shouldReturnRaw" is "true"', async () => {
          class MockCacheHandler implements CacheHandler {
            async get<TData>(_key: string) {
              return Promise.resolve({
                genres: tvShowGenres.genres.slice(1, 5),
              } as TData);
            }

            async set() {
              return Promise.resolve(undefined);
            }

            async init() {
              return Promise.resolve();
            }
          }
          const response = await handler.handle({
            tmdbAPI: new TheMovieDBAPI(),
            language: Iso6391Language.Pt,
            cacheHandler: new MockCacheHandler(),
            shouldReturnRaw: true,
            genreIds,
            mediaType,
          });
          expect(response).toEqual(tvShowGenres.genres.slice(1, 5));
        });

        it('should return the cached data correctly when "shouldReturnRaw" is not defined', async () => {
          class MockCacheHandler implements CacheHandler {
            async get<TData>(_key: string) {
              return Promise.resolve(tvShowGenres as TData);
            }

            async set() {
              return Promise.resolve(undefined);
            }

            async init() {
              return Promise.resolve();
            }
          }
          const response = await handler.handle({
            tmdbAPI: new TheMovieDBAPI(),
            language: Iso6391Language.Pt,
            cacheHandler: new MockCacheHandler(),
            genreIds,
            mediaType,
          });
          expect(response).toEqual(
            genreIds
              .map((genreId) => tvShowGenres.genres.find((genre) => genre.id === genreId))
              .map((genre) => genre?.name),
          );
        });
      });

      describe("When there is no data cached", () => {
        it('should return the raw "response.genres" when "shouldReturnRaw" is "true"', async () => {
          mockGet.mockReturnValueOnce(tvShowGenres);
          const response = await handler.handle({
            tmdbAPI: new TheMovieDBAPI(),
            language: Iso6391Language.Pt,
            cacheHandler: new MockCacheHandler(),
            shouldReturnRaw: true,
            genreIds: [],
            mediaType,
          });
          expect(response).toEqual(tvShowGenres.genres);
        });
      });
    });

    describe('When the "language" is defined', () => {
      it('should call "RESTDatasource.get" correctly', async () => {
        await handler.handle({
          tmdbAPI: new TheMovieDBAPI(),
          language: Iso6391Language.Pt,
          cacheHandler: new MockCacheHandler(),
          genreIds,
          mediaType,
        });
        expect(mockGet.mock.calls[0][0]).toEqual(endpoint);
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
          mediaType,
        });
        expect(mockGet.mock.calls[0][0]).toEqual(endpoint);
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
          mediaType,
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
          mediaType,
        });
        expect(response).toEqual(["Mistério", "Família", "Drama", "Faroeste"]);
      });
    });
  });
});
