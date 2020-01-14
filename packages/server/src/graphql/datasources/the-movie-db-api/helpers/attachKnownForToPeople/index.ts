import { MediaItem, Genres } from '../../../../../types';
import { BasePerson } from '../../../../../lib/types';
import { attachGenresToMedia } from '..';

export const attachKnownForToPeople = (
  person: BasePerson,
  mediaGenres: Genres,
): BasePerson => {
  const personKnowFor = (person.known_for as unknown) as MediaItem[];

  return {
    ...person,
    known_for: attachGenresToMedia(personKnowFor, mediaGenres),
  };
};
