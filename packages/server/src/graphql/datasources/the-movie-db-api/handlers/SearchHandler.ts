import { SearchQueryEmpty } from '../../../../errors';
import { Genres } from '../../../../types';
import {
  SearchResultItem,
  SearchResult,
  QuerySearchArgs,
  SearchType,
  BasePerson,
  Iso6391Language,
} from '../../../../lib/types';
import { attachKnownForToPeople, attachGenresToMedia } from '../helpers';

type SearchParams = {
  page: number;
  query: string;
  language: string;
};

type GetRequestResult = {
  results?: SearchResultItem[];
  total_results?: number;
  total_pages?: number;
  page?: number;
};

type GetRequest = <SearchParams, GetRequestResult>(
  endpoint: string,
  params: SearchParams,
  language?: Iso6391Language | null,
) => Promise<GetRequestResult>;

export interface Props {
  search: (params: QuerySearchArgs, mediaGenres: Genres) => Promise<SearchResult>;
  get: GetRequest;
}

const BASE_ENDPOINT = '/search';

class SearchHandler implements Props {
  get: GetRequest;

  constructor(execGetRequest: GetRequest) {
    this.get = execGetRequest;
  }

  attachKnownForToPeopleResult(people: BasePerson[], mediaGenres: Genres): BasePerson[] {
    return people.map(person => attachKnownForToPeople(person, mediaGenres));
  }

  async search(params: QuerySearchArgs, mediaGenres: Genres): Promise<SearchResult> {
    const endpoint = `${BASE_ENDPOINT}/${params.type.toLowerCase()}`;

    if (!params.query) {
      throw new SearchQueryEmpty();
    }

    const {
      total_results: totalResults,
      results,
      total_pages: totalPages,
      page,
    } = await this.get(
      endpoint,
      {
        page: params.page,
        query: params.query,
      },
      params.language,
    );

    const result =
      params.type.toLowerCase() === SearchType.Person.toLowerCase()
        ? this.attachKnownForToPeopleResult(results, mediaGenres)
        : attachGenresToMedia(results, mediaGenres, params.type);

    return {
      hasMore: page < totalPages,
      total_results: totalResults,
      items: result,
    };
  }
}

export default SearchHandler;
