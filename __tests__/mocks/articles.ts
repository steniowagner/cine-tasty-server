import { Article } from '../../src/lib/types';

export const articleWithNullField = {
  publishedAt: null,
  urlToImage: 'urlToImage',
  content: 'content',
  source: {
    id: null,
    name: 'name',
  },
  author: 'author',
  title: 'title',
  url: 'url',
};

export const articleWithFalsyField = {
  publishedAt: '',
  urlToImage: 'urlToImage',
  content: 'content',
  source: {
    id: null,
    name: 'name',
  },
  author: 'author',
  title: 'title',
  url: 'url',
};

export const rawArticleWithNullId = {
  publishedAt: 'publishedAt',
  urlToImage: 'urlToImage',
  source: {
    id: null,
    name: 'name',
  },
  content: 'content',
  author: 'author',
  title: 'title',
  url: 'url',
};

export const rawArticleWithId = {
  publishedAt: 'publishedAt',
  urlToImage: 'urlToImage',
  content: 'content',
  source: {
    id: 'id',
    name: 'name',
  },
  author: 'author',
  title: 'title',
  url: 'url',
};

export const articleWithURLId: Article = {
  image: 'urlToImage',
  id: 'url',
  source: 'name',
  content: 'content',
  publishedAt: 'publishedAt',
  author: 'author',
  title: 'title',
  url: 'url',
};

export const articleWithId: Article = {
  image: 'urlToImage',
  id: 'url',
  source: 'name',
  content: 'content',
  publishedAt: 'publishedAt',
  author: 'author',
  title: 'title',
  url: 'url',
};
