type Source = {
  name: string;
  id: string;
};

type NewsAPIResponse = {
  description: string;
  content: string;
  urlToImage: string;
  author: string;
  publishedAt: string;
  source: Source;
  url: string;
  title: string;
};

export const resolvers = {
  Query: {
    news: () => ({
      items: [
        {
          source: {
            id: null,
            name: "Lifehacker.com",
          },
          author: "Ross Johnson",
          title: "All the Netflix Original Movies Coming This Fall",
          description:
            "Netflix has released its fall line-up of original movies, and there’s a little something for everyone: These movies run the gamut from family-friendly animated comedies to dark and disturbing thrillers and documentaries. Big-name actors like Mahershala Ali, J…",
          url: "https://lifehacker.com/all-the-netflix-original-movies-coming-this-fall-1850787679",
          urlToImage:
            "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/505d81edc577ffdb8f4b43985d3231cd.png",
          publishedAt: "2023-08-30T20:00:00Z",
          content:
            "Netflix has released its fall line-up of original movies, and theres a little something for everyone: These movies run the gamut from family-friendly animated comedies to dark and disturbing thriller… [+12422 chars]",
        },
      ],
    }),
  },

  NewsArticle: {
    image: (parent: NewsAPIResponse): string | undefined | null => parent.urlToImage,
    source: (parent: NewsAPIResponse): string | undefined | null => parent.source.name,
    id: (parent: NewsAPIResponse): string | undefined | null => parent.url,
  },
};
