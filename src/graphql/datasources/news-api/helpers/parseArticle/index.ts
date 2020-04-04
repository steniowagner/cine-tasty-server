import { GetArticlesResultItem } from '../../../../../types';
import { Article } from '../../../../../lib/types';

const parseArticle = ({
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

export default parseArticle;
