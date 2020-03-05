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
}: GetArticlesResultItem): Article => {
  const { name, id } = source;

  return {
    image: urlToImage,
    id: id || url,
    source: name,
    description,
    publishedAt,
    content,
    author,
    title,
    url,
  };
};

export default parseArticle;
