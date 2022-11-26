import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { tmdbImageUrl } from '../utils/constants';
import { Movie } from '../types';
import { getMovieDetails } from '../services/movie-service';
import { getTvShowDetails } from '../services/tv-service';

type Props = {
  movie: Movie;
  setSelected: Dispatch<SetStateAction<any>>;
}

const Card: FC<Props> = ({ movie, setSelected }) => {
  const router = useRouter();

  const handleHover = async (movie: any) => {
    setSelected(null);

    const details = await getMovieDetails(movie.id);
    if (movie.name === details.name) {
      if (details.backdrop_path) return setSelected(details);
      setSelected(null);
    } else {
      const newDetails = await getTvShowDetails(movie.id);
      if (newDetails.backdrop_path) return setSelected(newDetails);
      setSelected(null)
    }
  };

  return (
    <>
      {
          movie?.poster_path
          ?
          <Image
            width={250}
            height={500}
            onMouseEnter={() => handleHover(movie)}
            onClick={() => router.push(`/movie?id=${movie?.id}`)}
            className='mr-5 hover:scale-125 hover:shadow-xl cursor-pointer w-full sm:w-96'
            src={tmdbImageUrl + movie?.poster_path} alt="TMDB" />
          :
          null
      }
    </>
  )
}
export default Card;