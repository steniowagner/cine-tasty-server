import { createClient } from "redis";

import { CacheHandler, SetCacheParmas } from "../cache-handler";

type Client = ReturnType<typeof createClient>;

export default class RedisCacheHandler implements CacheHandler {
  private client: Client;

  constructor() {
    this.client = createClient();
  }

  async get<TData>(key: string) {
    try {
      const value = await this.client.get(key);
      if (!value) {
        return undefined;
      }
      return JSON.parse(value) as TData;
    } catch (err) {
      throw new Error("Error when tried to get data from Redis");
    }
  }

  async set(params: SetCacheParmas) {
    try {
      await this.client.set(params.key, JSON.stringify(params.value), {
        EX: params.expireIn,
      });
    } catch (err) {
      throw new Error(
        `Error when tried to set data into Redis: ${JSON.stringify(params)}`,
      );
    }
  }

  async init() {
    await this.client.connect();
  }
}
