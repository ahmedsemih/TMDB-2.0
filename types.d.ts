import { IconType } from "react-icons";

export type NavItem = {
  name: string;
  path: string;
  Icon: IconType;
};

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

export type Genre = {
  id: number;
  name: string;
};

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
