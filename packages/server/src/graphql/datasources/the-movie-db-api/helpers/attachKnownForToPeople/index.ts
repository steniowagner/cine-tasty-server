import attachGenresToMedia from '../attachGenresToMedia';
import { BasePerson } from '../../../../../lib/types';
import { MediaItem, Genres } from '../../../../../types';

const attachKnownForToPeople = (person: BasePerson, mediaGenres: Genres): BasePerson => {
  const personKnowFor = (person.known_for as unknown) as MediaItem[];

  return {
    ...person,
    known_for: attachGenresToMedia(personKnowFor, mediaGenres),
  };
};

export default attachKnownForToPeople;
