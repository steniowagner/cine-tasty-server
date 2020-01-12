import { GetPersonDetailsResult } from '../../../../../types';

const parseDetails = (person: GetPersonDetailsResult) => ({
  knownForDepartment: person.known_for_department,
  gender: person.gender,
  placeOfBirth: person.place_of_birth,
  biography: person.biography,
  profileImage: person.profile_path,
  homepage: person.homepage,
  birthday: person.birthday,
  alsoKnownAs: person.also_known_as,
  deathday: person.deathday,
  adult: person.adult,
  popularity: person.popularity,
  name: person.name,
  imbdId: person.imdb_id,
  id: person.id,
});

export default parseDetails;
