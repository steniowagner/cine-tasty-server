import { PeopleQueryItem, KnownFor } from '../../../../../lib/types';
import { KnownForResult, BasePersonResponse, Genres } from '../../../../../types';
import { getGenres } from '..';

const parsePeopleResult = (
  personQueryResult: BasePersonResponse,
  genres: Genres,
): PeopleQueryItem => {
  const { movie, tv } = genres;

  const getKnowForFieldValue = (knownForResult: KnownForResult[]): KnownFor[] => {
    return knownForResult.map(
      (item: KnownForResult): KnownFor => ({
        originalTitle: item.original_title || item.original_name,
        originalLanguage: item.original_language,
        genres: getGenres({
          tvShowGenres: tv,
          movieGenres: movie,
          mediaTypes: item.media_type || '',
          genresIds: item.genre_ids || [],
        }),
        title: item.title || item.name,
        backdropImage: item.backdrop_path,
        releaseDate: item.release_date,
        posterImage: item.poster_path,
        voteAverage: item.vote_average,
        mediaType: item.media_type,
        isAdult: item.adult,
        overview: item.overview,
        voteCount: item.vote_count,
        id: `${item.id}`,
      }),
    );
  };

  return {
    knownForDepartment: personQueryResult.known_for_department,
    knownFor: getKnowForFieldValue(personQueryResult.known_for || []),
    profileImage: personQueryResult.profile_path,
    popularity: personQueryResult.popularity,
    adult: personQueryResult.adult,
    name: personQueryResult.name,
    gender: personQueryResult.gender,
    id: `${personQueryResult.id}`,
  };
};

export default parsePeopleResult;
