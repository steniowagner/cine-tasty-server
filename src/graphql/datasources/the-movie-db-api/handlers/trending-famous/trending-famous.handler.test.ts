import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { Iso6391Language } from "@generated-types";
import { CONSTANTS as TMDBAPI_CONSTANS } from "@tmdb-api/utils";

import { handler } from "./trending-famous.handler";
import { CONSTANTS } from "./trending-famous.constants";

const response = {
  page: 1,
  results: [
    {
      adult: false,
      gender: 2,
      id: 64,
      known_for: [
        {
          adult: false,
          backdrop_path: "/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
          genre_ids: [18, 28, 80, 53],
          id: 155,
          media_type: "movie",
          original_language: "en",
          original_title: "The Dark Knight",
          overview:
            "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
          poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
          release_date: "2008-07-16",
          title: "The Dark Knight",
          video: false,
          vote_average: 8.5,
          vote_count: 30631,
        },
        {
          adult: false,
          backdrop_path: "/c3OHQncTAnKFhdOTX7D3LTW6son.jpg",
          genre_ids: [28, 80, 18, 53],
          id: 49026,
          media_type: "movie",
          original_language: "en",
          original_title: "The Dark Knight Rises",
          overview:
            "Following the death of District Attorney Harvey Dent, Batman assumes responsibility for Dent's crimes to protect the late attorney's reputation and is subsequently hunted by the Gotham City Police Department. Eight years later, Batman encounters the mysterious Selina Kyle and the villainous Bane, a new terrorist leader who overwhelms Gotham's finest. The Dark Knight resurfaces to protect a city that has branded him an enemy.",
          poster_path: "/hr0L2aueqlP2BYUblTTjmtn0hw4.jpg",
          release_date: "2012-07-17",
          title: "The Dark Knight Rises",
          video: false,
          vote_average: 7.8,
          vote_count: 21340,
        },
        {
          adult: false,
          backdrop_path: "/zXwFJMwvQcJFitP9GcHZvHAHGe8.jpg",
          genre_ids: [18, 36],
          id: 399404,
          media_type: "movie",
          original_language: "en",
          original_title: "Darkest Hour",
          overview:
            "In May 1940, the fate of World War II hangs on Winston Churchill, who must decide whether to negotiate with Adolf Hitler or fight on knowing that it could mean the end of the British Empire.",
          poster_path: "/z0K8uoNbrYKkbaP7wIeadJ4BmSL.jpg",
          release_date: "2017-11-22",
          title: "Darkest Hour",
          video: false,
          vote_average: 7.4,
          vote_count: 4762,
        },
      ],
      known_for_department: "Acting",
      name: "Gary Oldman",
      popularity: 250.277,
      profile_path: "/yhaSM5habNNI1Tf4ALRwRk3VvSZ.jpg",
    },
  ],
  total_pages: 500,
  total_results: 10000,
};

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

  describe('When the response is "undefined"', () => {
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
      mockGet.mockReturnValueOnce(response);
      const tmdbAPI = new TheMovieDBAPI();
      const result = await handler.handle(
        {
          page: 1,
        },
        tmdbAPI,
      );
      expect(result).toEqual({
        hasMore: true,
        items: response.results,
        totalResults: response.total_results,
        totalPages: response.total_pages,
      });
    });
  });

  describe("When there is no more pages to be paginated", () => {
    it("should return the data correctly", async () => {
      mockGet.mockReturnValueOnce({ ...response, total_pages: 1 });
      const tmdbAPI = new TheMovieDBAPI();
      const result = await handler.handle(
        {
          page: 1,
        },
        tmdbAPI,
      );
      expect(result).toEqual({
        hasMore: false,
        items: response.results,
        totalResults: response.total_results,
        totalPages: 1,
      });
    });
  });
});
