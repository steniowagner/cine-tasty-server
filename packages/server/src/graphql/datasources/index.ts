import NewsAPI, { INewsAPI } from './NewsAPI';

export interface Datasource {
  dataSources: {
    news: INewsAPI;
  };
}

export default {
  news: new NewsAPI(),
};
