import { NewsLanguage } from "@generated-types";

export const languageQueryMapping: Record<NewsLanguage, string[]> = {
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
