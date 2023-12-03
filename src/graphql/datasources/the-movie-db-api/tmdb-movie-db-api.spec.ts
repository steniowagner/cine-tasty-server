/* eslint-disable @typescript-eslint/no-explicit-any */
import { RESTDataSource } from "@apollo/datasource-rest";

import {
  Famous,
  SearchFamousResult,
  SearchTvShowsResult,
  Iso6391Language,
  SearchFamousKnownForMovie,
  SearchFamousKnownForTvShow,
  TrendingFamousResult,
  TrendingFamousKnownForMovie,
  TrendingFamousKnownForTvShow,
  TvShow,
  TvShowSeason,
  TrendingTvShows,
  TrendingTvShow,
  Movie,
  TrendingMovies,
  TrendingMovie,
  SearchMoviesResult,
  MediaType,
  MediaGenre,
} from "@generated-types";

import * as queries from "../../../../__test__/datasources/tmdb-api/queries";
import * as fixtures from "../../../../__test__/datasources/tmdb-api/fixtures";
import { execDatasourceTestOperation } from "../../../../__test__";
import { YOUTUBE_THUMBNAIL_URL } from "../../resolvers/media-videos.resolvers";

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

  describe("Trending", () => {
    describe("Famous", () => {
      describe("When query the data successfuly", () => {
        it("should return data correctly", async () => {
          jest
            .spyOn(RESTDataSource.prototype as any, "get")
            .mockImplementationOnce(async () => Promise.resolve(fixtures.trendingFamous));
          jest
            .spyOn(RESTDataSource.prototype as any, "get")
            .mockImplementationOnce(async () => Promise.resolve(fixtures.moviesGenres));
          jest
            .spyOn(RESTDataSource.prototype as any, "get")
            .mockImplementationOnce(async () => Promise.resolve(fixtures.tvShowGenres));
          const response = await execDatasourceTestOperation<{
            trendingFamous: TrendingFamousResult;
          }>({
            query: queries.QUERY_TRENDING_FAMOUS,
            variables: {
              page: 1,
              language: Iso6391Language.Pt,
            },
          });
          expect(response.body.singleResult.errors).toBeUndefined();
          const trendingFamous = response.body.singleResult.data.trendingFamous;
          expect(trendingFamous.hasMore).toEqual(true);
          expect(trendingFamous.totalPages).toEqual(fixtures.trendingFamous.total_pages);
          expect(trendingFamous.totalResults).toEqual(
            fixtures.trendingFamous.total_results,
          );
          // famous
          for (let i = 0; i < trendingFamous.items.length; i++) {
            const famous = trendingFamous.items[i];
            const fixtureFamous = fixtures.trendingFamous.results[i];
            expect(famous.adult).toEqual(fixtureFamous.adult);
            expect(famous.gender).toEqual(fixtureFamous.gender);
            expect(famous.id).toEqual(fixtureFamous.id);
            expect(famous.name).toEqual(fixtureFamous.name);
            expect(famous.knownForDepartment).toEqual(fixtureFamous.known_for_department);
            expect(famous.profilePath).toEqual(fixtureFamous.profile_path);
            expect(famous.popularity).toEqual(fixtureFamous.popularity);
            // known-for
            for (let j = 0; j < famous.knownFor.length; j++) {
              if (famous.knownFor[j].mediaType === "movie") {
                const knownForMovie = famous.knownFor[j] as TrendingFamousKnownForMovie;
                expect(knownForMovie.adult).toEqual(fixtureFamous.known_for[j].adult);
                expect(knownForMovie.backdropPath).toEqual(
                  fixtureFamous.known_for[j].backdrop_path,
                );
                expect(knownForMovie.genres).toEqual([
                  "Drama",
                  "Ação",
                  "Crime",
                  "Thriller",
                ]);
                expect(knownForMovie.id).toEqual(fixtureFamous.known_for[j].id);
                expect(knownForMovie.mediaType).toEqual(
                  fixtureFamous.known_for[j].media_type,
                );
                expect(knownForMovie.originalLanguage).toEqual(
                  fixtureFamous.known_for[j].original_language,
                );
                expect(knownForMovie.originalTitle).toEqual(
                  fixtureFamous.known_for[j].original_title,
                );
                expect(knownForMovie.overview).toEqual(
                  fixtureFamous.known_for[j].overview,
                );
                expect(knownForMovie.posterPath).toEqual(
                  fixtureFamous.known_for[j].poster_path,
                );
                expect(knownForMovie.releaseDate).toEqual(
                  fixtureFamous.known_for[j].release_date,
                );
                expect(knownForMovie.title).toEqual(fixtureFamous.known_for[j].title);
                expect(knownForMovie.video).toEqual(fixtureFamous.known_for[j].video);
                expect(knownForMovie.voteAverage).toEqual(
                  fixtureFamous.known_for[j].vote_average,
                );
                expect(knownForMovie.voteCount).toEqual(
                  fixtureFamous.known_for[j].vote_count,
                );
              } else {
                const knownForTVShow = famous.knownFor[j] as TrendingFamousKnownForTvShow;
                expect(knownForTVShow.backdropPath).toEqual(
                  fixtureFamous.known_for[j].backdrop_path,
                );
                expect(knownForTVShow.firstAirDate).toEqual(
                  fixtureFamous.known_for[j].first_air_date,
                );
                expect(knownForTVShow.id).toEqual(fixtureFamous.known_for[j].id);
                expect(knownForTVShow.genres).toEqual([
                  "Action & Adventure",
                  "Sci-Fi & Fantasy",
                ]);
                expect(knownForTVShow.mediaType).toEqual(
                  fixtureFamous.known_for[j].media_type,
                );
                expect(knownForTVShow.name).toEqual(fixtureFamous.known_for[j].name);
                expect(knownForTVShow.originCountry).toEqual(
                  fixtureFamous.known_for[j].origin_country,
                );
                expect(knownForTVShow.originalLanguage).toEqual(
                  fixtureFamous.known_for[j].original_language,
                );
                expect(knownForTVShow.originalName).toEqual(
                  fixtureFamous.known_for[j].original_name,
                );
                expect(knownForTVShow.overview).toEqual(
                  fixtureFamous.known_for[j].overview,
                );
                expect(knownForTVShow.posterPath).toEqual(
                  fixtureFamous.known_for[j].poster_path,
                );
                expect(knownForTVShow.voteAverage).toEqual(
                  fixtureFamous.known_for[j].vote_average,
                );
                expect(knownForTVShow.voteCount).toEqual(
                  fixtureFamous.known_for[j].vote_count,
                );
              }
            }
          }
        });
      });
    });

    describe("TV-Shows", () => {
      describe("When query the data successfuly", () => {
        it("should return data correctly", async () => {
          jest
            .spyOn(RESTDataSource.prototype as any, "get")
            .mockImplementationOnce(async () => Promise.resolve(fixtures.trendingTVShow));
          jest
            .spyOn(RESTDataSource.prototype as any, "get")
            .mockImplementationOnce(async () => Promise.resolve(fixtures.trendingTVShow));
          jest
            .spyOn(RESTDataSource.prototype as any, "get")
            .mockImplementationOnce(async () => Promise.resolve(fixtures.trendingTVShow));
          jest
            .spyOn(RESTDataSource.prototype as any, "get")
            .mockImplementationOnce(async () => Promise.resolve(fixtures.trendingTVShow));
          jest
            .spyOn(RESTDataSource.prototype as any, "get")
            .mockImplementation(async () => Promise.resolve(fixtures.tvShowGenres));
          const response = await execDatasourceTestOperation<{
            trendingTVShows: TrendingTvShows;
          }>({
            query: queries.QUERY_TRENDING_TV_SHOWS,
            variables: {
              language: "pt",
            },
          });
          expect(response.body.singleResult.errors).toBeUndefined();
          const trendingTVShows = response.body.singleResult.data.trendingTVShows;
          const trends = Object.keys(trendingTVShows);
          const rawTrending = fixtures.trendingTVShow.results;
          for (let i = 0; i < trends.length; i++) {
            const trending = trendingTVShows[
              trends[i] as keyof TrendingTvShows
            ] as TrendingTvShow[];
            for (let j = 0; j < trending!.length; j++) {
              expect(trending[j].backdropPath).toEqual(rawTrending[j].backdrop_path);
              expect(trending[j].firstAirDate).toEqual(rawTrending[j].first_air_date);
              expect(trending[j].id).toEqual(rawTrending[j].id);
              expect(trending[j].name).toEqual(rawTrending[j].name);
              expect(trending[j].originCountry).toEqual(rawTrending[j].origin_country);
              expect(trending[j].originalLanguage).toEqual(
                rawTrending[j].original_language,
              );
              expect(trending[j].originalName).toEqual(rawTrending[j].original_name);
              expect(trending[j].overview).toEqual(rawTrending[j].overview);
              expect(trending[j].popularity).toEqual(rawTrending[j].popularity);
              expect(trending[j].posterPath).toEqual(rawTrending[j].poster_path);
              expect(trending[j].voteAverage).toEqual(rawTrending[j].vote_average);
              expect(trending[j].voteCount).toEqual(rawTrending[j].vote_count);
              expect(trending[j].genres).toEqual(
                rawTrending[j].genre_ids
                  .map((genre_id) =>
                    fixtures.tvShowGenres.genres.find((genre) => genre.id === genre_id),
                  )
                  .map((genre) => genre?.name),
              );
            }
          }
        });
      });
    });

    describe("Movies", () => {
      describe("When query the data successfuly", () => {
        it("should return data correctly", async () => {
          jest
            .spyOn(RESTDataSource.prototype as any, "get")
            .mockImplementationOnce(async () => Promise.resolve(fixtures.trendingMovie));
          jest
            .spyOn(RESTDataSource.prototype as any, "get")
            .mockImplementationOnce(async () => Promise.resolve(fixtures.trendingMovie));
          jest
            .spyOn(RESTDataSource.prototype as any, "get")
            .mockImplementationOnce(async () => Promise.resolve(fixtures.trendingMovie));
          jest
            .spyOn(RESTDataSource.prototype as any, "get")
            .mockImplementationOnce(async () => Promise.resolve(fixtures.trendingMovie));
          jest
            .spyOn(RESTDataSource.prototype as any, "get")
            .mockImplementation(async () => Promise.resolve(fixtures.moviesGenres));
          const response = await execDatasourceTestOperation<{
            trendingMovies: TrendingMovies;
          }>({
            query: queries.QUERY_TRENDING_MOVIES,
            variables: {
              language: "pt",
            },
          });
          expect(response.body.singleResult.errors).toBeUndefined();
          const trendingMovies = response.body.singleResult.data.trendingMovies;
          const trends = Object.keys(trendingMovies);
          const rawTrending = fixtures.trendingMovie.results;
          for (let i = 0; i < trends.length; i++) {
            const trend = trendingMovies[
              trends[i] as keyof typeof trendingMovies
            ] as TrendingMovie[];
            expect(trend[i].adult).toEqual(rawTrending[i].adult);
            expect(trend[i].backdropPath).toEqual(rawTrending[i].backdrop_path);
            expect(trend[i].genres).toEqual(
              rawTrending[i].genre_ids
                .map((genre_id) =>
                  fixtures.moviesGenres.genres.find((genre) => genre.id === genre_id),
                )
                .map((genre) => genre?.name),
            );
            expect(trend[i].id).toEqual(rawTrending[i].id);
            expect(trend[i].originalLanguage).toEqual(rawTrending[i].original_language);
            expect(trend[i].originalTitle).toEqual(rawTrending[i].original_title);
            expect(trend[i].overview).toEqual(rawTrending[i].overview);
            expect(trend[i].popularity).toEqual(rawTrending[i].popularity);

            expect(trend[i].posterPath).toEqual(rawTrending[i].poster_path);
            expect(trend[i].releaseDate).toEqual(rawTrending[i].release_date);
            expect(trend[i].title).toEqual(rawTrending[i].title);
            expect(trend[i].video).toEqual(rawTrending[i].video);
            expect(trend[i].voteAverage).toEqual(rawTrending[i].vote_average);
            expect(trend[i].voteCount).toEqual(rawTrending[i].vote_count);
          }
        });
      });
    });
  });

  describe("TV-Show details", () => {
    describe("When query the data successfuly", () => {
      it("should return data correctly", async () => {
        jest
          .spyOn(RESTDataSource.prototype as any, "get")
          .mockImplementationOnce(async () => Promise.resolve(fixtures.tvShow));
        jest
          .spyOn(RESTDataSource.prototype as any, "get")
          .mockImplementationOnce(async () => Promise.resolve(fixtures.tvShowVideos));
        const response = await execDatasourceTestOperation<{
          tvShow: TvShow;
        }>({
          query: queries.QUERY_TV_SHOW_DETAILS,
          variables: {
            id: 111110,
            language: Iso6391Language.Pt,
          },
        });
        expect(response.body.singleResult.errors).toBeUndefined();
        const tvshow = response.body.singleResult.data.tvShow;
        // tvshow
        expect(tvshow.adult).toEqual(fixtures.tvShow.adult);
        expect(tvshow.backdropPath).toEqual(fixtures.tvShow.backdrop_path);
        // created-by
        for (let i = 0; i < tvshow.createdBy.length; i++) {
          expect(tvshow.createdBy[i].id).toEqual(fixtures.tvShow.created_by[i].id);
          expect(tvshow.createdBy[i].creditId).toEqual(
            fixtures.tvShow.created_by[i].credit_id,
          );
          expect(tvshow.createdBy[i].name).toEqual(fixtures.tvShow.created_by[i].name);
          expect(tvshow.createdBy[i].gender).toEqual(
            fixtures.tvShow.created_by[i].gender,
          );
          expect(tvshow.createdBy[i].profilePath).toEqual(
            fixtures.tvShow.created_by[i].profile_path,
          );
        }
        expect(tvshow.episodeRunTime).toEqual(fixtures.tvShow.episode_run_time);
        expect(tvshow.firstAirDate).toEqual(fixtures.tvShow.first_air_date);
        expect(tvshow.genres).toEqual(["Action & Adventure", "Sci-Fi & Fantasy"]);
        expect(tvshow.homepage).toEqual(fixtures.tvShow.homepage);
        expect(tvshow.id).toEqual(fixtures.tvShow.id);
        expect(tvshow.inProduction).toEqual(fixtures.tvShow.in_production);
        expect(tvshow.languages).toEqual(fixtures.tvShow.languages);
        expect(tvshow.lastAirDate).toEqual(fixtures.tvShow.last_air_date);
        // last-episode-to-air
        expect(tvshow.lastEpisodeToAir).toEqual({
          id: fixtures.tvShow.last_episode_to_air.id,
          name: fixtures.tvShow.last_episode_to_air.name,
          overview: fixtures.tvShow.last_episode_to_air.overview,
          voteAverage: fixtures.tvShow.last_episode_to_air.vote_average,
          voteCount: fixtures.tvShow.last_episode_to_air.vote_count,
          airDate: fixtures.tvShow.last_episode_to_air.air_date,
          episodeNumber: fixtures.tvShow.last_episode_to_air.episode_number,
          productionCode: fixtures.tvShow.last_episode_to_air.production_code,
          runtime: fixtures.tvShow.last_episode_to_air.runtime,
          seasonNumber: fixtures.tvShow.last_episode_to_air.season_number,
          showId: fixtures.tvShow.last_episode_to_air.show_id,
          stillPath: fixtures.tvShow.last_episode_to_air.still_path,
        });
        expect(tvshow.name).toEqual(fixtures.tvShow.name);
        expect(tvshow.nextEpisodeToAir).toEqual(fixtures.tvShow.next_episode_to_air);
        // networks
        for (let i = 0; i < tvshow.networks.length; i++) {
          expect(tvshow.networks[i]).toEqual({
            id: fixtures.tvShow.networks[i].id,
            logoPath: fixtures.tvShow.networks[i].logo_path,
            name: fixtures.tvShow.networks[i].name,
            originCountry: fixtures.tvShow.networks[i].origin_country,
          });
        }
        expect(tvshow.numberOfEpisodes).toEqual(fixtures.tvShow.number_of_episodes);
        expect(tvshow.numberOfSeasons).toEqual(fixtures.tvShow.number_of_seasons);
        expect(tvshow.originCountry).toEqual(fixtures.tvShow.origin_country);
        expect(tvshow.originalLanguage).toEqual(fixtures.tvShow.original_language);
        expect(tvshow.originalName).toEqual(fixtures.tvShow.original_name);
        expect(tvshow.overview).toEqual(fixtures.tvShow.overview);
        expect(tvshow.popularity).toEqual(fixtures.tvShow.popularity);
        expect(tvshow.posterPath).toEqual(fixtures.tvShow.poster_path);
        // production-companies
        for (let i = 0; i < tvshow.productionCompanies.length; i++) {
          expect(tvshow.productionCompanies[i]).toEqual({
            id: fixtures.tvShow.production_companies[i].id,
            logoPath: fixtures.tvShow.production_companies[i].logo_path,
            name: fixtures.tvShow.production_companies[i].name,
            originCountry: fixtures.tvShow.production_companies[i].origin_country,
          });
        }
        // production-coutries
        for (let i = 0; i < tvshow.productionCountries.length; i++) {
          expect(tvshow.productionCountries[i]).toEqual(
            fixtures.tvShow.production_countries[i].name,
          );
        }
        // seasons
        for (let i = 0; i < tvshow.seasons.length; i++) {
          expect(tvshow.seasons[i]).toEqual({
            airDate: fixtures.tvShow.seasons[i].air_date,
            episodeCount: fixtures.tvShow.seasons[i].episode_count,
            id: fixtures.tvShow.seasons[i].id,
            name: fixtures.tvShow.seasons[i].name,
            overview: fixtures.tvShow.seasons[i].overview,
            posterPath: fixtures.tvShow.seasons[i].poster_path,
            seasonNumber: fixtures.tvShow.seasons[i].season_number,
            voteAverage: fixtures.tvShow.seasons[i].vote_average,
          });
        }
        expect(tvshow.spokenLanguages).toEqual(["English"]);
        expect(tvshow.status).toEqual(fixtures.tvShow.status);
        expect(tvshow.tagline).toEqual(fixtures.tvShow.tagline);
        expect(tvshow.type).toEqual(fixtures.tvShow.type);
        expect(tvshow.voteAverage).toEqual(fixtures.tvShow.vote_average);
        expect(tvshow.voteCount).toEqual(fixtures.tvShow.vote_count);
        // videos
        for (let i = 0; i < tvshow.videos.length; i++) {
          expect(tvshow.videos[i].thumbnail).toEqual({
            extraSmall: `${YOUTUBE_THUMBNAIL_URL}/${fixtures.tvShowVideos.results[0].key}/default.jpg`,
            small: `${YOUTUBE_THUMBNAIL_URL}/${fixtures.tvShowVideos.results[0].key}/mqdefault.jpg`,
            medium: `${YOUTUBE_THUMBNAIL_URL}/${fixtures.tvShowVideos.results[0].key}/hqdefault.jpg`,
            large: `${YOUTUBE_THUMBNAIL_URL}/${fixtures.tvShowVideos.results[0].key}/sddefault.jpg`,
            extraLarge: `${YOUTUBE_THUMBNAIL_URL}/${fixtures.tvShowVideos.results[0].key}/maxresdefault.jpg`,
          });
          expect(tvshow.videos[i].key).toEqual(fixtures.tvShowVideos.results[0].key);
          expect(tvshow.videos[i].name).toEqual(fixtures.tvShowVideos.results[0].name);
          expect(tvshow.videos[i].site).toEqual(fixtures.tvShowVideos.results[0].site);
          expect(tvshow.videos[i].id).toEqual(fixtures.tvShowVideos.results[0].id);
          expect(tvshow.videos[i].type).toEqual(fixtures.tvShowVideos.results[0].type);
        }
        // cast
        for (let i = 0; i < tvshow.cast.length; i++) {
          expect(tvshow.cast[i].adult).toEqual(fixtures.tvShow.credits.cast[i].adult);
          expect(tvshow.cast[i].id).toEqual(fixtures.tvShow.credits.cast[i].id);
          expect(tvshow.cast[i].knownForDepartment).toEqual(
            fixtures.tvShow.credits.cast[i].known_for_department,
          );
          expect(tvshow.cast[i].name).toEqual(fixtures.tvShow.credits.cast[i].name);
          expect(tvshow.cast[i].originalName).toEqual(
            fixtures.tvShow.credits.cast[i].original_name,
          );
          expect(tvshow.cast[i].popularity).toEqual(
            fixtures.tvShow.credits.cast[i].popularity,
          );
          expect(tvshow.cast[i].profilePath).toEqual(
            fixtures.tvShow.credits.cast[i].profile_path,
          );
          expect(tvshow.cast[i].character).toEqual(
            fixtures.tvShow.credits.cast[i].character,
          );
          expect(tvshow.cast[i].creditId).toEqual(
            fixtures.tvShow.credits.cast[i].credit_id,
          );
          expect(tvshow.cast[i].order).toEqual(fixtures.tvShow.credits.cast[i].order);
        }
        // crew
        for (let i = 0; i < tvshow.crew.length; i++) {
          expect(tvshow.crew[i].department).toEqual(
            fixtures.tvShow.credits.crew[i].department,
          );
          expect(tvshow.crew[i].id).toEqual(fixtures.tvShow.credits.crew[i].id);
          expect(tvshow.crew[i].job).toEqual(fixtures.tvShow.credits.crew[i].job);
          expect(tvshow.crew[i].name).toEqual(fixtures.tvShow.credits.crew[i].name);
          expect(tvshow.crew[i].profilePath).toEqual(
            fixtures.tvShow.credits.crew[i].profile_path,
          );
        }
      });
    });
  });

  describe("TV-Show Season", () => {
    describe("When query the data successfuly", () => {
      it("should return data correctly", async () => {
        jest
          .spyOn(RESTDataSource.prototype as any, "get")
          .mockImplementationOnce(async () => Promise.resolve(fixtures.tvShowSeason));
        const response = await execDatasourceTestOperation<{
          tvShowSeason: TvShowSeason;
        }>({
          query: queries.QUERY_TV_SHOW_SEASON,
          variables: {
            input: {
              id: 94997,
              season: 1,
              language: "pt",
            },
          },
        });
        expect(response.body.singleResult.errors).toBeUndefined();
        const tvshowSeason = response.body.singleResult.data.tvShowSeason;
        expect(tvshowSeason._id).toEqual(fixtures.tvShowSeason._id);
        expect(tvshowSeason.airDate).toEqual(fixtures.tvShowSeason.air_date);
        // episodes
        for (let i = 0; i < tvshowSeason.episodes.length; i++) {
          const episode = tvshowSeason.episodes[i];
          const rawEpisode = fixtures.tvShowSeason.episodes[i];
          expect(episode.airDate).toEqual(rawEpisode.air_date);
          expect(episode.episodeNumber).toEqual(rawEpisode.episode_number);
          expect(episode.episodeType).toEqual(rawEpisode.episode_type);
          expect(episode.id).toEqual(rawEpisode.id);
          // crew
          for (let j = 0; j < episode.crew.length; j++) {
            expect(episode.crew[j].job).toEqual(rawEpisode.crew[j].job);
            expect(episode.crew[j].department).toEqual(rawEpisode.crew[j].department);
            expect(episode.crew[j].creditId).toEqual(rawEpisode.crew[j].credit_id);
            expect(episode.crew[j].adult).toEqual(rawEpisode.crew[j].adult);
            expect(episode.crew[j].gender).toEqual(rawEpisode.crew[j].gender);
            expect(episode.crew[j].id).toEqual(rawEpisode.crew[j].id);
            expect(episode.crew[j].knownForDepartment).toEqual(
              rawEpisode.crew[j].known_for_department,
            );
            expect(episode.crew[j].name).toEqual(rawEpisode.crew[j].name);
            expect(episode.crew[j].originalName).toEqual(
              rawEpisode.crew[j].original_name,
            );
            expect(episode.crew[j].popularity).toEqual(rawEpisode.crew[j].popularity);
            expect(episode.crew[j].profilePath).toEqual(rawEpisode.crew[j].profile_path);
          }
          // guest-stars
          for (let j = 0; j < episode.crew.length; j++) {
            expect(episode.guestStars[j].character).toEqual(
              rawEpisode.guest_stars[j].character,
            );
            expect(episode.guestStars[j].creditId).toEqual(
              rawEpisode.guest_stars[j].credit_id,
            );
            expect(episode.guestStars[j].order).toEqual(rawEpisode.guest_stars[j].order);
            expect(episode.guestStars[j].adult).toEqual(rawEpisode.guest_stars[j].adult);
            expect(episode.guestStars[j].gender).toEqual(
              rawEpisode.guest_stars[j].gender,
            );
            expect(episode.guestStars[j].id).toEqual(rawEpisode.guest_stars[j].id);
            expect(episode.guestStars[j].knownForDepartment).toEqual(
              rawEpisode.guest_stars[j].known_for_department,
            );
            expect(episode.guestStars[j].name).toEqual(rawEpisode.guest_stars[j].name);
            expect(episode.guestStars[j].originalName).toEqual(
              rawEpisode.guest_stars[j].original_name,
            );
            expect(episode.guestStars[j].popularity).toEqual(
              rawEpisode.guest_stars[j].popularity,
            );
            expect(episode.guestStars[j].profilePath).toEqual(
              rawEpisode.guest_stars[j].profile_path,
            );
          }
          expect(episode.name).toEqual(rawEpisode.name);
          expect(episode.overview).toEqual(rawEpisode.overview);
          expect(episode.productionCode).toEqual(rawEpisode.production_code);
          expect(episode.runtime).toEqual(rawEpisode.runtime);
          expect(episode.seasonNumber).toEqual(rawEpisode.season_number);
          expect(episode.showId).toEqual(rawEpisode.show_id);
          expect(episode.stillPath).toEqual(rawEpisode.still_path);
          expect(episode.voteAverage).toEqual(rawEpisode.vote_average);
          expect(episode.voteCount).toEqual(rawEpisode.vote_count);
        }
        expect(tvshowSeason.name).toEqual(fixtures.tvShowSeason.name);
        expect(tvshowSeason.overview).toEqual(fixtures.tvShowSeason.overview);
        expect(tvshowSeason.id).toEqual(fixtures.tvShowSeason.id);
        expect(tvshowSeason.posterPath).toEqual(fixtures.tvShowSeason.poster_path);
        expect(tvshowSeason.posterPath).toEqual(fixtures.tvShowSeason.poster_path);
        expect(tvshowSeason.seasonNumber).toEqual(fixtures.tvShowSeason.season_number);
        expect(tvshowSeason.voteAverage).toEqual(fixtures.tvShowSeason.vote_average);
      });
    });
  });

  describe("Searching", () => {
    describe("Famous", () => {
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
            expect(searchFamous.items[i].name).toEqual(
              fixtures.searchFamousResult[i].name,
            );
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
          const knownForMovies = searchFamous.items[0]
            .knownFor[1] as SearchFamousKnownForMovie;
          expect(knownForMovies.adult).toEqual(
            fixtures.searchFamousResult[0].known_for[1].adult,
          );
          expect(knownForMovies.backdropPath).toEqual(
            fixtures.searchFamousResult[0].known_for[1].backdrop_path,
          );
          expect(knownForMovies.id).toEqual(
            fixtures.searchFamousResult[0].known_for[1].id,
          );
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
          const knownForTVShows = searchFamous.items[0]
            .knownFor[0] as SearchFamousKnownForTvShow;
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

    describe("TV-Shows", () => {
      describe("When query the data successfuly", () => {
        it("should return data correctly", async () => {
          const mockResponse = {
            results: fixtures.searchTVShowResult.results,
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
            searchTVShows: SearchTvShowsResult;
          }>({
            query: queries.QUERY_SEARCH_TV_SHOWS,
            variables: {
              input: { page: 1, query: "House of the", language: Iso6391Language.Pt },
            },
          });
          expect(response.body.singleResult.errors).toBeUndefined();
          const searchTVShow = response.body.singleResult.data.searchTVShows;
          expect(searchTVShow.hasMore).toEqual(true);
          expect(searchTVShow.totalPages).toEqual(mockResponse.total_pages);
          expect(searchTVShow.totalResults).toEqual(mockResponse.total_results);
          const rawSearchTVShowsResults = fixtures.searchTVShowResult.results;
          const searchTVShowsResults = searchTVShow.items;
          for (let i = 0; i < 1; i++) {
            expect(searchTVShowsResults[i].adult).toEqual(
              rawSearchTVShowsResults[i].adult,
            );
            expect(searchTVShowsResults[i].backdropPath).toEqual(
              rawSearchTVShowsResults[i].backdrop_path,
            );
            expect(searchTVShowsResults[i].genres).toEqual(
              rawSearchTVShowsResults[i].genre_ids
                .map((genre_id) =>
                  fixtures.tvShowGenres.genres.find((genre) => genre.id === genre_id),
                )
                .map((genre) => genre?.name),
            );
            expect(searchTVShowsResults[i].id).toEqual(rawSearchTVShowsResults[i].id);
            expect(searchTVShowsResults[i].originCountry).toEqual(
              rawSearchTVShowsResults[i].origin_country,
            );
            expect(searchTVShowsResults[i].originalLanguage).toEqual(
              rawSearchTVShowsResults[i].original_language,
            );
            expect(searchTVShowsResults[i].originalName).toEqual(
              rawSearchTVShowsResults[i].original_name,
            );
            expect(searchTVShowsResults[i].overview).toEqual(
              rawSearchTVShowsResults[i].overview,
            );
            expect(searchTVShowsResults[i].popularity).toEqual(
              rawSearchTVShowsResults[i].popularity,
            );
            expect(searchTVShowsResults[i].posterPath).toEqual(
              rawSearchTVShowsResults[i].poster_path,
            );
            expect(searchTVShowsResults[i].firstAirDate).toEqual(
              rawSearchTVShowsResults[i].first_air_date,
            );
            expect(searchTVShowsResults[i].name).toEqual(rawSearchTVShowsResults[i].name);
            expect(searchTVShowsResults[i].voteAverage).toEqual(
              rawSearchTVShowsResults[i].vote_average,
            );
            expect(searchTVShowsResults[i].voteCount).toEqual(
              rawSearchTVShowsResults[i].vote_count,
            );
          }
        });
      });
    });

    describe("Movies", () => {
      describe("When query the data successfuly", () => {
        it("should return data correctly", async () => {
          const mockResponse = {
            results: fixtures.searchMovies.results,
            page: 1,
            total_pages: 6,
            total_results: 113,
          };
          jest
            .spyOn(RESTDataSource.prototype as any, "get")
            .mockImplementationOnce(async () => Promise.resolve(mockResponse));
          jest
            .spyOn(RESTDataSource.prototype as any, "get")
            .mockImplementation(async () => Promise.resolve(fixtures.moviesGenres));
          const response = await execDatasourceTestOperation<{
            searchMovies: SearchMoviesResult;
          }>({
            query: queries.SEARCH_MOVIES_QUERY,
            variables: {
              input: { page: 1, query: "Fast and", language: Iso6391Language.Pt },
            },
          });
          expect(response.body.singleResult.errors).toBeUndefined();
          const searchMovies = response.body.singleResult.data.searchMovies;
          expect(searchMovies.hasMore).toEqual(true);
          expect(searchMovies.totalPages).toEqual(mockResponse.total_pages);
          expect(searchMovies.totalResults).toEqual(mockResponse.total_results);
          const rawSearchMoviesResults = fixtures.searchMovies.results;
          const searchMoviesResults = searchMovies.items;
          for (let i = 0; i < searchMoviesResults.length; i++) {
            expect(searchMoviesResults[i].adult).toEqual(rawSearchMoviesResults[i].adult);
            expect(searchMoviesResults[i].backdropPath).toEqual(
              rawSearchMoviesResults[i].backdrop_path,
            );
            expect(searchMoviesResults[i].genres).toEqual(
              rawSearchMoviesResults[i].genre_ids
                .map((genre_id) =>
                  fixtures.moviesGenres.genres.find((genre) => genre.id === genre_id),
                )
                .map((genre) => genre?.name),
            );
            expect(searchMoviesResults[i].id).toEqual(rawSearchMoviesResults[i].id);
            expect(searchMoviesResults[i].originalLanguage).toEqual(
              rawSearchMoviesResults[i].original_language,
            );
            expect(searchMoviesResults[i].originalTitle).toEqual(
              rawSearchMoviesResults[i].original_title,
            );
            expect(searchMoviesResults[i].overview).toEqual(
              rawSearchMoviesResults[i].overview,
            );
            expect(searchMoviesResults[i].popularity).toEqual(
              rawSearchMoviesResults[i].popularity,
            );
            expect(searchMoviesResults[i].releaseDate).toEqual(
              rawSearchMoviesResults[i].release_date,
            );
            expect(searchMoviesResults[i].title).toEqual(rawSearchMoviesResults[i].title);
            expect(searchMoviesResults[i].video).toEqual(rawSearchMoviesResults[i].video);
            expect(searchMoviesResults[i].voteAverage).toEqual(
              rawSearchMoviesResults[i].vote_average,
            );
            expect(searchMoviesResults[i].voteCount).toEqual(
              rawSearchMoviesResults[i].vote_count,
            );
          }
        });
      });
    });
  });

  describe("Movies", () => {
    describe("Querying Movie-details", () => {
      describe("When query the data successfuly", () => {
        it("should return data correctly", async () => {
          jest
            .spyOn(RESTDataSource.prototype as any, "get")
            .mockImplementationOnce(async () => Promise.resolve(fixtures.movie));
          jest
            .spyOn(RESTDataSource.prototype as any, "get")
            .mockImplementationOnce(async () => Promise.resolve(fixtures.movieVideos));
          jest
            .spyOn(RESTDataSource.prototype as any, "get")
            .mockImplementationOnce(async () => Promise.resolve(fixtures.movieImages));
          const response = await execDatasourceTestOperation<{
            movie: Movie;
          }>({
            query: queries.QUERY_MOVIE_DETAILS,
            variables: {
              id: 111110,
              language: Iso6391Language.Pt,
            },
          });
          expect(response.body.singleResult.errors).toBeUndefined();
          const movie = response.body.singleResult.data.movie;
          // movie
          expect(movie.adult).toEqual(fixtures.movie.adult);
          expect(movie.backdropPath).toEqual(fixtures.movie.backdrop_path);
          // belongs-to-collection
          expect(movie.belongsToCollection).toEqual({
            id: fixtures.movie.belongs_to_collection.id,
            name: fixtures.movie.belongs_to_collection.name,
            posterPath: fixtures.movie.belongs_to_collection.poster_path,
            backdropPath: fixtures.movie.belongs_to_collection.backdrop_path,
          });
          expect(movie.budget).toEqual(fixtures.movie.budget);
          expect(movie.genres).toEqual(fixtures.movie.genres.map((genre) => genre.name));
          expect(movie.homepage).toEqual(fixtures.movie.homepage);
          expect(movie.id).toEqual(fixtures.movie.id);
          expect(movie.imdbId).toEqual(fixtures.movie.imdb_id);
          expect(movie.originalLanguage).toEqual(fixtures.movie.original_language);
          expect(movie.originalTitle).toEqual(fixtures.movie.original_title);
          expect(movie.overview).toEqual(fixtures.movie.overview);
          expect(movie.popularity).toEqual(fixtures.movie.popularity);
          expect(movie.posterPath).toEqual(fixtures.movie.poster_path);
          // production-companies
          for (let i = 0; i < movie.productionCompanies.length; i++) {
            expect(movie.productionCompanies[i].id).toEqual(
              fixtures.movie.production_companies[i].id,
            );
            expect(movie.productionCompanies[i].logoPath).toEqual(
              fixtures.movie.production_companies[i].logo_path,
            );
            expect(movie.productionCompanies[i].name).toEqual(
              fixtures.movie.production_companies[i].name,
            );
            expect(movie.productionCompanies[i].originCountry).toEqual(
              fixtures.movie.production_companies[i].origin_country,
            );
          }
          expect(movie.productionCountries).toEqual(
            fixtures.movie.production_countries.map(
              (productionCountry) => productionCountry.name,
            ),
          );
          expect(movie.releaseDate).toEqual(fixtures.movie.release_date);
          expect(movie.revenue).toEqual(fixtures.movie.revenue);
          expect(movie.runtime).toEqual(fixtures.movie.runtime);
          expect(movie.spokenLanguages).toEqual(
            fixtures.movie.spoken_languages.map((spokenLanguage) => spokenLanguage.name),
          );
          expect(movie.status).toEqual(fixtures.movie.status);
          expect(movie.tagline).toEqual(fixtures.movie.tagline);
          expect(movie.title).toEqual(fixtures.movie.title);
          expect(movie.video).toEqual(fixtures.movie.video);
          expect(movie.voteAverage).toEqual(fixtures.movie.vote_average);
          expect(movie.voteCount).toEqual(fixtures.movie.vote_count);
          // videos
          for (let i = 0; i < movie.videos.length; i++) {
            expect(movie.videos[i].id).toEqual(fixtures.movieVideos.results[i].id);
            expect(movie.videos[i].key).toEqual(fixtures.movieVideos.results[i].key);
            expect(movie.videos[i].name).toEqual(fixtures.movieVideos.results[i].name);
            expect(movie.videos[i].type).toEqual(fixtures.movieVideos.results[i].type);
            expect(movie.videos[i].site).toEqual(fixtures.movieVideos.results[i].site);
            expect(movie.videos[i].thumbnail).toEqual({
              extraSmall: `${YOUTUBE_THUMBNAIL_URL}/${fixtures.movieVideos.results[i].key}/default.jpg`,
              small: `${YOUTUBE_THUMBNAIL_URL}/${fixtures.movieVideos.results[i].key}/mqdefault.jpg`,
              medium: `${YOUTUBE_THUMBNAIL_URL}/${fixtures.movieVideos.results[i].key}/hqdefault.jpg`,
              large: `${YOUTUBE_THUMBNAIL_URL}/${fixtures.movieVideos.results[i].key}/sddefault.jpg`,
              extraLarge: `${YOUTUBE_THUMBNAIL_URL}/${fixtures.movieVideos.results[i].key}/maxresdefault.jpg`,
            });
          }
          // images
          for (let i = 0; i < movie.images.length; i++) {
            expect(movie.images[i]).toEqual(fixtures.movieImages.backdrops[i].file_path);
          }
          // credits
          for (let i = 0; i < movie.cast.length; i++) {
            expect(movie.cast[i].adult).toEqual(fixtures.movie.credits.cast[i].adult);
            expect(movie.cast[i].character).toEqual(
              fixtures.movie.credits.cast[i].character,
            );
            expect(movie.cast[i].creditId).toEqual(
              fixtures.movie.credits.cast[i].credit_id,
            );
            expect(movie.cast[i].id).toEqual(fixtures.movie.credits.cast[i].id);
            expect(movie.cast[i].knownForDepartment).toEqual(
              fixtures.movie.credits.cast[i].known_for_department,
            );
            expect(movie.cast[i].name).toEqual(fixtures.movie.credits.cast[i].name);
            expect(movie.cast[i].order).toEqual(fixtures.movie.credits.cast[i].order);
            expect(movie.cast[i].originalName).toEqual(
              fixtures.movie.credits.cast[i].original_name,
            );
            expect(movie.cast[i].popularity).toEqual(
              fixtures.movie.credits.cast[i].popularity,
            );
            expect(movie.cast[i].profilePath).toEqual(
              fixtures.movie.credits.cast[i].profile_path,
            );
          }
          // cast
          for (let i = 0; i < movie.crew.length; i++) {
            expect(movie.crew[i].department).toEqual(
              fixtures.movie.credits.crew[i].department,
            );
            expect(movie.crew[i].id).toEqual(fixtures.movie.credits.crew[i].id);
            expect(movie.crew[i].job).toEqual(fixtures.movie.credits.crew[i].job);
            expect(movie.crew[i].name).toEqual(fixtures.movie.credits.crew[i].name);
            expect(movie.crew[i].profilePath).toEqual(
              fixtures.movie.credits.crew[i].profile_path,
            );
          }
        });
      });
    });
  });

  describe("Media genres", () => {
    describe('Querying the "Movies-genres"', () => {
      it("should return data correctly", async () => {
        jest
          .spyOn(RESTDataSource.prototype as any, "get")
          .mockImplementationOnce(async () => Promise.resolve(fixtures.moviesGenres));
        const response = await execDatasourceTestOperation<{
          mediaGenres: MediaGenre[];
        }>({
          query: queries.MEDIA_GENRES_QUERY,
          variables: {
            language: Iso6391Language.Pt,
            mediaType: MediaType.Movie,
          },
        });
        expect(response.body.singleResult.errors).toBeUndefined();
        const mediaGenres = response.body.singleResult.data.mediaGenres;
        expect(mediaGenres).toEqual(fixtures.moviesGenres.genres);
      });
    });

    describe('Querying the "TV-Shows-genres"', () => {
      it("should return data correctly", async () => {
        jest
          .spyOn(RESTDataSource.prototype as any, "get")
          .mockImplementationOnce(async () => Promise.resolve(fixtures.tvShowGenres));
        const response = await execDatasourceTestOperation<{
          mediaGenres: MediaGenre[];
        }>({
          query: queries.MEDIA_GENRES_QUERY,
          variables: {
            language: Iso6391Language.Pt,
            mediaType: MediaType.Tv,
          },
        });
        expect(response.body.singleResult.errors).toBeUndefined();
        const mediaGenres = response.body.singleResult.data.mediaGenres;
        expect(mediaGenres).toEqual(fixtures.tvShowGenres.genres);
      });
    });
  });
});
