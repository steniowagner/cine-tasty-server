import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { Iso6391Language } from "@generated-types";
import { CONSTANTS as TMDBAPI_CONSTANS } from "@tmdb-api/utils";

import * as fixtures from "../../../../../../../__test__/datasources/tmdb-api/fixtures";

import { handler } from "./movie-images.handler";

const ID = 1;

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

describe("DataSources/TheMovieDBApi/Movie-Images-Query-Handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When the "language" is defined', () => {
    it('should call "RESTDatasource.get" correctly', async () => {
      const tmdbAPI = new TheMovieDBAPI();
      const language = Iso6391Language.Pt;
      await handler(
        {
          language,
          id: ID,
        },
        tmdbAPI,
      );
      expect(mockGet.mock.calls[0][0]).toEqual(`movie/${ID}/images`);
      expect(mockGet.mock.calls[0][1].params).toEqual({
        language,
      });
      expect(typeof mockGet.mock.calls[0][1].headers.Authorization).toEqual("string");
    });
  });

  describe('When the "language" is not defined', () => {
    it('should call "RESTDatasource.get" correctly', async () => {
      const tmdbAPI = new TheMovieDBAPI();
      await handler(
        {
          id: ID,
        },
        tmdbAPI,
      );
      expect(mockGet.mock.calls[0][0]).toEqual(`movie/${ID}/images`);
      expect(mockGet.mock.calls[0][1].params).toEqual({
        language: TMDBAPI_CONSTANS.FALLBACK_LANGUAGE,
      });
      expect(typeof mockGet.mock.calls[0][1].headers.Authorization).toEqual("string");
    });
  });

  describe('When the response received is "undefined"', () => {
    it("should return the data correctly", async () => {
      mockGet.mockReturnValueOnce(undefined);
      const tmdbAPI = new TheMovieDBAPI();
      const result = await handler(
        {
          id: ID,
        },
        tmdbAPI,
      );
      expect(result).toEqual([]);
    });
  });

  describe("When receive the data", () => {
    it("should return the data correctly", async () => {
      mockGet.mockReturnValueOnce(fixtures.movieImages);
      const tmdbAPI = new TheMovieDBAPI();
      const result = await handler(
        {
          id: ID,
        },
        tmdbAPI,
      );
      const images = fixtures.movieImages.backdrops.map((backdrop) => backdrop.file_path);
      expect(result).toEqual(images);
    });
  });
});
