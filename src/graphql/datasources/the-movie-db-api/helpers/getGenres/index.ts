import { MediaGenre } from '../../../../../@types';

export const getGenres = (
  genresSelected: MediaGenre[],
  genresIds: number[],
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

  return getMediaGenres(genresSelected, genresIds);
};
