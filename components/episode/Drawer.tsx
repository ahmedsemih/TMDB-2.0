import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdKeyboardArrowUp } from 'react-icons/md';

import { TvSeason } from '../../types';
import { noAvatarImage, tmdbImageUrl } from '../../utils/constants';

type Props = {
  season: TvSeason;
  index: number;
  handleClose: VoidFunction;
}

const Drawer: FC<Props> = ({ season, index, handleClose }) => {

  return (
    <>
      <div className='h-auto border-t-2 border-neutral-700 flex flex-col md:flex-row'>
        <div className='p-3'>
          <h3 className='text-2xl font-semibold mb-3'>Crew</h3>
          <div className='flex flex-col md:w-64 lg:w-72 xl:w-80'>
            {
              season.episodes[index].crew.length > 0
              ?
              season.episodes[index].crew.map((crew) => {
                return (
                  <Link href={`/people/${crew.id}`} className='text-xl'>
                    <span className='font-semibold mr-1'>{crew.job}:</span>
                    {crew.name}
                  </Link>
                )
              })
              :
              <p className='text-lg'>
                No Data.
              </p>
            }
          </div>
        </div>
        <div className='p-3 w-[100%]'>
          <h3 className='text-2xl font-semibold mb-3'>Guest Star</h3>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3'>
            {
              season.episodes[index].guest_stars.length > 0
              ?
              season.episodes[index].guest_stars.map((star) => {
                return (
                  <Link href={`/people/${star.id}`} className='flex'>
                    <Image
                      className='w-[90px] h-[90px] object-cover'
                      src={
                        star.profile_path
                          ?
                          tmdbImageUrl + star.profile_path
                          :
                          noAvatarImage
                      }
                      alt={star.name} width={90} height={130} />
                    <div className='px-3 flex flex-col justify-center'>
                      <p className='text-xl font-semibold'>{star.name}</p>
                      <p className='text-xl'>{star.character}</p>
                    </div>
                  </Link>
                )
              })
              :
              <p className='text-lg'>
                No Data.
              </p>
            }
          </div>
        </div>
      </div>
      <div className='flex justify-center border-t-2 border-neutral-700 py-1 hover:bg-neutral-700 transition-all duration-200 cursor-pointer'
      >
        <MdKeyboardArrowUp className='text-3xl w-full' onClick={handleClose} />
      </div>
    </>
  )
}

export default Drawer;