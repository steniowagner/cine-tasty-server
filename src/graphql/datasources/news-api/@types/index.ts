export interface GetArticlesResultItem {
  description?: string;
  content?: string;
  urlToImage?: string;
  author?: string;
  publishedAt?: string | null;
  source: {
    name?: string;
    id?: string | null;
  };
  url?: string;
  title?: string;
}
