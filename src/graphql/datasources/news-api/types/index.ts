type Source = {
  name: string;
  id: string;
};

export type NewsAPIResponseArticles = {
  description: string;
  content: string;
  urlToImage: string;
  author: string;
  publishedAt: string;
  source: Source;
  url: string;
  title: string;
};

export type NewsAPIResponse = {
  status: "ok" | "error";
  totalResults: number;
  articles: NewsAPIResponseArticles[];
};
