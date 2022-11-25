const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// MOVIES
export const discoverMovies = async (page:number = 1) => {
  const result = await fetch(`${API_BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}`);
  const movies = await result.json();
  return movies;
};

export const getRecommendedMovies = async (id:number, page:number = 1) => {
  const result = await fetch(`${API_BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&page=${page}`);
  const movies = await result.json();
  return movies;
};

export const getSimilarMovies = async (id:number, page:number = 1) => {
  const result = await fetch(`${API_BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&page=${page}`);
  const movies = await result.json();
  return movies;
};

export const getPopular = async (page:number = 1) => {
  const result = await fetch(`${API_BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  const movies = await result.json();
  return movies;
};

export const getTopRated = async (page:number = 1) => {
  const result = await fetch(`${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`);
  const movies = await result.json();
  return movies;
};

export const getUpcoming = async (page:number = 1) => {
  const result = await fetch(`${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`);
  const movies = await result.json();
  return movies;
};

export const getLatestMovies = async () => {
  const result = await fetch(`${API_BASE_URL}/movie/latest?api_key=${API_KEY}`);
  const movies = await result.json();
  return movies;
};

// MOVIE DETAILS
export const getMovieDetails = async (id:number) => {
    const result = await fetch(`${API_BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    const details = await result.json();
    return details;
  };
  
export const getMovieVideos = async (id:number)=> {
  const result = await fetch(`${API_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  const videos = await result.json();
  return videos;
};

export const getMovieReviews = async (id:number, page:number = 1) => {
  const result = await fetch(`${API_BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&page=${page}`);
  const reviews = await result.json();
  return reviews;
};

export const getMovieCredits = async (id:number) => {
  const result = await fetch(`${API_BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  const credits = await result.json();
  return credits;
};

// MOVIE RATING
export const rateMovie = async (id:number, userId:string, rating:number) => {
  const result = await fetch(`${API_BASE_URL}/movie/${id}/rating?api_key=${API_KEY}&session_id=${userId}`,{
    method: "POST",
    headers: {
      "Content-Type":"application/json; charset=UTF-8"
    },
    body: JSON.stringify({"value":rating})
  });
  const rate = await result.json();
  return rate;
};

export const deleteMovieRating = async (id:number, userId:string) => {
  const result = await fetch(`${API_BASE_URL}/movie/${id}/rating?api_key=${API_KEY}&session_id=${userId}`,{
    method: "DELETE",
    headers: {
      "Content-Type":"application/json; charset=UTF-8"
    }
  });
  const rate = await result.json();
  return rate;
};

// OTHERS
export const getMovieGenres = async () => {
  const result = await fetch(`${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const genres = await result.json();
  return genres;
};

export const getTrending = async () => {
  const result = await fetch(`${API_BASE_URL}/trending/all/week?api_key=${API_KEY}`);
  const trending = await result.json();
  return trending;
};