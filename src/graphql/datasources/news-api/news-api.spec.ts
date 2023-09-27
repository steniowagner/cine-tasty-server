/* eslint-disable @typescript-eslint/no-explicit-any */
import { RESTDataSource } from "@apollo/datasource-rest";

import { NewsResult } from "@generated-types";

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
    }));

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
  it("should return the query correctly when has some more data to be returned", async () => {
    const articles = mockNewsArticles(CONSTANTS.PAGE_SIZE);
    jest.spyOn(RESTDataSource.prototype as any, "get").mockImplementation(async () =>
      Promise.resolve({
        articles,
        status: "ok",
      }),
    );
    const response =
      await execDatasourceTestOperation<ExecDatasourceTestOperationResponse>(QUERY_NEWS, {
        page: 1,
        language: "EN",
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
      await execDatasourceTestOperation<ExecDatasourceTestOperationResponse>(QUERY_NEWS, {
        page: 1,
        language: "EN",
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

  describe("When some error happens", () => {
    it("should return the query correctly when some is thrown during the request", async () => {
      jest
        .spyOn(RESTDataSource.prototype as any, "get")
        .mockImplementation(async () => Promise.reject());
      const response =
        await execDatasourceTestOperation<ExecDatasourceTestOperationResponse>(
          QUERY_NEWS,
          {
            page: 1,
            language: "EN",
          },
        );
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
        await execDatasourceTestOperation<ExecDatasourceTestOperationResponse>(
          QUERY_NEWS,
          {
            page: 1,
            language: "EN",
          },
        );
      const news = response.body.singleResult.data.news;
      expect(response.body.kind === "single");
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(news.hasMore).toEqual(false);
      expect(news.items).toEqual([]);
    });
  });
});
