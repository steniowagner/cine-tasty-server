 export const articleWithNullField = {
  publishedAt: null,
  urlToImage: 'urlToImage',
  source: {
    id: null,
    name: 'name',
  },
  source: 'source',
  author: 'author',
  title: 'title',
  url: 'url',
};

export const articleWithFalsyField = {
  publishedAt: '',
  urlToImage: 'urlToImage',
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
  author: 'author',
  title: 'title',
  url: 'url',
};

export const rawArticleWithId = {
  publishedAt: 'publishedAt',
  urlToImage: 'urlToImage',
  source: {
    id: 'id',
    name: 'name',
  },
  author: 'author',
  title: 'title',
  url: 'url',
};

export const articleWithURLId = {
  image: 'urlToImage',
  id: 'url',
  source: 'name',
  publishedAt: 'publishedAt',
  author: 'author',
  title: 'title',
  url: 'url',
};

export const articleWithId = {
  image: 'urlToImage',
  id: 'id',
  source: 'name',
  publishedAt: 'publishedAt',
  author: 'author',
  title: 'title',
  url: 'url',
};
