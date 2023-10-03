export type SetCacheParams = {
  key: string;
  value: unknown;
  expireIn: number;
};

export interface CacheHandler {
  get: <TData>(key: string) => Promise<TData | undefined>;
  set: (params: SetCacheParams) => Promise<void>;
  init: () => Promise<void>;
}
