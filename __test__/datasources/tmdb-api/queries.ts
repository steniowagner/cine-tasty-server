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

export const QUERY_SEARCH_FAMOUS = `#graphql
query SearchFamous($input: SearchInput!) {
  searchFamous(input: $input) {
    hasMore
    items {
      name
      adult
      id
      gender
      knownForDepartment
      knownFor {
        ... on SearchFamousKnownForMovie {
          adult
          backdropPath
          id
          title
          originalLanguage
          originalTitle
          overview
          posterPath
          mediaType
          genres(input: $input)
          popularity
          releaseDate
          video
          voteAverage
          voteCount
        }

        ... on SearchFamousKnownForTVShow {
          adult
          backdropPath
          id
          name
          originalLanguage
          originalName
          overview
          posterPath
          mediaType
          genres(input: $input)
          popularity
          firstAirDate
          voteAverage
          voteCount
          originCountry
        }
      }
      name
      originalName
      popularity
      profilePath
    }
    totalPages
    totalResults
  }
}
`;

export const QUERY_TRENDING_FAMOUS = `#graphql
  query TrendingFamous($page: Int!, $language: ISO6391Language) {
  trendingFamous(page: $page, language: $language) {
    hasMore
    totalPages
    totalResults
    items {
      knownForDepartment
      profilePath
      name
      adult
      gender
      id
      name
      popularity
      knownFor {
        ... on TrendingFamousKnownForMovie {
          adult
          backdropPath
          id
          mediaType
          originalLanguage
          originalTitle
          overview
          posterPath
          releaseDate
          title
          video
          voteAverage
          voteCount
          genres(language: $language)
        }

        ... on TrendingFamousKnownForTVShow {
          backdropPath
          firstAirDate
          id
          mediaType
          name
          originCountry
          originalLanguage
          originalName
          overview
          posterPath
          voteAverage
          voteCount
          genres(language: $language)
        }
      }
    }
  }
}
`;
