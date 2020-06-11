import { GetArticlesResultItem } from '@news-api-types';
import { Article } from 'lib/types';

export const parseArticle = ({
  publishedAt,
  description,
  urlToImage,
  content,
  author,
  source,
  title,
  url,
}: GetArticlesResultItem): Article => ({
  image: urlToImage,
  source: source.name,
  description,
  publishedAt,
  content,
  id: url,
  author,
  title,
  url,
});
