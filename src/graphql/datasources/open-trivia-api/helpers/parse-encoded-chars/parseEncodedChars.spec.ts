import parseEncodedChars from './parseEncodedChars';

describe('parseEncodedChars()', () => {
  it('should receive a string with utf characters and parse it correctly', () => {
    expect(parseEncodedChars('&rsquo;')).toEqual("'");
    expect(parseEncodedChars('&#039;')).toEqual("'");
    expect(parseEncodedChars('&quot;')).toEqual('"');
    expect(parseEncodedChars('&amp;')).toEqual('&');
    expect(parseEncodedChars('&eacute;')).toEqual('é');
    expect(parseEncodedChars('The artist&rsquo;s piano')).toEqual("The artist's piano");
    expect(parseEncodedChars('Don&#039;t forget that')).toEqual("Don't forget that");
    expect(parseEncodedChars('Me&amp;You')).toEqual('Me&You');
    expect(parseEncodedChars('Me &amp; You')).toEqual('Me & You');
    expect(parseEncodedChars('P&eacute; de Moleque')).toEqual('Pé de Moleque');
    expect(parseEncodedChars('Boy&rsquo;s pants')).toEqual("Boy's pants");
    expect(parseEncodedChars('Meaning &quot;this&quot;?')).toEqual('Meaning "this"?');
    expect(parseEncodedChars('Haven&#039;t you?')).toEqual("Haven't you?");
    expect(parseEncodedChars('&#039;Oro')).toEqual("'Oro");
    expect(parseEncodedChars('Twi&#039;lek')).toEqual("Twi'lek");
    expect(parseEncodedChars('I can&#039;t today')).toEqual("I can't today");
    expect(parseEncodedChars('Can&#039;t be done')).toEqual("Can't be done");
    expect(parseEncodedChars('Destiny&#039;s mind')).toEqual("Destiny's mind");
    expect(parseEncodedChars('Reggae Fils-Aim&eacute;')).toEqual('Reggae Fils-Aimé');
    expect(parseEncodedChars('Yo Wife Handcuffin&#039; Me')).toEqual(
      "Yo Wife Handcuffin' Me",
    );
    expect(parseEncodedChars('You&#039;ll, Don&#039;t you agree?')).toEqual(
      "You'll, Don't you agree?",
    );
    expect(parseEncodedChars('The girl&rsquo;s doll')).toEqual("The girl's doll");
  });
});
