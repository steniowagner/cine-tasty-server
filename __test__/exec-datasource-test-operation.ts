/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloServer } from "@apollo/server";

import OpenTriviaAPI from "@open-trivia-api/open-trivia-api";
import resolvers from "@/graphql/resolvers";
import typeDefs from "@/graphql/type-defs";
import NewsAPI from "@news-api/news-api";
import TMDBApi from "@tmdb-api/tmdb-movie-db-api";

import { Context } from "@types";
import { SetCacheParmas, CacheHandler } from "@/utils";

type ExecuteOperationResponse<TData> = {
  body: {
    kind: string;
    singleResult: {
      data: TData;
      errors: unknown;
    };
  };
};

export class MockCacheHandler implements CacheHandler {
  async get(_key: string) {
    return Promise.resolve(undefined);
  }

  async set(_params: SetCacheParmas) {
    return Promise.resolve(undefined);
  }

  async init() {
    return Promise.resolve();
  }
}

export const execDatasourceTestOperation = async <TResult>(
  query: string,
  variables: Record<string, unknown>,
) => {
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
  });
  const response = await server.executeOperation(
    {
      query,
      variables,
    },
    {
      contextValue: {
        cacheHandler: new MockCacheHandler(),
        openTriviaAPI: new OpenTriviaAPI(),
        newsAPI: new NewsAPI(new Date()),
        tmdbAPI: new TMDBApi(),
      },
    },
  );
  return response as ExecuteOperationResponse<TResult>;
};
