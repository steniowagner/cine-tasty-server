import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { Iso6391Language } from "@generated-types";
import { CONSTANTS as TMDBAPI_CONSTANS } from "@tmdb-api/utils";

import { handler } from "./famous-cast.handler";

const movieCast = {
  adult: false,
  backdrop_path: null,
  genre_ids: [18],
  id: 300450,
  original_language: "en",
  original_title: "Flying Horse",
  overview:
    "A biopic of pioneer photographer Eadweard Muybridge, following the courtship and love affair between Muybridge's wife, Flora, and Harry Larkyns.",
  popularity: 1.973,
  poster_path: null,
  release_date: "",
  title: "Flying Horse",
  video: false,
  vote_average: 0.0,
  vote_count: 0,
  credit_id: "5518744f9251412cb9003007",
  department: "Writing",
  job: "Writer",
  media_type: "movie",
};

const tvShowCast = {
  adult: false,
  backdrop_path: "/xCdCsHCH7VCQqaDUPD5tG6omMsB.jpg",
  genre_ids: [10767, 35],
  id: 1489,
  origin_country: ["US"],
  original_language: "en",
  original_name: "Jimmy Kimmel Live!",
  overview:
    "Jimmy Kimmel Live! is an American late-night talk show, created and hosted by Jimmy Kimmel and broadcast on ABC.",
  popularity: 83.171,
  poster_path: "/hWLCBGQ2RFpjXyaKRMbL5bGEEDT.jpg",
  first_air_date: "2003-01-26",
  name: "Jimmy Kimmel Live!",
  vote_average: 5.6,
  vote_count: 127,
  character: "",
  credit_id: "525708b3760ee3776a047e92",
  episode_count: 1,
  media_type: "tv",
};

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
