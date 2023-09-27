import { NewsLanguage } from "@generated-types";

import { languageQueryMapping, CONSTANTS } from "./utils";
import NewsAPI from "./news-api";

const mockGet = jest.fn().mockReturnValue({
  status: "ok",
  totalResults: 0,
  articles: [],
});

jest.mock("@apollo/datasource-rest", () => {
  class MockRESTDataSource {
    baseUrl = "";
    get = mockGet;
  }
  return {
    RESTDataSource: MockRESTDataSource,
  };
});

describe("DataSources/NewsAPI/Unit", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test.each(Object.entries(languageQueryMapping))(
    'should call "RESTDatasource.get" with the correct "query-params" %p',
    async (language: string, queries: string[]) => {
      const newsAPI = new NewsAPI(new Date("2023-09-27"));
      await newsAPI.getNews({
        language: language as NewsLanguage,
        page: 1,
      });
      expect(mockGet.mock.calls[0][0]).toEqual(CONSTANTS.ENDPOINT);
      expect(mockGet.mock.calls[0][1].params.from).toEqual("2023-09-25");
      expect(mockGet.mock.calls[0][1].params.to).toEqual("2023-09-27");
      expect(mockGet.mock.calls[0][1].params.sortBy).toEqual(CONSTANTS.SORT_BY);
      expect(mockGet.mock.calls[0][1].params.language).toEqual(language.toLowerCase());
      expect(mockGet.mock.calls[0][1].params.pageSize).toEqual(
        String(CONSTANTS.PAGE_SIZE),
      );
      expect(mockGet.mock.calls[0][1].params.page).toEqual("1");
      expect(mockGet.mock.calls[0][1].params.q).toEqual(queries.join(" OR "));
    },
  );
});
