import {
  GetPersonCastResultType,
  GetPersonDetailsResult,
  GetPersonImagesResult,
  Genres,
} from '../../../../../types';
import { Person, Cast } from '../../../../../lib/types';
import { getGenres } from '..';

const parseDetails = (person: GetPersonDetailsResult) => ({
  knownForDepartment: person.known_for_department,
  alsoKnownAs: person.also_known_as,
  placeOfBirth: person.place_of_birth,
  profileImage: person.profile_path,
  biography: person.biography,
  popularity: person.popularity,
  homepage: person.homepage,
  birthday: person.birthday,
  deathday: person.deathday,
  imbdId: person.imdb_id,
  gender: person.gender,
  adult: person.adult,
  name: person.name,
  id: person.id,
});

const parseImages = (images: GetPersonImagesResult): string[] => {
  return images.profiles.map(profile => profile.file_path);
};

const parseCast = (cast: GetPersonCastResultType, genres: Genres): Cast => ({
  originalLanguage: cast.original_language,
  originalTitle: cast.original_title,
  backdropImage: cast.backdrop_path,
  voteAvarage: cast.vote_average,
  releaseDate: cast.release_date,
  genres: getGenres({
    tvShowGenres: genres.tv,
    movieGenres: genres.movie,
    genresIds: cast.genre_ids,
    mediaTypes: cast.media_type,
  }),
  popularity: cast.popularity,
  voteCount: cast.vote_count,
  mediaType: cast.media_type,
  character: cast.character,
  creditId: cast.credit_id,
  poster: cast.poster_path,
  overview: cast.overview,
  video: cast.video,
  adult: cast.adult,
  title: cast.title,
  id: cast.id,
});

interface Params {
  cast: GetPersonCastResultType[];
  details: GetPersonDetailsResult;
  images: GetPersonImagesResult;
  genres: Genres;
}

const parsePersonQueryResult = ({ details, genres, images, cast }: Params): Person => {
  const personCast = cast.map(castDetail => parseCast(castDetail, genres));
  const personDetails = parseDetails(details);
  const imagesGallery = parseImages(images);

  return {
    ...personDetails,
    imagesGallery,
    cast: personCast,
  };
};

export default parsePersonQueryResult;
