export default `#graphql
  "Describes the possible sizes of a Thumbnail"
  type Thumbnail {
    "120x90"
    extraSmall: String
    "320x180"
    small: String
    "480x360"
    medium: String
    "640x480"
    large: String
    "1280x720"
    extraLarge: String
  }

  "Describes the TV-Show/Media video"
  type MediaVideo {
    "Thumbnail data"
    thumbnail: Thumbnail
    "Youtube key used to access a video (e.g. https://www.youtube.com/watch?v=<key)>"
    key: String
    "Youtube video name"
    name: String
    "At the moment, the only possible value here is 'YouTube'"
    site: String
    "Youtube video id"
    id: ID
    "Type of the Youtube video"
    type: String
  }
`;
