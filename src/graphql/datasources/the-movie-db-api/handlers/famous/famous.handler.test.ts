import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { Iso6391Language } from "@generated-types";

import { CONSTANTS } from "./famous.constants";
import { handler } from "./famous.handler";

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

describe("DataSources/TheMovieDBApi/Famous-Query-Handler", () => {
  it('should call "RESTDatasource.get" correctly', async () => {
    const id = 123;
    const tmdbAPI = new TheMovieDBAPI();
    await handler.handle(tmdbAPI, {
      language: Iso6391Language.Pt,
      id,
    });
    expect(mockGet.mock.calls[0][0]).toEqual(`${CONSTANTS.ENDPOINT}/${id}`);
    expect(mockGet.mock.calls[0][1].params).toEqual({
      append_to_response: "images",
    });
    expect(typeof mockGet.mock.calls[0][1].headers.Authorization).toEqual("string");
  });
});
