const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// PEOPLE
export const getPopularPeople = async (page:number = 1) => {
    const res = await fetch(`${API_BASE_URL}/person/popular?api_key=${API_KEY}&page=${page}`);
    const people = await res.json();
    return people;
};

// PERSON DETAILS
export const getPersonDetails = async (id:number) => {
    const res = await fetch(`${API_BASE_URL}/person/${id}?api_key=${API_KEY}`);
    const person = await res.json();
    return person;
};

export const getPersonAllCredits = async (id:number) => {
    const res = await fetch(`${API_BASE_URL}/person/${id}/combined_credits?api_key=${API_KEY}`);
    const credits = await res.json();
    return credits;
};

export const getPersonMovies = async (id:number) => {
    const res = await fetch(`${API_BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}`);
    const credits = await res.json();
    return credits;
};

export const getPersonSeries = async (id:number) => {
    const res = await fetch(`${API_BASE_URL}/person/${id}/tv_credits?api_key=${API_KEY}`);
    const credits = await res.json();
    return credits;
};