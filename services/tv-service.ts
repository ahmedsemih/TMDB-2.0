const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// TV SHOWS
export const discoverTv = async (page:number = 1) => {
  const result = await fetch(`${API_BASE_URL}/discover/tv?api_key=${API_KEY}&page=${page}`);
  const tv = await result.json();
  return tv;
};

export const getRecommended = async (id:number, page:number = 1) => {
  const result = await fetch(`${API_BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}&page=${page}`);
  const tv = await result.json();
  return tv;
};

export const getSimilar = async (id:number, page:number = 1) => {
  const result = await fetch(`${API_BASE_URL}/tv/${id}/similar?api_key=${API_KEY}&page=${page}`);
  const tv = await result.json();
  return tv;
};

export const getPopular = async (page:number = 1) => {
  const result = await fetch(`${API_BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`);
  const tv = await result.json();
  return tv;
};

export const getTopRated = async (page:number = 1) => {
  const result = await fetch(`${API_BASE_URL}/tv/top_rated?api_key=${API_KEY}&page=${page}`);
  const tv = await result.json();
  return tv;
};

export const getAiringToday = async (page:number = 1) => {
  const result = await fetch(`${API_BASE_URL}/tv/airing_today?api_key=${API_KEY}&page=${page}`);
  const tv = await result.json();
  return tv;
};

export const getTvOnTheAir = async (page:number = 1) => {
  const result = await fetch(`${API_BASE_URL}/tv/on_the_air?api_key=${API_KEY}&page=${page}`);
  const tv = await result.json();
  return tv;
};

// TV SHOWS DETAILS
export const getTvShowDetails = async (id:number) => {
  const result = await fetch(`${API_BASE_URL}/tv/${id}?api_key=${API_KEY}`);
  const details = await result.json();
  return details;
};

export const getTvShowVideos = async (id:number) => {
  const result = await fetch(`${API_BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`);
  const videos = await result.json();
  return videos;
};

export const getTvShowReviews = async (id:number, page:number = 1) => {
  const result = await fetch(`${API_BASE_URL}/tv/${id}/reviews?api_key=${API_KEY}&page=${page}`);
  const reviews = await result.json();
  return reviews;
};

export const getTvShowCredits = async (id:number) => {
  const result = await fetch(`${API_BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`);
  const credits = await result.json();
  return credits;
};

// SEASONS
export const getSeasonDetails = async (id:number, seasonNumber:number) => {
  const result = await fetch(`${API_BASE_URL}/tv/${id}/season/${seasonNumber}?api_key=${API_KEY}`);
  const season = await result.json();
  return season;
};

export const getSeasonImages = async (id:number, seasonNumber:number) => {
  const result = await fetch(`${API_BASE_URL}/tv/${id}/season/${seasonNumber}/images?api_key=${API_KEY}`);
  const images = await result.json();
  return images;
};

export const getSeasonVideos = async (id:number, seasonNumber:number) => {
  const result = await fetch(`${API_BASE_URL}/tv/${id}/season/${seasonNumber}/videos?api_key=${API_KEY}`);
  const videos = await result.json();
  return videos;
}

// EPISODES
export const getEpisodeDetails = async (id:number, seasonNumber:number, episodeNumber:number) => {
  const result = await fetch(`${API_BASE_URL}/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${API_KEY}`);
  const episode = await result.json();
  return episode;
}

// RATING
export const rateTvShow = async (id:number, sessionId:string, rating:number) => {
  const result = await fetch(`${API_BASE_URL}/tv/${id}/rating?api_key=${API_KEY}&session_id=${sessionId}`,{
    method: "POST",
    headers: {
      "Content-Type":"application/json; charset=UTF-8"
    },
    body: JSON.stringify({"value":rating})
  });
  const rate = await result.json();
  return rate;
};

export const deleteTvShowRating = async (id:number, sessionId:string) => {
  const result = await fetch(`${API_BASE_URL}/tv/${id}/rating?api_key=${API_KEY}&session_id=${sessionId}`,{
    method: "DELETE",
    headers: {
      "Content-Type":"application/json; charset=UTF-8"
    }
  });
  const rate = await result.json();
  return rate;
};

// OTHERS
export const getTvGenres = async () => {
  const result = await fetch(`${API_BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
  const genres = await result.json();
  return genres;
};