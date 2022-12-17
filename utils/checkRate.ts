import secureLocalStorage from "react-secure-storage";
import { getRatedMovies, getRatedSeries } from "../services/user-service";
import { User } from "../types";

const checkRate = async (type: string, user: User, contentId: number) => {
    var rate:number = 0;

    const sessionId = secureLocalStorage.getItem("session_id")?.toString();
    if (!sessionId) return 0;
    
    if (type === "series") {
      const result = await getRatedSeries(user?.id, sessionId!);
      if (result.total_results === 0) return 0;

      for (let i = 1; i <= result.total_pages; i++) {
        const series = await getRatedSeries(user?.id, sessionId!, i);
  
        series.results.forEach((series:any) => {
          if (series.id === contentId) {
            rate = series.rating;
          }
        });
      }
    } else {
      const result = await getRatedMovies(user?.id, sessionId!);
      if (result.total_results === 0) return 0;
  
      for (let i = 1; i <= result.total_pages; i++) {
        const movies = await getRatedMovies(user?.id, sessionId!, i);
  
        movies.results.forEach((movie:any) => {
          if (movie.id === contentId) {
            rate = movie.rating
          }
        });
      }
    }
    return rate;
}

export default checkRate;