export const QUERY_FAMOUS = `#graphql
query Famous($id: Int!, $language: ISO6391Language) {
  famous(id: $id, language: $language) {
    biography,
    birthday,
    deathday,
    id,
    images,
    name,
    popularity,
    placeOfBirth
    profilePath
    knownForDepartment
    cast(language: $language) {
      moviesCast {
        title
        adult
        character
        id
        popularity
        overview
        title
        video
        creditId
        backdropPath
        originalLanguage
        originalTitle
        posterPath
        mediaType
        releaseDate
        voteAverage
        voteCount
        genres(language: $language)
      }
      tvShowsCast {
        backdropPath,
        character,
        creditId,
        episodeCount,
        firstAirDate,
        genres(language: $language)
        id,
        mediaType,
        name,
        originalLanguage,
        originalName,
        originCountry
        overview,
        popularity,
        posterPath,
        voteAverage,
        voteCount,
      }
    }
  }
}
`;
