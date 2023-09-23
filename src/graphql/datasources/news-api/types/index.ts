type Source = {
  name: string;
  id: string;
};

export type NewsAPIResponse = {
  description: string;
  content: string;
  urlToImage: string;
  author: string;
  publishedAt: string;
  source: Source;
  url: string;
  title: string;
};
