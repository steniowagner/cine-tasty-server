import { Iso6391Language } from '../../../../../lib/types';

export const getFormatedLanguage = (language?: Iso6391Language | null): string => {
  if (!language) {
    return 'en-us';
  }

  if (language.length === 4) {
    return `${language[0]}${language[1]}-${language[2]}${language[3]}`.toLowerCase();
  }

  return language.toLowerCase();
};
