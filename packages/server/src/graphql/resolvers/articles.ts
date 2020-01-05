const resolvers = {
  Query: {
    articles: () => ({
      url: 'url',
      title: 'title',
    }),
  },
};

export default resolvers;
