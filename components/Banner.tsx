import Image from 'next/image';
import { FaStar } from 'react-icons/fa'

import { tmdbImageUrl } from '../utils/constants';
import { Movie } from '../types';
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

type Props = {
  movie: Movie;
  selected: any;
}

const Banner: FC<Props> = ({ movie, selected }) => {
  const [selectedMovie, setSelectedMovie] = useState(movie);

  useEffect(() => {
    if (selected !== null && selected !== 0) setSelectedMovie(selected);
  }, [selected]);

  return (
    <div className={`flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] ${selected ? "lg:justify-end" : "lg:justify-center"} lg:pb-12 mt-10 pl-6`}>
      {
        selected !== null
          ?
          <>
            <div className="absolute top-0 left-0 -z-10 h-[100vh] w-screen">
              <Image
                className='object-cover mt-15 sm:pt-0 overflow-x-hidden'
                fill
                src={tmdbImageUrl + selectedMovie?.backdrop_path || tmdbImageUrl + selectedMovie?.poster_path}
                alt="TMDB"
              />
            </div>
            <div className='py-10'>
              <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl mb-3">
                {selectedMovie?.title || selectedMovie?.name || selectedMovie?.original_name}
              </h1>
              <p className="max-w-xs text-sm text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl mb-5 hover:bg-[rgba(0,0,0,.3)]">
                {selectedMovie?.overview}
              </p>
              <div className="flex space-x-3">
                <Link
                  href={`movie?id=${selectedMovie?.id}`}
                  className="bannerButton bg-[gray]/70 px-8 py-3 rounded-md hover:bg-gray-500 transition duration-200"
                >
                  More Info
                </Link>
                <div className='flex items-center text-2xl md:text-3xl'>
                  <FaStar className='ml-3 mr-2 text-yellow-400' />
                  <p>{selectedMovie?.vote_average?.toFixed(1)}</p>
                </div>
              </div>
            </div>
          </>
          :
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 sm:w-28 sm:h-28 border-t-4 border-b-4 border-sky-600 rounded-full animate-spin"></div>
          </div>
      }
    </div>
  )
}

export default Banner;