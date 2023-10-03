import { QueryTvShowSeasonArgs } from "@generated-types";
import {
  tvShowSeasonHandler,
  TVShowSeasonTypes,
} from "@tmdb-api/handlers/tv-show-season";
import { Context } from "@types";

export const resolvers = {
  Query: {
    tvShowSeason: async (
      _parent: undefined,
      params: QueryTvShowSeasonArgs,
      context: Context,
    ) => tvShowSeasonHandler.handle(params, context.tmdbAPI),
  },

  TVShowSeason: {
    airDate: (parent: TVShowSeasonTypes.Response) => parent.air_date,
    episodes: (parent: TVShowSeasonTypes.Response) => parent.episodes,
    posterPath: (parent: TVShowSeasonTypes.Response) => parent.poster_path,
    seasonNumber: (parent: TVShowSeasonTypes.Response) => parent.season_number,
    voteAverage: (parent: TVShowSeasonTypes.Response) => parent.vote_average,
  },

  Episode: {
    airDate: (parent: TVShowSeasonTypes.Episode) => parent.air_date,
    episodeNumber: (parent: TVShowSeasonTypes.Episode) => parent.episode_number,
    episodeType: (parent: TVShowSeasonTypes.Episode) => parent.episode_type,
    crew: (parent: TVShowSeasonTypes.Episode) => parent.crew,
    guestStars: (parent: TVShowSeasonTypes.Episode) => parent.guest_stars,
    productionCode: (parent: TVShowSeasonTypes.Episode) => parent.production_code,
    seasonNumber: (parent: TVShowSeasonTypes.Episode) => parent.season_number,
    showId: (parent: TVShowSeasonTypes.Episode) => parent.show_id,
    stillPath: (parent: TVShowSeasonTypes.Episode) => parent.still_path,
    voteAverage: (parent: TVShowSeasonTypes.Episode) => parent.vote_average,
    voteCount: (parent: TVShowSeasonTypes.Episode) => parent.vote_count,
  },

  TVShowEpisodeCrew: {
    creditId: (parent: TVShowSeasonTypes.TVShowEpisodeCrew) => parent.credit_id,
    knownForDepartment: (parent: TVShowSeasonTypes.TVShowEpisodeCrew) =>
      parent.known_for_department,
    originalName: (parent: TVShowSeasonTypes.TVShowEpisodeCrew) => parent.original_name,
    profilePath: (parent: TVShowSeasonTypes.TVShowEpisodeCrew) => parent.profile_path,
  },

  TVShowEpisodeGuestStar: {
    creditId: (parent: TVShowSeasonTypes.TVShowEpisodeGuestStar) => parent.credit_id,
    knownForDepartment: (parent: TVShowSeasonTypes.TVShowEpisodeGuestStar) =>
      parent.known_for_department,
    originalName: (parent: TVShowSeasonTypes.TVShowEpisodeGuestStar) =>
      parent.original_name,
    profilePath: (parent: TVShowSeasonTypes.TVShowEpisodeGuestStar) =>
      parent.profile_path,
  },
};
