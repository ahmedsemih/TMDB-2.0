const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const getMoviesByQuery = async (query?:string, page:number = 1) => {
    const res = await fetch(`${API_BASE_URL}/search/movie?api_key=${API_KEY}${query && "&query="+query}&page=${page}`);
    const movies = await res.json();
    return movies;
};

export const getSeriesByQuery = async (query?:string, page:number = 1) => {
    const res = await fetch(`${API_BASE_URL}/search/tv?api_key=${API_KEY}${query && "&query="+query}&page=${page}`);
    const series = await res.json();
    return series;
};

export const getPeopleByQuery = async (query?:string, page:number = 1) => {
    const res = await fetch(`${API_BASE_URL}/search/person?api_key=${API_KEY}${query && "&query="+query}&page=${page}`);
    const people = await res.json();
    return people;
};

export const getMoviesByGenre = async (genre:string, page:number = 1) => {
    const res = await fetch(`${API_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre}&page=${page}`);
    const movies = await res.json();
    return movies;
};

export const getSeriesByGenre = async (genre:string, page:number = 1) => {
    const res = await fetch(`${API_BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genre}&page=${page}`);
    const series = await res.json();
    return series;
};

