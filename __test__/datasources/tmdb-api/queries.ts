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

export const QUERY_TV_SHOW_DETAILS = `#graphql
query TVShow ($id: Int!, $language: ISO6391Language) {
  tvShow(id: $id, language: $language) {
    adult
    backdropPath
    createdBy{
      id
      creditId
      name
      gender
      profilePath
    }
    episodeRunTime
    firstAirDate
    genres(language: $language)
    homepage
    id
    inProduction
    languages
    lastAirDate
    lastEpisodeToAir{
      id
      name
      overview
      voteAverage
      voteCount
      airDate
      episodeNumber
      productionCode
      runtime
      seasonNumber
      showId
      stillPath
    }
    name
    nextEpisodeToAir
    networks {
      id
      logoPath
      name
      originCountry
    }
    numberOfEpisodes
    numberOfSeasons
    originCountry
    originalLanguage
    originalName,
    overview
    popularity
    posterPath
    productionCompanies {
      id
      logoPath
      name
      originCountry
    }
    productionCountries
    seasons {
      airDate
      episodeCount
      id
      name
      overview
      posterPath
      seasonNumber
      voteAverage
    }
    spokenLanguages
    status
    tagline
    type
    voteAverage
    voteCount
  }
}
`;

export const QUERY_TV_SHOW_SEASON = `#graphql
query TVShowSeason($input: TVShowSeasonInput!) {
  tvShowSeason(input: $input) {
    _id
    airDate
    episodes {
      airDate
      episodeNumber
      episodeType
      id
      crew {
        job
        department
        creditId
        adult
        gender
        id
        knownForDepartment
        name
        originalName
        popularity
        profilePath
      }
      guestStars {
        character
        creditId
        order
        adult
        gender
        id
        knownForDepartment
        name
        originalName
        popularity
        profilePath
      }
      name
      overview
      productionCode
      runtime
      seasonNumber
      showId
      stillPath
      voteAverage
      voteCount
    }
    name
    overview
    id
    posterPath
    seasonNumber
    voteAverage
  }
}
`;
