import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { Iso6391Language } from "@generated-types";
import { CONSTANTS as TMDBAPI_CONSTANTS } from "@tmdb-api/utils";

import { handler } from "./media-genres-movies.handler";
import { CONSTANTS } from "./media-genres.constants";

const mockGet = jest.fn();

const genresIds = {
  genres: [
    {
      id: 28,
      name: "Ação",
    },
    {
      id: 12,
      name: "Aventura",
    },
    {
      id: 16,
      name: "Animação",
    },
    {
      id: 35,
      name: "Comédia",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentário",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Família",
    },
    {
      id: 14,
      name: "Fantasia",
    },
    {
      id: 36,
      name: "História",
    },
    {
      id: 27,
      name: "Terror",
    },
    {
      id: 10402,
      name: "Música",
    },
    {
      id: 9648,
      name: "Mistério",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Ficção científica",
    },
    {
      id: 10770,
      name: "Cinema TV",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "Guerra",
    },
    {
      id: 37,
      name: "Faroeste",
    },
  ],
};

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

describe("DataSources/TheMovieDBApi/FamousCast-Query-Handler", () => {
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
      mockGet.mockReturnValueOnce(genresIds);
      const response = await handler.handle({
        tmdbAPI: new TheMovieDBAPI(),
        genreIds: requestGenreIds,
      });
      expect(response).toEqual(["Ação", "Aventura", "Animação", "Comédia"]);
    });
  });
});
