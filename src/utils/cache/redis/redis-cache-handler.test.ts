import RedisCacheHandler from "./redis-cache-handler";

const mockGet = jest.fn();
const mockSet = jest.fn();
const mockConnect = jest.fn();

jest.mock("redis", () => ({
  createClient: () => ({
    get: mockGet,
    set: mockSet,
    connect: mockConnect,
  }),
}));

const key = "SOME_KEY";
const value = { key: "value" };

const setParams = {
  key,
  value,
  expireIn: 123,
};

describe("CacheHandler/RedisCacheHandler", () => {
  describe("get", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call "Redis.get" correctly', async () => {
      mockGet.mockReturnValueOnce(JSON.stringify(value));
      const redisCacheHandler = new RedisCacheHandler();
      expect(mockGet).toHaveBeenCalledTimes(0);
      await redisCacheHandler.get(key);
      expect(mockGet).toHaveBeenCalledTimes(1);
      expect(mockGet).toHaveBeenCalledWith(key);
    });

    it("should return the parsed-value when it exists", async () => {
      mockGet.mockReturnValueOnce(JSON.stringify(value));
      const redisCacheHandler = new RedisCacheHandler();
      const result = await redisCacheHandler.get(key);
      expect(result).toEqual(value);
    });

    it('should return "undefined" when the value doesnt exist', async () => {
      mockGet.mockReturnValueOnce(undefined);
      const redisCacheHandler = new RedisCacheHandler();
      const result = await redisCacheHandler.get(key);
      expect(result).toEqual(undefined);
    });

    it("should thrown an error when some error happens", async () => {
      mockGet.mockRejectedValueOnce({});
      const redisCacheHandler = new RedisCacheHandler();
      await expect(() => redisCacheHandler.get(key)).rejects.toThrow(
        "Error when tried to get data from Redis",
      );
    });
  });

  describe("set", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call "Redis.set" correctly', async () => {
      const redisCacheHandler = new RedisCacheHandler();
      expect(mockSet).toHaveBeenCalledTimes(0);
      await redisCacheHandler.set(setParams);
      expect(mockSet).toHaveBeenCalledTimes(1);
      expect(mockSet).toHaveBeenCalledWith(
        setParams.key,
        JSON.stringify(setParams.value),
        { EX: setParams.expireIn },
      );
    });

    it("should thrown an error when some error happens", async () => {
      mockSet.mockRejectedValueOnce({});
      const redisCacheHandler = new RedisCacheHandler();
      await expect(() => redisCacheHandler.set(setParams)).rejects.toThrow(
        `Error when tried to set data into Redis: ${JSON.stringify(setParams)}`,
      );
    });
  });

  describe("init", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call "Redis.connect" correctly', async () => {
      const redisCacheHandler = new RedisCacheHandler();
      expect(mockConnect).toBeCalledTimes(0);
      await redisCacheHandler.init();
      expect(mockConnect).toBeCalledTimes(1);
    });
  });
});
