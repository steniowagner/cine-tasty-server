import { createClient } from "redis";

import { CacheHandler, SetCacheParams } from "../cache-handler";

type Client = ReturnType<typeof createClient>;

export default class RedisCacheHandler implements CacheHandler {
  private client: Client;

  constructor() {
    this.client = createClient({
      socket: {
        port: parseInt(process.env.REDIS_HOST_PORT! as string),
        host: process.env.REDIS_HOST_NAME! as string,
      },
    });
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

  async set(params: SetCacheParams) {
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
