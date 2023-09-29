export type SearchResponse<R> = {
  page: number;
  total_pages: number;
  total_results: number;
  results: R[];
};
