/* eslint-disable @typescript-eslint/no-explicit-any */
import { RESTDataSource } from "@apollo/datasource-rest";

import { Famous, Iso6391Language } from "@generated-types";

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
        const response = await execDatasourceTestOperation<{ famous: Famous }>(
          queries.QUERY_FAMOUS,
          {
            id: 64,
            language: Iso6391Language.Pt,
          },
        );
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
});
