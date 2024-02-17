export default `#graphql
  "Describes the crew of a TV-Show/Movie"
  type MediaCrew {
    "Deparment in which the crew-member works (filming, acting, directing...)"
    department: String
    "Media crew-member id"
    id: Int!
    "Media crew-member job"
    job: String
    "Media crew-member name"
    name: String
    "Profile image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    profilePath: String
  }
`;
