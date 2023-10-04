import { QueryTvShowArgs } from "@generated-types";
import { tvShowDetailsHandler, TVShowTypes } from "@tmdb-api/handlers/tv-show-details";
import { Context } from "@types";

export const resolvers = {
  Query: {
    tvShow: async (_parent: undefined, params: QueryTvShowArgs, context: Context) =>
      tvShowDetailsHandler.handle(params, context.tmdbAPI),
  },

  TVShow: {
    backdropPath: (parent: TVShowTypes.Response) => parent.backdrop_path,
    createdBy: (parent: TVShowTypes.Response) => parent.created_by,
    episodeRunTime: (parent: TVShowTypes.Response) => parent.episode_run_time,
    firstAirDate: (parent: TVShowTypes.Response) => parent.first_air_date,
    genres: (parent: TVShowTypes.Response) => parent.genres.map((genre) => genre.name),
    inProduction: (parent: TVShowTypes.Response) => parent.in_production,
    lastAirDate: (parent: TVShowTypes.Response) => parent.last_air_date,
    lastEpisodeToAir: (parent: TVShowTypes.Response) => parent.last_episode_to_air,
    nextEpisodeToAir: (parent: TVShowTypes.Response) => parent.next_episode_to_air,
    networks: (parent: TVShowTypes.Response) => parent.networks,
    numberOfEpisodes: (parent: TVShowTypes.Response) => parent.number_of_episodes,
    numberOfSeasons: (parent: TVShowTypes.Response) => parent.number_of_seasons,
    originCountry: (parent: TVShowTypes.Response) => parent.origin_country,
    originalLanguage: (parent: TVShowTypes.Response) => parent.original_language,
    originalName: (parent: TVShowTypes.Response) => parent.original_name,
    posterPath: (parent: TVShowTypes.Response) => parent.poster_path,
    productionCompanies: (parent: TVShowTypes.Response) => parent.production_companies,
    productionCountries: (parent: TVShowTypes.Response) =>
      parent.production_countries.map((productionCountry) => productionCountry.name),
    seasons: (parent: TVShowTypes.Response) => parent.seasons,
    spokenLanguages: (parent: TVShowTypes.Response) =>
      parent.spoken_languages.map((spokenLanguage) => spokenLanguage.name),
    voteAverage: (parent: TVShowTypes.Response) => parent.vote_average,
    voteCount: (parent: TVShowTypes.Response) => parent.vote_count,
  },

  CreatedBy: {
    creditId: (parent: TVShowTypes.CreatedBy) => parent.credit_id,
    profilePath: (parent: TVShowTypes.CreatedBy) => parent.profile_path,
  },

  LastEpisodeToAir: {
    voteAverage: (parent: TVShowTypes.LastEpisodeToAir) => parent.vote_average,
    voteCount: (parent: TVShowTypes.LastEpisodeToAir) => parent.vote_count,
    airDate: (parent: TVShowTypes.LastEpisodeToAir) => parent.air_date,
    episodeNumber: (parent: TVShowTypes.LastEpisodeToAir) => parent.episode_number,
    productionCode: (parent: TVShowTypes.LastEpisodeToAir) => parent.production_code,
    seasonNumber: (parent: TVShowTypes.LastEpisodeToAir) => parent.season_number,
    showId: (parent: TVShowTypes.LastEpisodeToAir) => parent.show_id,
    stillPath: (parent: TVShowTypes.LastEpisodeToAir) => parent.still_path,
  },

  Networks: {
    logoPath: (parent: TVShowTypes.Network) => parent.logo_path,
    originCountry: (parent: TVShowTypes.Network) => parent.origin_country,
  },

  ProductionCompanies: {
    logoPath: (parent: TVShowTypes.ProductionCompanies) => parent.logo_path,
    originCountry: (parent: TVShowTypes.ProductionCompanies) => parent.origin_country,
  },

  Seasons: {
    airDate: (parent: TVShowTypes.Season) => parent.air_date,
    episodeCount: (parent: TVShowTypes.Season) => parent.episode_count,
    posterPath: (parent: TVShowTypes.Season) => parent.poster_path,
    seasonNumber: (parent: TVShowTypes.Season) => parent.season_number,
    voteAverage: (parent: TVShowTypes.Season) => parent.vote_average,
  },
};
