import { getRequestParams } from "./request-params";

import { NewsLanguage } from "@generated-types";

import CONSTANTS from "../constants";

const newsLanguages = Object.values(NewsLanguage);

describe("NewsAPI/getRequestParams", () => {
  test.each(newsLanguages)(
    "should return the params correctly when the language selected is %p",
    (language: NewsLanguage) => {
      const page = 1;
      const params = getRequestParams({
        today: new Date("2023-09-23"),
        language: language,
        page,
      });
      expect(params.from).toEqual("2023-09-21");
      expect(params.to).toEqual("2023-09-23");
      expect(params.sortBy).toEqual(CONSTANTS.SORT_BY);
      expect(params.language).toEqual(language.toLowerCase());
      expect(params.pageSize).toEqual(String(CONSTANTS.PAGE_SIZE));
      expect(params.page).toEqual(String(page));
      expect(typeof params.q).toEqual("string");
      expect(params.q.split(" OR ").length).toEqual(3);
    },
  );
});
