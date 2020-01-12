import { CastTVResult } from '../../../../../types';
import { CastTv } from '../../../../../lib/types';

const parseTVCast = (castTV: CastTVResult, genres: string[]): CastTv => ({
  episodeCount: castTV.episode_count,
  originCountry: castTV.origin_country || [],
  originalName: castTV.original_name,
  name: castTV.name,
  firstAirDate: castTV.first_air_date,
  character: castTV.character,
  backdropImage: castTV.backdrop_path,
  overview: castTV.overview,
  voteAverage: castTV.vote_average,
  mediaType: castTV.media_type,
  posterImage: castTV.poster_path,
  popularity: castTV.popularity,
  originalLanguage: castTV.original_language,
  voteCount: castTV.vote_count,
  creditId: castTV.credit_id,
  id: castTV.id,
  genres,
});

export default parseTVCast;
