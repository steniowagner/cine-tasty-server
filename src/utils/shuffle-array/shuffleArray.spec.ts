import shuffleArray from './shuffleArray';

describe('Utils: shuffleArray', () => {
  it('should shuffle the array correctly', () => {
    const array = [1, 2, 3];

    const shuffledArray = shuffleArray<number>(array);

    expect(shuffledArray.some((item, index) => item !== array[index])).toEqual(true);
  });

  it("should preserve the original array's items type", () => {
    const array = [1, 2, 3];

    const shuffledArray = shuffleArray<number>(array);

    expect(shuffledArray.every(item => typeof item === 'number')).toEqual(true);
  });
});
