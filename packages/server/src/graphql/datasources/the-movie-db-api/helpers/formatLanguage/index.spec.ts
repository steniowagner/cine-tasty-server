import { Iso6391Language } from '../../../../../lib/types';
import { formatLanguage } from '.';

describe('Helper: formatLanguage()', () => {
  it('should return en-us when no language is provided', () => {
    expect(formatLanguage()).toEqual('en-us');
  });

  it('should return en-us when null is provided', () => {
    expect(formatLanguage(null)).toEqual('en-us');
  });

  it('should return en-us when undefined is provided', () => {
    expect(formatLanguage()).toEqual('en-us');
  });

  it("should format the language in lower-case and separate it in two groups of two characters separated by a '-' when the language size is 4", () => {
    expect(formatLanguage(Iso6391Language.Ptbr)).toEqual('pt-br');
  });

  it('should format the language in lower-case when the language size is 2', () => {
    expect(formatLanguage(Iso6391Language.Nl)).toEqual('nl');
  });
});
