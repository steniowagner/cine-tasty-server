import { MediaGenre, Genres } from '../../../../../types';
import { MediaType } from '../../../../../lib/types';

const getGenres = (
  { movie, tv }: Genres,
  genresIds: number[],
  mediaType: string,
): string[] => {
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

  let genresSelected: MediaGenre[] = [];

  if (mediaType === MediaType.Movie.toLowerCase()) {
    genresSelected = movie;
  }

  if (mediaType === MediaType.Tv.toLowerCase()) {
    genresSelected = tv;
  }

  return getMediaGenres(genresSelected, genresIds);
};

export default getGenres;
