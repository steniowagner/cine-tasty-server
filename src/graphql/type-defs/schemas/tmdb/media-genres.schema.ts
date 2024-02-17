export default `#graphql
  "Describes the media-types: TV or Movie"
  enum MediaType {
    TV
    MOVIE
  }

  "Describes the genre of a TV-Show/Movie"
  type MediaGenre {
    "Genre-id"
    id: Int!
    "Genre name"
    name: String
  }
`;
