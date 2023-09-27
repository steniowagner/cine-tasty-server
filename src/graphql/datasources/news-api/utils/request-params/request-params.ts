import { QueryNewsArgs } from "@generated-types";

import { languageQueryMapping, CONSTANTS } from "..";

type MakeRequestParams = QueryNewsArgs & {
  today: Date;
};

export const getRequestParams = (params: MakeRequestParams) => {
  const fromTimestamp = new Date(params.today).setDate(
    params.today.getDate() - CONSTANTS.FROM_DAYS_AGO,
  );
  return {
    from: new Date(fromTimestamp).toISOString().split("T")[0],
    q: languageQueryMapping[params.language].join(" OR "),
    to: params.today.toISOString().split("T")[0],
    sortBy: CONSTANTS.SORT_BY,
    language: params.language.toLowerCase(),
    pageSize: String(CONSTANTS.PAGE_SIZE),
    page: String(params.page),
  };
};
