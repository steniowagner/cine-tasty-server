import MockDate from 'mockdate';

import { makeDateParam } from './makeDateParam';

describe('Testing Helper: NewsAPI/makeDateParam', () => {
  afterEach(() => {
    MockDate.reset();
  });

  it('should return the date param correctly for "mm/DD/yyyy"', () => {
    const mockedDate = '2/21/1994';

    MockDate.set(mockedDate);

    const dateParam = makeDateParam();

    expect(dateParam).toEqual('1994-02-21');
  });

  it('should return the date param correctly for "yyyy-MM-dd"', () => {
    const mockedDate = '1994-2-21';

    MockDate.set(mockedDate);

    const dateParam = makeDateParam();

    expect(dateParam).toEqual('1994-02-21');
  });
});
