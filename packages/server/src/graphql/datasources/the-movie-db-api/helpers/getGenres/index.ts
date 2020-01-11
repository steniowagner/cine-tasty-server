import { MediaGenre } from '../../../../../types';

const MOVIE_MEDIA_TYPE = 'movie';
const TV_MEDIA_TYPE = 'tv';

interface GetGenresParams {
  tvShowGenres: MediaGenre[];
  movieGenres: MediaGenre[];
  genresIds: number[];
  mediaTypes: string;
}

const getGenres = ({
  tvShowGenres,
  movieGenres,
  genresIds,
  mediaTypes,
}: GetGenresParams): string[] => {
  const getMediaGenres = (genres: MediaGenre[], genresIds: number[]): string[] => {
    return genresIds
      .map(genreId => {
        const genre = genres.find(({ id }) => id === genreId);

        if (genre) {
          return genre.name;
        }

        return '';
      })
      .filter(genreSeleted => !!genreSeleted);
  };

  let genres: MediaGenre[] = [];

  if (mediaTypes === MOVIE_MEDIA_TYPE) {
    genres = movieGenres;
  }

  if (mediaTypes === TV_MEDIA_TYPE) {
    genres = tvShowGenres;
  }

  return getMediaGenres(genres, genresIds);
};

export default getGenres;
