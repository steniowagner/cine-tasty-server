import { getPersonProfileImages } from '.';

const images = {
  profiles: [
    {
      iso_639_1: null,
      aspect_ratio: 0.70484581497797,
      vote_count: 7,
      height: 908,
      vote_average: 5.32,
      file_path: '/img1.jpg',
      width: 640,
    },
    {
      iso_639_1: null,
      aspect_ratio: 0.66666666666667,
      vote_count: 18,
      height: 900,
      vote_average: 5.292,
      file_path: '/img2.jpg',
      width: 600,
    },
  ],
};

describe('Helper: getPersonProfileImages()', () => {
  it('should get the images path correctly', () => {
    expect(getPersonProfileImages(images)).toEqual(['/img1.jpg', '/img2.jpg']);
  });
});
