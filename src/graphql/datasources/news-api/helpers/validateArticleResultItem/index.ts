import { GetArticlesResultItem } from '../../../../../types';

const validateArticleResultItem = (output: GetArticlesResultItem): boolean => {
  return Object.entries(output).every(([, value]) => !!value);
};

export default validateArticleResultItem;
