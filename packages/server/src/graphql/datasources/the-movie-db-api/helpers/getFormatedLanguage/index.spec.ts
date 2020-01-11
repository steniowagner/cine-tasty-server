import { Iso6391Language } from '../../../../../lib/types';
import getFormatedLanguage from '.';

describe('[getFormatedLanguage]', () => {
  it('should return en-us when no language is provided', () => {
    expect(getFormatedLanguage()).toEqual('en-us');
  });

  it('should return en-us when null is provided', () => {
    expect(getFormatedLanguage(null)).toEqual('en-us');
  });

  it('should return en-us when undefined is provided', () => {
    expect(getFormatedLanguage()).toEqual('en-us');
  });

  it("should format the language in lower-case and separate it in two groups of two characters separated by a '-' when the language size is 4", () => {
    expect(getFormatedLanguage(Iso6391Language.Ptbr)).toEqual('pt-br');
  });

  it('should format the language in lower-case when the language size is 2', () => {
    expect(getFormatedLanguage(Iso6391Language.Nl)).toEqual('nl');
  });
});
