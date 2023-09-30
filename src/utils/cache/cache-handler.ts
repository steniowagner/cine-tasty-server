export type SetCacheParmas = {
  key: string;
  value: unknown;
  expireIn: number;
};

export interface CacheHandler {
  get: <TData>(key: string) => Promise<TData | undefined>;
  set: (params: SetCacheParmas) => Promise<void>;
  init: () => Promise<void>;
}
