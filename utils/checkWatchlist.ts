import secureLocalStorage from "react-secure-storage";
import { getMovieWatchlist, getSeriesWatchlist } from "../services/user-service";
import { MovieWatchlist, TvWatchlist, User } from "../types";

const checkWatchlist = async (type: string, user: User, contentId: number) => {
  var status = false;
  const sessionId = secureLocalStorage.getItem("session_id")?.toString();
  if (!sessionId) return false;

  if (type === "series") {
    const result: TvWatchlist = await getSeriesWatchlist(user?.id, sessionId!);
    if (result.total_results === 0) return false;

    for (let i = 1; i <= result.total_pages; i++) {
      const series: TvWatchlist = await getSeriesWatchlist(user?.id, sessionId!, i);

      series.results.forEach((series) => {
        if (series.id === contentId) {
          status = true;
        }
      });
    }
  } else {
    const result: MovieWatchlist = await getMovieWatchlist(user?.id, sessionId!);
    if (result.total_results === 0) return false;

    for (let i = 1; i <= result.total_pages; i++) {
      const movies: MovieWatchlist = await getMovieWatchlist(user?.id, sessionId!, i);

      movies.results.forEach((movie) => {
        if (movie.id === contentId) {
          status = true;
        }
      });
    }
  }
  return status;
};

export default checkWatchlist;
