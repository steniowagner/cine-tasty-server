export { MovieVideosArgs as Params } from "@generated-types";

export type Result = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type Response = {
  id: number;
  results: Result[];
};
