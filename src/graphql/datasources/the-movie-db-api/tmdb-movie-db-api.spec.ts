/* eslint-disable @typescript-eslint/no-explicit-any */
import { RESTDataSource } from "@apollo/datasource-rest";

import {
  Famous,
  SearchFamousResult,
  Iso6391Language,
  KnowForMovie,
  KnowForTvShow,
} from "@generated-types";

import * as queries from "../../../../__test__/datasources/tmdb-api/queries";
import * as fixtures from "../../../../__test__/datasources/tmdb-api/fixtures";
import { execDatasourceTestOperation } from "../../../../__test__";

describe("DataSources/TheMovieDBApi/Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Querying Famous", () => {
    describe("When query the data successfuly", () => {
      it("should return the data correctly", async () => {
        jest
          .spyOn(RESTDataSource.prototype as any, "get")
          .mockImplementationOnce(async () => Promise.resolve(fixtures.famous));
        jest
          .spyOn(RESTDataSource.prototype as any, "get")
          .mockImplementationOnce(async () =>
            Promise.resolve({
              cast: [fixtures.movieCast, fixtures.tvShowCast],
            }),
          );
        jest
          .spyOn(RESTDataSource.prototype as any, "get")
          .mockImplementationOnce(async () => Promise.resolve(fixtures.moviesGenres));
        jest
          .spyOn(RESTDataSource.prototype as any, "get")
          .mockImplementationOnce(async () => Promise.resolve(fixtures.tvShowGenres));
        const response = await execDatasourceTestOperation<{ famous: Famous }>({
          query: queries.QUERY_FAMOUS,
          variables: {
            id: 64,
            language: Iso6391Language.Pt,
          },
        });
        const famous = response.body.singleResult.data.famous;
        // famous
        expect(famous.biography).toEqual(fixtures.famous.biography);
        expect(famous.birthday).toEqual(fixtures.famous.birthday);
        expect(famous.deathday).toEqual(fixtures.famous.deathday);
        expect(famous.id).toEqual(fixtures.famous.id);
        expect(famous.images).toEqual(
          fixtures.famous.images.profiles.map((image) => image.file_path),
        );
        expect(famous.name).toEqual(fixtures.famous.name);
        expect(famous.popularity).toEqual(fixtures.famous.popularity);
        expect(famous.placeOfBirth).toEqual(fixtures.famous.place_of_birth);
        expect(famous.profilePath).toEqual(fixtures.famous.profile_path);
        expect(famous.knownForDepartment).toEqual(fixtures.famous.known_for_department);
        // cast-movies
        expect(famous.cast.moviesCast).toEqual([
          {
            title: fixtures.movieCast.title,
            adult: fixtures.movieCast.adult,
            character: fixtures.movieCast.character,
            id: fixtures.movieCast.id,
            popularity: fixtures.movieCast.popularity,
            overview: fixtures.movieCast.overview,
            video: fixtures.movieCast.video,
            creditId: fixtures.movieCast.credit_id,
            backdropPath: fixtures.movieCast.backdrop_path,
            originalLanguage: fixtures.movieCast.original_language,
            originalTitle: fixtures.movieCast.original_title,
            posterPath: fixtures.movieCast.poster_path,
            mediaType: fixtures.movieCast.media_type,
            releaseDate: fixtures.movieCast.release_date,
            voteAverage: fixtures.movieCast.vote_average,
            voteCount: fixtures.movieCast.vote_count,
            genres: ["Drama", "Aventura"],
          },
        ]);
        // cast tv-shows
        expect(famous.cast.tvShowsCast).toEqual([
          {
            backdropPath: fixtures.tvShowCast.backdrop_path,
            character: fixtures.tvShowCast.character,
            creditId: fixtures.tvShowCast.credit_id,
            episodeCount: fixtures.tvShowCast.episode_count,
            firstAirDate: fixtures.tvShowCast.first_air_date,
            genres: ["Talk", "Comédia"],
            id: fixtures.tvShowCast.id,
            mediaType: fixtures.tvShowCast.media_type,
            name: fixtures.tvShowCast.name,
            originalLanguage: fixtures.tvShowCast.original_language,
            originalName: fixtures.tvShowCast.original_name,
            originCountry: fixtures.tvShowCast.origin_country,
            overview: fixtures.tvShowCast.overview,
            popularity: fixtures.tvShowCast.popularity,
            posterPath: fixtures.tvShowCast.poster_path,
            voteAverage: fixtures.tvShowCast.vote_average,
            voteCount: fixtures.tvShowCast.vote_count,
          },
        ]);
      });
    });
  });

  describe("Searching for Famous", () => {
    describe("When query the data successfuly", () => {
      it("should return data correctly", async () => {
        const mockResponse = {
          results: fixtures.searchFamousResult,
          page: 1,
          total_pages: 6,
          total_results: 113,
        };
        jest
          .spyOn(RESTDataSource.prototype as any, "get")
          .mockImplementationOnce(async () => Promise.resolve(mockResponse));
        jest
          .spyOn(RESTDataSource.prototype as any, "get")
          .mockImplementationOnce(async () => Promise.resolve(fixtures.moviesGenres));
        jest
          .spyOn(RESTDataSource.prototype as any, "get")
          .mockImplementationOnce(async () => Promise.resolve(fixtures.tvShowGenres));
        const response = await execDatasourceTestOperation<{
          searchFamous: SearchFamousResult;
        }>({
          query: queries.QUERY_SEARCH_FAMOUS,
          variables: {
            input: { page: 1, query: "Wagner M", language: Iso6391Language.Pt },
          },
        });
        expect(response.body.singleResult.errors).toBeUndefined();
        const searchFamous = response.body.singleResult.data.searchFamous;
        expect(searchFamous.hasMore).toEqual(true);
        expect(searchFamous.totalPages).toEqual(mockResponse.total_pages);
        expect(searchFamous.totalResults).toEqual(mockResponse.total_results);
        // famous
        for (let i = 0; i < searchFamous.items.length; i++) {
          expect(searchFamous.items[i].name).toEqual(fixtures.searchFamousResult[i].name);
          expect(searchFamous.items[i].adult).toEqual(
            fixtures.searchFamousResult[i].adult,
          );
          expect(searchFamous.items[i].id).toEqual(fixtures.searchFamousResult[i].id);
          expect(searchFamous.items[i].gender).toEqual(
            fixtures.searchFamousResult[i].gender,
          );
          expect(searchFamous.items[i].knownForDepartment).toEqual(
            fixtures.searchFamousResult[i].known_for_department,
          );
          expect(searchFamous.items[i].originalName).toEqual(
            fixtures.searchFamousResult[i].original_name,
          );
          expect(searchFamous.items[i].popularity).toEqual(
            fixtures.searchFamousResult[i].popularity,
          );
          expect(searchFamous.items[i].profilePath).toEqual(
            fixtures.searchFamousResult[i].profile_path,
          );
        }
        // known-for-movies
        const knownForMovies = searchFamous.items[0].knownFor[1] as KnowForMovie;
        expect(knownForMovies.adult).toEqual(
          fixtures.searchFamousResult[0].known_for[1].adult,
        );
        expect(knownForMovies.backdropPath).toEqual(
          fixtures.searchFamousResult[0].known_for[1].backdrop_path,
        );
        expect(knownForMovies.id).toEqual(fixtures.searchFamousResult[0].known_for[1].id);
        expect(knownForMovies.title).toEqual(
          fixtures.searchFamousResult[0].known_for[1].title,
        );
        expect(knownForMovies.originalLanguage).toEqual(
          fixtures.searchFamousResult[0].known_for[1].original_language,
        );
        expect(knownForMovies.originalTitle).toEqual(
          fixtures.searchFamousResult[0].known_for[1].original_title,
        );
        expect(knownForMovies.overview).toEqual(
          fixtures.searchFamousResult[0].known_for[1].overview,
        );
        expect(knownForMovies.posterPath).toEqual(
          fixtures.searchFamousResult[0].known_for[1].poster_path,
        );
        expect(knownForMovies.mediaType).toEqual(
          fixtures.searchFamousResult[0].known_for[1].media_type,
        );
        expect(knownForMovies.popularity).toEqual(
          fixtures.searchFamousResult[0].known_for[1].popularity,
        );
        expect(knownForMovies.releaseDate).toEqual(
          fixtures.searchFamousResult[0].known_for[1].release_date,
        );
        expect(knownForMovies.video).toEqual(
          fixtures.searchFamousResult[0].known_for[1].video,
        );
        expect(knownForMovies.voteAverage).toEqual(
          fixtures.searchFamousResult[0].known_for[1].vote_average,
        );
        expect(knownForMovies.voteCount).toEqual(
          fixtures.searchFamousResult[0].known_for[1].vote_count,
        );
        expect(knownForMovies.genres).toEqual(["Drama", "Crime"]);
        // known-for-tv-shows
        const knownForTVShows = searchFamous.items[0].knownFor[0] as KnowForTvShow;
        expect(knownForTVShows.adult).toEqual(
          fixtures.searchFamousResult[0].known_for[0].adult,
        );
        expect(knownForTVShows.backdropPath).toEqual(
          fixtures.searchFamousResult[0].known_for[0].backdrop_path,
        );
        expect(knownForTVShows.id).toEqual(
          fixtures.searchFamousResult[0].known_for[0].id,
        );
        expect(knownForTVShows.name).toEqual(
          fixtures.searchFamousResult[0].known_for[0].name,
        );
        expect(knownForTVShows.originalLanguage).toEqual(
          fixtures.searchFamousResult[0].known_for[0].original_language,
        );
        expect(knownForTVShows.originalName).toEqual(
          fixtures.searchFamousResult[0].known_for[0].original_name,
        );
        expect(knownForTVShows.overview).toEqual(
          fixtures.searchFamousResult[0].known_for[0].overview,
        );
        expect(knownForTVShows.posterPath).toEqual(
          fixtures.searchFamousResult[0].known_for[0].poster_path,
        );
        expect(knownForTVShows.mediaType).toEqual(
          fixtures.searchFamousResult[0].known_for[0].media_type,
        );
        expect(knownForTVShows.popularity).toEqual(
          fixtures.searchFamousResult[0].known_for[0].popularity,
        );
        expect(knownForTVShows.firstAirDate).toEqual(
          fixtures.searchFamousResult[0].known_for[0].first_air_date,
        );
        expect(knownForTVShows.voteAverage).toEqual(
          fixtures.searchFamousResult[0].known_for[0].vote_average,
        );
        expect(knownForTVShows.voteCount).toEqual(
          fixtures.searchFamousResult[0].known_for[0].vote_count,
        );
        expect(knownForTVShows.originCountry).toEqual(
          fixtures.searchFamousResult[0].known_for[0].origin_country,
        );
        expect(knownForTVShows.genres).toEqual(["Crime", "Drama"]);
      });
    });
  });
});
