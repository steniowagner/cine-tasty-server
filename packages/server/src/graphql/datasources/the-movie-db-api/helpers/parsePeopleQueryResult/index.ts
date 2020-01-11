import { PeopleQueryItem, KnownFor } from '../../../../../lib/types';
import { RawKnownFor, RawPerson, Genres } from '../../../../../types';
import { getGenres } from '..';

const parsePeopleResult = (rawPerson: RawPerson, genres: Genres): PeopleQueryItem => {
  const { movie, tv } = genres;

  const getKnowForFieldValue = (rawKnownFor: RawKnownFor[]): KnownFor[] => {
    return rawKnownFor.map(
      (item: RawKnownFor): KnownFor => ({
        originalTitle: item.original_title || item.original_name,
        originalLanguage: item.original_language,
        genres: getGenres({
          tvShowGenres: tv,
          movieGenres: movie,
          mediaTypes: item.media_type,
          genresIds: item.genre_ids,
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
    knownForDepartment: rawPerson.known_for_department,
    knownFor: getKnowForFieldValue(rawPerson.known_for),
    profileImage: rawPerson.profile_path,
    popularity: rawPerson.popularity,
    adult: rawPerson.adult,
    name: rawPerson.name,
    gender: rawPerson.gender,
    id: `${rawPerson.id}`,
  };
};

export default parsePeopleResult;
