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
  title: string;
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
  get: GetRequest;
}

class People implements IPeople {
  get: GetRequest;

  constructor(execGetRequest: GetRequest) {
    this.get = execGetRequest;
  }

  getFormatedLanguage(language?: Iso6391Language | null): string {
    if (!language) {
      return 'en-us';
    }

    if (language.length === 4) {
      return `${language[0]}${language[1]}-${language[2]}${language[3]}`.toLowerCase();
    }

    return language.toLowerCase();
  }

  parseResult(rawPerson: RawPerson): Person {
    const getKnowForFieldValue = (rawKnownFor: RawKnownFor[]): KnownFor[] => {
      return rawKnownFor.map(
        (item: RawKnownFor): KnownFor => ({
          originalTitle: item.original_title || item.original_name || '',
          originalLanguage: item.original_language,
          backdropImage: item.backdrop_path,
          releaseDate: item.release_date,
          posterImage: item.poster_path,
          voteAverage: item.vote_average,
          mediaType: item.media_type,
          isAdult: item.adult,
          overview: item.overview,
          genreIds: item.genre_ids,
          voteCount: item.vote_count,
          title: item.title,
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
      language: this.getFormatedLanguage(language),
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
