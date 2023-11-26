import cast from "./cast.schema";
import famous from "./famous.schema";
import ISO6391Language from "./ISO6391Language.schema";
import searchFamous from "./search-famous.schema";
import search from "./search.schema";
import trendingFamous from "./trending-famous.schema";
import tvShow from "./tv-show.schema";
import tvShowSeason from "./tv-show-season.schema";
import trendingTVShows from "./trending-tv-shows.schema";
import searchTvShows from "./search-tv-shows.schema";
import movie from "./movie.schema";
import trendingMovies from "./trending-movies.schema";
import searchMovies from "./search-movies.schema";
import mediaGenres from "./media-genres.schema";
import mediaVideo from "./media-video.schema";
import crew from "./crew.schema";

export default [
  crew,
  mediaVideo,
  mediaGenres,
  searchMovies,
  trendingMovies,
  movie,
  searchTvShows,
  trendingTVShows,
  tvShowSeason,
  tvShow,
  trendingFamous,
  cast,
  famous,
  ISO6391Language,
  searchFamous,
  search,
];
