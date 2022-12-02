const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// USER DETAILS
export const getDetails = async (sessionId:string) => {
 const res = await fetch(`${API_BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionId}`);
 const details = await res.json();
 return details;
};

// FAVORITES
export const markAsFavorite = async (id:number, sessionId:string, mediaType:string, mediaId:number, favorite:boolean) => {
    const res = await fetch(`${API_BASE_URL}/account/${id}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,{
        method: "POST",
        headers: {
        "Content-Type":"application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            media_type: mediaType,
            media_id: mediaId,
            favorite
        })
    });
    const result = await res.json();
    return result;
};

export const getFavoriteMovies = async (id:number, sessionId:string, page:number = 1) => {
    const res = await fetch(`${API_BASE_URL}/account/${id}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}&page=${page}`);
    const movies = res.json();
    return movies;
};

export const getFavoriteSeries = async (id:number, sessionId:string, page:number = 1) => {
    const res = await fetch(`${API_BASE_URL}/account/${id}/favorite/tv?api_key=${API_KEY}&session_id=${sessionId}&page=${page}`);
    const series = await res.json();
    return series;
};

// WATCHLIST
export const watchlistStatus = async (id:number, sessionId:number, mediaType:string, mediaId: number, watchlist:boolean) => {
    const res = await fetch(`${API_BASE_URL}/account/${id}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`,{
        method: "POST",
        headers: {
        "Content-Type":"application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            media_type: mediaType,
            media_id: mediaId,
            watchlist
        })
    });
    const result = await res.json();
    return result;
};

export const getMovieWatchlist = async (id:number, sessionId:string, page:number = 1) => {
    const res = await fetch(`${API_BASE_URL}/account/${id}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}&page=${page}`);
    const movies = await res.json();
    return movies;
};

export const getSeriesWatchlist = async (id:number, sessionId:string, page:number = 1) => {
    const res = await fetch(`${API_BASE_URL}/account/${id}/watchlist/tv?api_key=${API_KEY}&session_id=${sessionId}&page=${page}`);
    const series = await res.json();
    return series;
};

