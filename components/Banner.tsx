import Image from 'next/image';
import { FaStar, FaClock } from 'react-icons/fa'

import { tmdbImageUrl } from '../utils/constants';
import Link from 'next/link';
import { useBaseContext } from '../contexts/baseContext';

const Banner = () => {
  const { selected, activeType } = useBaseContext();

  return (
    <div
      className={`
      flex
      flex-col
      space-y-2
      py-16
      md:space-y-4
      lg:h-[65vh]
      ${selected ? "lg:justify-end" : "lg:justify-center"}
      lg:pb-12 mt-10`
      }>
      {
        selected !== null
          ?
          <>
            <div className="absolute top-0 left-0 -z-10 h-[100vh] w-screen">
              <Image
                className='object-cover mt-15 sm:pt-0 overflow-x-hidden'
                fill
                src={tmdbImageUrl + selected?.backdrop_path || tmdbImageUrl + selected?.poster_path}
                alt="TMDB"
              />
            </div>
            <div className='py-10 group xl:w-1/2 md:w-2/3 px-1 md:pl-4'>
              <h1
                className="
                  text-2xl 
                  font-bold 
                  md:text-4xl 
                  lg:text-6xl 
                  xl:text-7xl 
                  mb-3 
                  group-hover:bg-[rgba(16,16,16,.6)] 
                  w-fit 
                  px-2 
                  py-1
                  transition-all duration-200"
              >
                {selected?.title || selected?.name || selected?.original_name}
              </h1>
              {
                selected?.overview
                &&
                <p
                  className="
                    max-w-xs 
                    text-sm 
                    text-shadow-md 
                    md:max-w-lg 
                    py-1 
                    md:text-lg 
                    lg:max-w-xl 
                    lg:text-xl
                    xl:text-2xl
                    xl:max-w-2xl
                    mb-5
                    px-2
                    group-hover:bg-[rgba(16,16,16,.6)]
                    transition-all
                    duration-200"
                >
                  {selected?.overview}
                </p>
              }
              <div
                className="
                  flex
                  space-x-3
                  group-hover:bg-[rgba(16,16,16,.6)]
                  w-fit
                  px-2
                  py-1
                  transition-all
                  duration-200"
              >
                <Link
                  href={`${activeType}/${selected?.id}`}
                  className="
                  bg-[gray]/70
                  px-8
                  py-3
                  rounded-md
                  hover:bg-gray-500
                  transition
                  duration-200"
                >
                  More Info
                </Link>
                {
                  selected?.vote_average === 0
                    ?
                    <div className='flex sm:flex-row flex-col items-center justify-center sm:justify-start'>
                      <FaClock className='text-2xl mr-2' />
                      <p className='text-lg sm:text-2xl'> {selected?.release_date}</p>
                    </div>
                    :
                    <div className='flex items-center text-2xl md:text-3xl'>
                      <FaStar className='ml-3 mr-2 text-yellow-400' />
                      <p>{selected?.vote_average?.toFixed(1)}</p>
                    </div>
                }
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