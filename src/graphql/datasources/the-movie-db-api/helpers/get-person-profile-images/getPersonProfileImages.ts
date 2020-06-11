import { GetPersonImagesResult } from '@types';

export const getPersonProfileImages = ({ profiles }: GetPersonImagesResult): string[] => {
  return profiles.map(profile => profile.file_path);
};
