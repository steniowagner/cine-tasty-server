import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { Iso6391Language } from "@generated-types";
import { CONSTANTS as TMDBAPI_CONSTANS } from "@tmdb-api/utils";
import * as TMDBApiErrors from "@/graphql/errors/tmdb-api";

import * as fixtures from "../../../../../../../__test__/datasources/tmdb-api/fixtures";
import { handler } from "./movie-details.handler";

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

describe("DataSources/TheMovieDBApi/Movie-Details-Query-Handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When the "language" is defined', () => {
    it('should call "RESTDatasource.get" correctly', async () => {
      const tmdbAPI = new TheMovieDBAPI();
      mockGet.mockReturnValueOnce(fixtures.movie);
      const language = Iso6391Language.Pt;
      await handler(
        {
          language,
          id: ID,
        },
        tmdbAPI,
      );
      expect(mockGet.mock.calls[0][0]).toEqual(`movie/${ID}`);
      expect(mockGet.mock.calls[0][1].params).toEqual({
        language,
      });
      expect(typeof mockGet.mock.calls[0][1].headers.Authorization).toEqual("string");
    });
  });

  describe('When the "language" is not defined', () => {
    it('should call "RESTDatasource.get" correctly', async () => {
      const tmdbAPI = new TheMovieDBAPI();
      mockGet.mockReturnValueOnce(fixtures.movie);
      await handler(
        {
          id: ID,
        },
        tmdbAPI,
      );
      expect(mockGet.mock.calls[0][0]).toEqual(`movie/${ID}`);
      expect(mockGet.mock.calls[0][1].params).toEqual({
        language: TMDBAPI_CONSTANS.FALLBACK_LANGUAGE,
      });
      expect(typeof mockGet.mock.calls[0][1].headers.Authorization).toEqual("string");
    });
  });

  describe('When "response" is "defiend"', () => {
    it("should return the data correctly", async () => {
      mockGet.mockReturnValueOnce(fixtures.movie);
      const tmdbAPI = new TheMovieDBAPI();
      const result = await handler(
        {
          id: ID,
        },
        tmdbAPI,
      );
      expect(result).toEqual(fixtures.movie);
    });
  });

  describe('When "response" is "undefiend"', () => {
    it('should throw "QueryTrendingTVShowsError"', async () => {
      const tmdbAPI = new TheMovieDBAPI();
      await expect(() =>
        handler(
          {
            id: ID,
          },
          tmdbAPI,
        ),
      ).rejects.toThrow(new TMDBApiErrors.QueryMovieError(ID));
    });
  });
});
