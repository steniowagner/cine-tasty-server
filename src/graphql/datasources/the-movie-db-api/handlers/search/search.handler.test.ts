import TMDBApi from "@tmdb-api/tmdb-movie-db-api";
import { Iso6391Language } from "@generated-types";

import {
  searchFamousResult,
  searchTVShowResult,
  searchMovies,
} from "../../../../../../__test__/datasources/tmdb-api/fixtures";
import { searchTypeEndpointMapping, handler, SearchType } from "./search.handler";

const searchTypeMockResultMapping: Record<SearchType, unknown> = {
  "tv-shows": searchTVShowResult,
  famous: searchFamousResult,
  movies: searchMovies,
};

const searches = Object.keys(searchTypeEndpointMapping) as SearchType[];

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

describe("DataSources/TheMovieDBApi/Search-Query-Handler", () => {
  describe("When received some data", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test.each(searches)(
      '[Searching for %p] should call "RESTDatasource.get" with the correct "query-params" when the "language" is defined',
      async (search) => {
        const input = {
          page: 1,
          query: "SOME QUERY",
          language: Iso6391Language.Pt,
        };
        await handler.handle({
          tmdbAPI: new TMDBApi(),
          input,
          type: search,
        });
        expect(mockGet.mock.calls[0][0]).toEqual(searchTypeEndpointMapping[search]);
        expect(mockGet.mock.calls[0][1].params).toEqual({
          ...input,
          page: String(input.page),
        });
        expect(typeof mockGet.mock.calls[0][1].headers.Authorization).toEqual("string");
      },
    );

    test.each(searches)(
      "[Searching for %p] should return the data correctly when has more items to be paginated",
      async (search) => {
        const input = {
          page: 1,
          query: "SOME QUERY",
          language: Iso6391Language.Pt,
        };
        const totalResults = 10;
        const results = searchTypeMockResultMapping[search];
        mockGet.mockReturnValueOnce({
          total_pages: input.page + 1,
          results,
          total_results: totalResults,
          page: input.page,
        });
        const response = await handler.handle({
          tmdbAPI: new TMDBApi(),
          input,
          type: search,
        });
        expect(response.hasMore).toEqual(true);
        expect(response.items).toEqual(results);
        expect(response.totalResults).toEqual(totalResults);
        expect(response.totalPages).toEqual(input.page + 1);
      },
    );

    test.each(searches)(
      "[Searching for %p] should return the data correctly when doesn't have more items to be paginated",
      async (search) => {
        const input = {
          page: 1,
          query: "SOME QUERY",
          language: Iso6391Language.Pt,
        };
        const totalResults = 10;
        const results = searchTypeMockResultMapping[search];
        mockGet.mockReturnValueOnce({
          total_pages: input.page,
          results,
          total_results: totalResults,
          page: input.page,
        });
        const response = await handler.handle({
          tmdbAPI: new TMDBApi(),
          input,
          type: search,
        });
        expect(response.hasMore).toEqual(false);
        expect(response.items).toEqual(results);
        expect(response.totalResults).toEqual(totalResults);
        expect(response.totalPages).toEqual(input.page);
      },
    );
  });

  describe('When the data received is "undefined"', () => {
    test.each(searches)(
      "[Searching for %p] should return the data correctly",
      async (search) => {
        mockGet.mockReturnValueOnce(undefined);
        const input = {
          page: 1,
          query: "SOME QUERY",
          language: Iso6391Language.Pt,
        };
        const response = await handler.handle({
          tmdbAPI: new TMDBApi(),
          input,
          type: search,
        });
        expect(response).toEqual({
          hasMore: false,
          items: [],
          totalResults: 0,
          totalPages: 0,
        });
      },
    );
  });
});
