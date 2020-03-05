import { gql } from 'apollo-server';

export default gql`
  type Thumbnail {
    "120x90"
    extra_small: String
    "320x180"
    small: String
    "480x360"
    medium: String
    "640x480"
    large: String
    "1280x720"
    extra_large: String
  }

  type MediaVideo {
    thumbnail: Thumbnail
    key: String
    name: String
    site: String
    id: ID
    type: String
  }
`;
