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

export const QUERY_SEARCH_TV_SHOWS = `#graphql
query SearchTVShows($input: SearchInput!) {
  searchTVShows(input: $input) {
    hasMore
    items {
      adult
      backdropPath
      genres(input: $input)
      id
      originCountry
      originalLanguage
      originalName
      overview
      popularity
      posterPath
      firstAirDate
      name
      voteAverage
      voteCount
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
    genres
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
    videos(id: $id) {
      thumbnail {
        extraSmall
        small
        medium
        large
        extraLarge
      }
      key
      name
      site
      id
      type
    }
    cast {
      adult
      character
      creditId
      id
      knownForDepartment
      name
      order
      originalName
      popularity
      profilePath
    }
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

export const QUERY_TRENDING_TV_SHOWS = `#graphql
query TrendingTVShows($language: ISO6391Language) {
  trendingTVShows {
    airingToday(language: $language) {
      backdropPath
      firstAirDate
      genres(language: $language)
      id
      name
      originCountry
      originalLanguage
      originalName
      overview
      popularity
      posterPath
      voteAverage
      voteCount
    }

    onTheAir(language: $language) {
      backdropPath
      firstAirDate
      genres(language: $language)
      id
      name
      originCountry
      originalLanguage
      originalName
      overview
      popularity
      posterPath
      voteAverage
      voteCount
    }

    popular(language: $language) {
      backdropPath
      firstAirDate
      genres(language: $language)
      id
      name
      originCountry
      originalLanguage
      originalName
      overview
      popularity
      posterPath
      voteAverage
      voteCount
    }

    topRated(language: $language) {
      backdropPath
      firstAirDate
      genres(language: $language)
      id
      name
      originCountry
      originalLanguage
      originalName
      overview
      popularity
      posterPath
      voteAverage
      voteCount
    }
  }
}
`;

export const QUERY_MOVIE_DETAILS = `#graphql
query Movie ($id: Int!, $language: ISO6391Language) {
  movie(id: $id, language: $language) {
    adult
    backdropPath
    belongsToCollection {
      id
      name
      posterPath
      backdropPath
    }
    budget
    genres
    homepage
    id
    imdbId
    originalLanguage
    originalTitle
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
    releaseDate
    revenue
    runtime
    spokenLanguages
    status
    tagline
    title
    video
    voteAverage
    voteCount
  }
}
`;

export const QUERY_TRENDING_MOVIES = `#graphql
query TrendingMovies($language: ISO6391Language) {
  trendingMovies {
    nowPlaying(language: $language) {
      adult
      backdropPath
      genres(language: $language)
      id
      originalLanguage
      originalTitle
      overview
      popularity
      posterPath
      releaseDate
      title
      video
      voteAverage
      voteCount
    }

    popular(language: $language) {
      adult
      backdropPath
      genres(language: $language)
      id
      originalLanguage
      originalTitle
      overview
      popularity
      posterPath
      releaseDate
      title
      video
      voteAverage
      voteCount
    }

    topRated(language: $language) {
      adult
      backdropPath
      genres(language: $language)
      id
      originalLanguage
      originalTitle
      overview
      popularity
      posterPath
      releaseDate
      title
      video
      voteAverage
      voteCount
    }

    upcoming(language: $language) {
      adult
      backdropPath
      genres(language: $language)
      id
      originalLanguage
      originalTitle
      overview
      popularity
      posterPath
      releaseDate
      title
      video
      voteAverage
      voteCount
    }
  }
}
`;

export const SEARCH_MOVIES_QUERY = `#graphql
query SearchMovie($input: SearchInput!) {
  searchMovies(input: $input) {
    totalResults
    totalPages
    items {
      adult
      backdropPath
      genres(input: $input)
      id
      originalLanguage
      originalTitle
      overview
      popularity
      posterPath
      releaseDate
      title
      video
      voteAverage
      voteCount
    }
    hasMore
  }
}
`;

export const MEDIA_GENRES_QUERY = `#graphql
query MediaGenres($mediaType: MediaType!, $language: ISO6391Language) {
  mediaGenres(mediaType: $mediaType, language: $language) {
    id
    name
  }
}
`;
