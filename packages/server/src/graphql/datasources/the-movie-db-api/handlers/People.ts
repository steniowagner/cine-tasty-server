import { getFormatedLanguage, getGenres } from '../helpers';
import { MediaGenre } from '../../../../types';
import {
  PeopleQueryResult,
  Person,
  Iso6391Language,
  KnownFor,
} from '../../../../lib/types';

const POPULAR_PERSON_ENDPOINT = '/person/popular';

interface RawKnownFor {
  original_language: string;
  backdrop_path: string;
  original_title?: string;
  original_name?: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  media_type: string;
  adult: boolean;
  overview: string;
  genre_ids: number[];
  vote_count: number;
  video: boolean;
  title?: string;
  name?: string;
  id: number;
}

interface RawPerson {
  popularity: number;
  known_for_department: string;
  gender: number;
  id: number;
  profile_path: string;
  adult: boolean;
  known_for: RawKnownFor[];
  name: string;
}

interface GetPopularPeopleParams {
  language: string;
  page: number;
}

interface GetPopularPeopleResults {
  results: RawPerson[];
  total_pages: number;
}

type GetRequest = (
  endpoint: string,
  params: GetPopularPeopleParams,
) => Promise<GetPopularPeopleResults>;

interface IPeople {
  getPopularPeople: (
    page: number,
    language?: Iso6391Language | null,
  ) => Promise<PeopleQueryResult>;
  tvShowGenres: MediaGenre[];
  movieGenres: MediaGenre[];
  get: GetRequest;
}

class People implements IPeople {
  tvShowGenres: MediaGenre[] = [];
  movieGenres: MediaGenre[] = [];
  get: GetRequest;

  constructor(
    execGetRequest: GetRequest,
    tvShowGenres: MediaGenre[],
    movieGenres: MediaGenre[],
  ) {
    this.tvShowGenres = tvShowGenres;
    this.movieGenres = movieGenres;
    this.get = execGetRequest;
  }

  parseResult(rawPerson: RawPerson): Person {
    const getKnowForFieldValue = (rawKnownFor: RawKnownFor[]): KnownFor[] => {
      return rawKnownFor.map(
        (item: RawKnownFor): KnownFor => ({
          originalTitle: item.original_title || item.original_name,
          originalLanguage: item.original_language,
          genres: getGenres({
            tvShowGenres: this.tvShowGenres,
            movieGenres: this.movieGenres,
            mediaTypes: item.media_type,
            genresIds: item.genre_ids,
          }),
          title: item.title || item.name,
          backdropImage: item.backdrop_path,
          releaseDate: item.release_date,
          posterImage: item.poster_path,
          voteAverage: item.vote_average,
          mediaType: item.media_type,
          isAdult: item.adult,
          overview: item.overview,
          voteCount: item.vote_count,
          id: `${item.id}`,
        }),
      );
    };

    return {
      knownForDepartment: rawPerson.known_for_department,
      knownFor: getKnowForFieldValue(rawPerson.known_for),
      profileImage: rawPerson.profile_path,
      popularity: rawPerson.popularity,
      adult: rawPerson.adult,
      name: rawPerson.name,
      gender: rawPerson.gender,
      id: `${rawPerson.id}`,
    };
  }

  async getPopularPeople(
    page: number,
    language?: Iso6391Language | null,
  ): Promise<PeopleQueryResult> {
    const { total_pages, results } = await this.get(POPULAR_PERSON_ENDPOINT, {
      language: getFormatedLanguage(language),
      page,
    });

    const people = results.map((result: RawPerson) => this.parseResult(result));

    return {
      hasMore: page < total_pages,
      items: people,
    };
  }
}

export default People;
