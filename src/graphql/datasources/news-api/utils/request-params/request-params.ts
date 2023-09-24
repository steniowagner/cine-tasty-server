import { QueryNewsArgs, NewsLanguage } from "@generated-types";

import CONSTANTS from "../constants";

type MakeRequestParams = QueryNewsArgs & {
  today: Date;
};

const getQueryBasedInLanguage = (language: NewsLanguage) => {
  const languageQueryMappy: Record<NewsLanguage, string[]> = {
    AR: ["سينما", "أفلام", "مسلسلات تلفزيونية"],
    DE: ["Kino", "Filme", "Fernsehserien"],
    EN: ["Cinema", "Movies", "TV Series"],
    ES: ["Cine", "Películas", "Series de TV"],
    FR: ["Cinéma", "Films", "Séries télévisées"],
    HE: ["קולנוע", "סרטים", "סדרות טלוויזיה"],
    IT: ["Cinema", "Film", "Serie TV"],
    NL: ["Bioscoop", "Films", "TV-series"],
    NO: ["Kino", "Filmer", "TV-serier"],
    PT: ["Cinema", "Filmes", "Séries de TV"],
    RU: ["Кино", "Фильмы", "Телесериалы"],
    SE: ["Kinema", "Filbmat", "Televisijonseriija"],
    ZH: ["电影院", "电影", "电视剧"],
  };
  const query = languageQueryMappy[language];
  return query.join(" OR ");
};

export const getRequestParams = (params: MakeRequestParams) => {
  const fromTimestamp = new Date(params.today).setDate(
    params.today.getDate() - CONSTANTS.FROM_DAYS_AGO,
  );
  const query = getQueryBasedInLanguage(params.language);
  return {
    from: new Date(fromTimestamp).toISOString().split("T")[0],
    to: params.today.toISOString().split("T")[0],
    sortBy: CONSTANTS.SORT_BY,
    language: params.language.toLowerCase(),
    pageSize: String(CONSTANTS.PAGE_SIZE),
    page: String(params.page),
    q: query,
  };
};
