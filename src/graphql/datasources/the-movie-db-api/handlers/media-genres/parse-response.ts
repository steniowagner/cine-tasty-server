import { Response } from "./media-genres.types";

export const parseResponse = (response: Response, genreIds: number[]) =>
  genreIds
    .map((genreId) => {
      const genre = response.genres.find((genre) => genre.id === genreId);
      return genre?.name;
    })
    .filter((genre) => !!genre);
