import { IconType } from "react-icons";

// NAV ITEM
export type NavItem = {
  name: string;
  path: string;
  Icon: IconType;
};

// MOVIE
export type Movie = {
  title: string;
  backdrop_path: string;
  budget: number;
  homepage: string;
  media_type?: string;
  release_date?: string;
  first_air_date: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  production_companies: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }
  ];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  revenue?: number;
  runtime: number;
  status: string;
  tagline: string;
  video: boolean;
};

// CREDIT
export type Credit = {
  id: number;
  cast: {
    adult: boolean;
    gender?: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path?: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  };
  crew: {
    adult: boolean;
    gender?: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path?: string;
    department: string;
    job: string;
    credit_id: string;
  };
};

// GENRE
export type Genre = {
  id: number;
  name: string;
};

// USER
export type User = {
  avatar: {
    gravatar: {
      hash: string;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
};

// REVIEWS
export type Reviews = {
  id: number;
  page: number;
  results: [
    {
      author: string;
      author_details: {
        name: string;
        username: string;
        avatar_path?: string;
        rating?: number;
      };
      content: string;
      created_at: string;
      id: string;
      updated_at: string;
      url: string;
    }
  ];
  total_pages: number;
  total_results: number;
};

// TV
export type Tv = {
  backdrop_path?: string;
  created_by: [
    {
      id: number;
      credit_id: string;
      name: string;
      gender: number;
      profile_path?: string;
    }
  ];
  episode_run_time: number[];
  first_air_date: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path?: string;
    vote_average: number;
    vote_count: number;
  };
  name: string;
  next_episode_to_air: null;
  networks: [
    {
      name: string;
      id: number;
      logo_path?: string;
      origin_country: string;
    }
  ];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  production_companies: [
    {
      id: number;
      logo_path?: string;
      name: string;
      origin_country: string;
    }
  ];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  seasons: [
    {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string;
      season_number: number;
    }
  ];
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }
  ];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

// TV SEASON
export type TvSeason = {
  _id: string;
  air_date: string;
  episodes: [
    {
      air_date: string;
      episode_number: number;
      crew: [
        {
          department: string;
          job: string;
          credit_id: string;
          adult?: boolean;
          gender: number;
          id: number;
          known_for_department: string;
          name: string;
          original_name: string;
          popularity: number;
          profile_path?: string;
        }
      ];
      guest_stars: [
        {
          credit_id: number;
          order:number;
          character:string;
          adult:boolean;
          gender?:number;
          id:number;
          known_for_department:string;
          name:string;
          original_name:string;
          popularity:number;
          profile_path?:string;
        }
      ];
      id: number;
      name: string;
      overview: string;
      production_code: string;
      season_number: number;
      still_path: string;
      vote_average: number;
      vote_count: number;
    }
  ];
  name: string;
  overview: string;
  id: number;
  poster_path?: string;
  season_number: number;
};

// PERSON
export type Person={
  birthday?:string;
  known_for_department:string;
  deathday?:string;
  id:number;
  name:string;
  also_known_as:string[];
  gender:number;
  biography:string;
  popularity:number;
  place_of_birth:string;
  profile_path?:string;
  adult:boolean;
  imdb_id:string;
  homepage?:string;
}
