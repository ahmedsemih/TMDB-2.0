import React, { FC } from 'react';
import moment from 'moment';
import Image from 'next/image';

import { FaStar } from 'react-icons/fa';
import { TvSeason } from '../../types';
import { tmdbImageUrl } from '../../utils/constants';

type Props = {
    episode:TvSeason["episodes"][0];
}

const Episode: FC<Props> = ({ episode }) => {
    return (
        <div className='flex flex-col md:flex-row py-3'>
            <Image
                className='mb-5 md:mb-0'
                src={tmdbImageUrl + episode.still_path}
                alt={episode.name}
                width={250}
                height={200}
            />
            <div className='px-3 flex flex-col justify-between'>
                <div>
                    <h3 className='text-2xl font-semibold flex flex-col lg:flex-row'>
                        {episode.episode_number} - {episode.name}
                        <span className='lg:ml-3 text-neutral-500'>{moment(episode.air_date).format("DD.MM.YYYY")}</span>
                    </h3>
                    <p className='text-lg my-3 overflow-y-hidden md:max-h-[90px]'>
                        {
                            episode.overview
                                ?
                                episode.overview
                                :
                                `${episode.name} primiered on ${moment(episode.air_date).format("MMMM DD, YYYY")}.`
                        }
                    </p>
                </div>
                <div>
                    <p className='flex items-center text-xl'>
                        <FaStar className='mr-2 text-yellow-400' />
                        {episode.vote_average.toFixed(1)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Episode;