import {
  GetPersonDetailsResult,
  GetPersonImagesResult,
  Genres,
  CastResultType,
} from '../../../../../types';
import { Person, MediaType } from '../../../../../lib/types';
import { getGenres } from '..';
import parseMovieCast from './parseMovieCast';
import parseDetails from './parseDetails';
import parseTVCast from './parseTVCast';

const parseImages = (images: GetPersonImagesResult): string[] => {
  return images.profiles.map(profile => profile.file_path);
};

const parseCast = (cast: CastResultType, genres: Genres) => {
  const castParsed = cast.map(castItem => {
    const mediaGenres = getGenres({
      mediaTypes: castItem.media_type || '',
      movieGenres: genres.movie,
      genresIds: castItem.genre_ids || [],
      tvShowGenres: genres.tv,
    });

    const mediaParsed =
      castItem.media_type === MediaType.Movie.toLowerCase()
        ? parseMovieCast(castItem, mediaGenres)
        : parseTVCast(castItem, mediaGenres);

    return mediaParsed;
  });

  return castParsed;
};

const parsePersonQueryResult = (
  details: GetPersonDetailsResult,
  genres: Genres,
  cast: CastResultType,
): Person => {
  const personCast = parseCast(cast, genres);
  const imagesGallery = parseImages(details.images);
  const personDetails = parseDetails(details);

  return {
    ...personDetails,
    imagesGallery,
    cast: personCast,
  };
};

export default parsePersonQueryResult;
