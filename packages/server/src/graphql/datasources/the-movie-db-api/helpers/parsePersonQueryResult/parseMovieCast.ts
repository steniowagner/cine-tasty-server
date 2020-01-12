import { CastMovieResult } from '../../../../../types';
import { CastMovie } from '../../../../../lib/types';

const parseMovieCast = (castMovie: CastMovieResult, genres: string[]): CastMovie => ({
  originalTitle: castMovie.original_title,
  video: castMovie.video,
  title: castMovie.title,
  adult: castMovie.adult,
  releaseDate: castMovie.release_date,
  character: castMovie.character,
  backdropImage: castMovie.backdrop_path,
  overview: castMovie.overview,
  voteAverage: castMovie.vote_average,
  mediaType: castMovie.media_type,
  posterImage: castMovie.poster_path,
  popularity: castMovie.popularity,
  originalLanguage: castMovie.original_language,
  voteCount: castMovie.vote_count,
  creditId: castMovie.credit_id,
  id: castMovie.id,
  genres,
});

export default parseMovieCast;
