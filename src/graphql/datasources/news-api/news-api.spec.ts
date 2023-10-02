/* eslint-disable @typescript-eslint/no-explicit-any */
import { RESTDataSource } from "@apollo/datasource-rest";

import { NewsAPIResponseArticles } from "@news-api/types";
import { NewsLanguage, NewsResult } from "@generated-types";
import { SetCacheParmas, CacheHandler } from "@/utils";

import { execDatasourceTestOperation } from "../../../../__test__";
import { CONSTANTS } from "./utils";

const mockNewsArticles = (lenght: number) =>
  Array(lenght)
    .fill({})
    .map((_, index) => ({
      description: `description-${index}`,
      content: `content-${index}`,
      urlToImage: `urlToImage-${index}`,
      author: `author-${index}`,
      publishedAt: `publishedAt-${index}`,
      source: {
        name: `source-name-${index}`,
        id: `source-id-${index}`,
      },
      url: `url-${index}`,
      title: `title-${index}`,
    })) as NewsAPIResponseArticles[];

const QUERY_NEWS = `#graphql
  query News($page: Int!, $language: NewsLanguage!) {
  news(page: $page, language: $language) {
    items {
      publishedAt
      description
      content
      source
      author
      title
      image
      url
      id
    }
    hasMore
  }
}
`;

type ExecDatasourceTestOperationResponse = {
  news: NewsResult;
};

describe("DataSources/NewsAPI/Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the query correctly when has some more data to be returned", async () => {
    const articles = mockNewsArticles(CONSTANTS.PAGE_SIZE);
    jest.spyOn(RESTDataSource.prototype as any, "get").mockImplementation(async () =>
      Promise.resolve({
        articles,
        status: "ok",
      }),
    );
    const response =
      await execDatasourceTestOperation<ExecDatasourceTestOperationResponse>({
        query: QUERY_NEWS,
        variables: {
          page: 1,
          language: NewsLanguage.Pt,
        },
      });
    const news = response.body.singleResult.data.news;
    expect(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(news.hasMore).toEqual(true);
    expect(news.items.length).toEqual(articles.length);
    for (let i = 0; i < articles.length; i++) {
      expect(news.items[i].publishedAt).toEqual(articles[i].publishedAt);
      expect(news.items[i].description).toEqual(articles[i].description);
      expect(news.items[i].content).toEqual(articles[i].content);
      expect(news.items[i].source).toEqual(articles[i].source.name);
      expect(news.items[i].author).toEqual(articles[i].author);
      expect(news.items[i].title).toEqual(articles[i].title);
      expect(news.items[i].image).toEqual(articles[i].urlToImage);
      expect(news.items[i].url).toEqual(articles[i].url);
      expect(news.items[i].id).toEqual(articles[i].url);
    }
  });

  it("should return the query correctly when has some no more data to be returned", async () => {
    const articles = mockNewsArticles(CONSTANTS.PAGE_SIZE - 1);
    jest.spyOn(RESTDataSource.prototype as any, "get").mockImplementation(async () =>
      Promise.resolve({
        articles,
        status: "ok",
      }),
    );
    const response =
      await execDatasourceTestOperation<ExecDatasourceTestOperationResponse>({
        query: QUERY_NEWS,
        variables: {
          page: 1,
          language: NewsLanguage.Pt,
        },
      });
    const news = response.body.singleResult.data.news;
    expect(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(news.hasMore).toEqual(false);
    expect(news.items.length).toEqual(articles.length);
    for (let i = 0; i < articles.length; i++) {
      expect(news.items[i].publishedAt).toEqual(articles[i].publishedAt);
      expect(news.items[i].description).toEqual(articles[i].description);
      expect(news.items[i].content).toEqual(articles[i].content);
      expect(news.items[i].source).toEqual(articles[i].source.name);
      expect(news.items[i].author).toEqual(articles[i].author);
      expect(news.items[i].title).toEqual(articles[i].title);
      expect(news.items[i].image).toEqual(articles[i].urlToImage);
      expect(news.items[i].url).toEqual(articles[i].url);
      expect(news.items[i].id).toEqual(articles[i].url);
    }
  });

  it(`should allow at most ${CONSTANTS.PAGE_SIZE} pages to be paginated`, async () => {
    const response =
      await execDatasourceTestOperation<ExecDatasourceTestOperationResponse>({
        query: QUERY_NEWS,
        variables: {
          page: CONSTANTS.PAGE_SIZE + 1,
          language: NewsLanguage.Pt,
        },
      });
    const news = response.body.singleResult.data.news;
    expect(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(news.hasMore).toEqual(false);
    expect(news.items).toEqual([]);
  });

  describe("Cache", () => {
    it("should return the cached-data when it has some", async () => {
      class MockCacheHandler implements CacheHandler {
        async get<TData>(_key: string) {
          const articles = mockNewsArticles(CONSTANTS.PAGE_SIZE - 1);
          return Promise.resolve(articles as TData);
        }

        async set() {
          return Promise.resolve(undefined);
        }

        async init() {
          return Promise.resolve();
        }
      }
      const cacheHandler = new MockCacheHandler();
      const response =
        await execDatasourceTestOperation<ExecDatasourceTestOperationResponse>({
          query: QUERY_NEWS,
          variables: {
            page: 1,
            language: NewsLanguage.Pt,
          },
          cacheHandler,
        });
      const news = response.body.singleResult.data.news;
      expect(response.body.kind === "single");
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(news.hasMore).toEqual(true);
      const articles = mockNewsArticles(CONSTANTS.PAGE_SIZE - 1);
      expect(news.items.length).toEqual(articles.length);
      for (let i = 0; i < articles.length; i++) {
        expect(news.items[i].publishedAt).toEqual(articles[i].publishedAt);
        expect(news.items[i].description).toEqual(articles[i].description);
        expect(news.items[i].content).toEqual(articles[i].content);
        expect(news.items[i].source).toEqual(articles[i].source.name);
        expect(news.items[i].author).toEqual(articles[i].author);
        expect(news.items[i].title).toEqual(articles[i].title);
        expect(news.items[i].image).toEqual(articles[i].urlToImage);
        expect(news.items[i].url).toEqual(articles[i].url);
        expect(news.items[i].id).toEqual(articles[i].url);
      }
    });

    it("should cache the received data when it was not cached previously", async () => {
      const articles = mockNewsArticles(CONSTANTS.PAGE_SIZE - 1);
      class MockCacheHandler implements CacheHandler {
        async get(_key: string) {
          return Promise.resolve(undefined);
        }

        async set(_params: SetCacheParmas) {
          return Promise.resolve();
        }

        async init() {
          return Promise.resolve();
        }
      }
      jest.spyOn(RESTDataSource.prototype as any, "get").mockImplementation(async () =>
        Promise.resolve({
          articles,
          status: "ok",
        }),
      );
      jest
        .spyOn(MockCacheHandler.prototype as any, "set")
        .mockImplementation(async () => Promise.resolve());
      const cacheHandler = new MockCacheHandler();
      await execDatasourceTestOperation<ExecDatasourceTestOperationResponse>({
        query: QUERY_NEWS,
        variables: {
          page: 1,
          language: NewsLanguage.Pt,
        },
        cacheHandler: new MockCacheHandler(),
      });
      expect(cacheHandler.set).toBeCalledTimes(1);
      expect(cacheHandler.set).toHaveBeenCalledWith({
        key: CONSTANTS.CACHE_KEY(1, NewsLanguage.Pt),
        value: articles,
        expireIn: CONSTANTS.CACHE_EXPIRATION,
      });
    });
  });

  describe("When some error happens", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return the query correctly when some is thrown during the request", async () => {
      jest
        .spyOn(RESTDataSource.prototype as any, "get")
        .mockImplementation(async () => Promise.reject());
      const response =
        await execDatasourceTestOperation<ExecDatasourceTestOperationResponse>({
          query: QUERY_NEWS,
          variables: {
            page: 1,
            language: NewsLanguage.Pt,
          },
        });
      const news = response.body.singleResult.data.news;
      expect(response.body.kind === "single");
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(news.hasMore).toEqual(false);
      expect(news.items.length).toEqual(0);
    });

    it('should return the query correctly when the "status" is "error"', async () => {
      jest.spyOn(RESTDataSource.prototype as any, "get").mockImplementation(async () =>
        Promise.resolve({
          articles: [],
          status: "error",
        }),
      );
      const response =
        await execDatasourceTestOperation<ExecDatasourceTestOperationResponse>({
          query: QUERY_NEWS,
          variables: {
            page: 1,
            language: NewsLanguage.Pt,
          },
        });
      const news = response.body.singleResult.data.news;
      expect(response.body.kind === "single");
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(news.hasMore).toEqual(false);
      expect(news.items).toEqual([]);
    });
  });
});
