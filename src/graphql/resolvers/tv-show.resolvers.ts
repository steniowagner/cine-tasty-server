import { TvShowImagesArgs, TvShowSimilarArgs } from "@generated-types";
import { handler as tvShowImagesHandler } from "@tmdb-api/handlers/tv-show-images/tv-show-images.handler";
import * as TVShowSimilar from "@tmdb-api/handlers/tv-show-similar";
import { Context } from "@types";
import * as handlers from "@tmdb-api/handlers/tv-shows";

export const resolvers = {
  Query: {
    tvShow: async (
      _parent: undefined,
      params: handlers.tvShowDetails.types.Params,
      context: Context,
    ) => handlers.tvShowDetails.handler(params, context.tmdbAPI),
  },

  TVShow: {
    backdropPath: (parent: handlers.tvShowDetails.types.Response) => parent.backdrop_path,
    createdBy: (parent: handlers.tvShowDetails.types.Response) => parent.created_by,
    episodeRunTime: (parent: handlers.tvShowDetails.types.Response) =>
      parent.episode_run_time,
    firstAirDate: (parent: handlers.tvShowDetails.types.Response) =>
      parent.first_air_date,
    genres: (parent: handlers.tvShowDetails.types.Response) =>
      parent.genres.map((genre) => genre.name),
    inProduction: (parent: handlers.tvShowDetails.types.Response) => parent.in_production,
    lastAirDate: (parent: handlers.tvShowDetails.types.Response) => parent.last_air_date,
    lastEpisodeToAir: (parent: handlers.tvShowDetails.types.Response) =>
      parent.last_episode_to_air,
    nextEpisodeToAir: (parent: handlers.tvShowDetails.types.Response) =>
      parent.next_episode_to_air,
    networks: (parent: handlers.tvShowDetails.types.Response) => parent.networks,
    numberOfEpisodes: (parent: handlers.tvShowDetails.types.Response) =>
      parent.number_of_episodes,
    numberOfSeasons: (parent: handlers.tvShowDetails.types.Response) =>
      parent.number_of_seasons,
    originCountry: (parent: handlers.tvShowDetails.types.Response) =>
      parent.origin_country,
    originalLanguage: (parent: handlers.tvShowDetails.types.Response) =>
      parent.original_language,
    originalName: (parent: handlers.tvShowDetails.types.Response) => parent.original_name,
    posterPath: (parent: handlers.tvShowDetails.types.Response) => parent.poster_path,
    productionCompanies: (parent: handlers.tvShowDetails.types.Response) =>
      parent.production_companies,
    productionCountries: (parent: handlers.tvShowDetails.types.Response) =>
      parent.production_countries.map((productionCountry) => productionCountry.name),
    seasons: (parent: handlers.tvShowDetails.types.Response) => parent.seasons,
    spokenLanguages: (parent: handlers.tvShowDetails.types.Response) =>
      parent.spoken_languages.map((spokenLanguage) => spokenLanguage.name),
    voteAverage: (parent: handlers.tvShowDetails.types.Response) => parent.vote_average,
    voteCount: (parent: handlers.tvShowDetails.types.Response) => parent.vote_count,
    images: (
      _: handlers.tvShowDetails.types.Response,
      params: TvShowImagesArgs,
      context: Context,
    ): Promise<string[]> => tvShowImagesHandler.handle(params, context.tmdbAPI),
    similar: (
      _: handlers.tvShowDetails.types.Response,
      params: TvShowSimilarArgs,
      context: Context,
    ) => TVShowSimilar.handle(params, context.tmdbAPI),
    videos: (
      _: handlers.tvShowDetails.types.Response,
      params: handlers.tvShowVideos.types.Params,
      context: Context,
    ) => handlers.tvShowVideos.handler(params, context.tmdbAPI),
    cast: (parent: handlers.tvShowDetails.types.Response) => parent.credits.cast,
    crew: (parent: handlers.tvShowDetails.types.Response) => parent.credits.crew,
  },

  CreatedBy: {
    creditId: (parent: handlers.tvShowDetails.types.CreatedBy) => parent.credit_id,
    profilePath: (parent: handlers.tvShowDetails.types.CreatedBy) => parent.profile_path,
  },

  LastEpisodeToAir: {
    voteAverage: (parent: handlers.tvShowDetails.types.LastEpisodeToAir) =>
      parent.vote_average,
    voteCount: (parent: handlers.tvShowDetails.types.LastEpisodeToAir) =>
      parent.vote_count,
    airDate: (parent: handlers.tvShowDetails.types.LastEpisodeToAir) => parent.air_date,
    episodeNumber: (parent: handlers.tvShowDetails.types.LastEpisodeToAir) =>
      parent.episode_number,
    productionCode: (parent: handlers.tvShowDetails.types.LastEpisodeToAir) =>
      parent.production_code,
    seasonNumber: (parent: handlers.tvShowDetails.types.LastEpisodeToAir) =>
      parent.season_number,
    showId: (parent: handlers.tvShowDetails.types.LastEpisodeToAir) => parent.show_id,
    stillPath: (parent: handlers.tvShowDetails.types.LastEpisodeToAir) =>
      parent.still_path,
  },

  Networks: {
    logoPath: (parent: handlers.tvShowDetails.types.Network) => parent.logo_path,
    originCountry: (parent: handlers.tvShowDetails.types.Network) =>
      parent.origin_country,
  },

  ProductionCompanies: {
    logoPath: (parent: handlers.tvShowDetails.types.ProductionCompanies) =>
      parent.logo_path,
    originCountry: (parent: handlers.tvShowDetails.types.ProductionCompanies) =>
      parent.origin_country,
  },

  Seasons: {
    airDate: (parent: handlers.tvShowDetails.types.Season) => parent.air_date,
    episodeCount: (parent: handlers.tvShowDetails.types.Season) => parent.episode_count,
    posterPath: (parent: handlers.tvShowDetails.types.Season) => parent.poster_path,
    seasonNumber: (parent: handlers.tvShowDetails.types.Season) => parent.season_number,
    voteAverage: (parent: handlers.tvShowDetails.types.Season) => parent.vote_average,
  },

  SimilarTVShow: {
    backdropPath: (parent: TVShowSimilar.types.Result) => parent.backdrop_path,
    originCountry: (parent: TVShowSimilar.types.Result) => parent.origin_country,
    originalLanguage: (parent: TVShowSimilar.types.Result) => parent.original_language,
    originalName: (parent: TVShowSimilar.types.Result) => parent.original_name,
    posterPath: (parent: TVShowSimilar.types.Result) => parent.poster_path,
    firstAirDate: (parent: TVShowSimilar.types.Result) => parent.first_air_date,
    voteAverage: (parent: TVShowSimilar.types.Result) => parent.vote_average,
    voteCount: (parent: TVShowSimilar.types.Result) => parent.vote_count,
  },
};
