import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import { MdFavorite, MdStar } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
import secureLocalStorage from 'react-secure-storage';

import { useAuthContext } from '../../contexts/authContext';
import { watchlistStatus } from '../../services/user-service';
import { tmdbImageUrl } from '../../utils/constants';
import { Tv } from '../../types';
import checkWatchlist from '../../utils/checkWatchlist';
import { BsFillBookmarkDashFill, BsFillBookmarkPlusFill } from 'react-icons/bs';

type Props = {
    tv?: Tv;
}

const TvDetails: FC<Props> = ({ tv }) => {
    const { user } = useAuthContext();
    const [isOnWatchlist, setIsOnWatchlist] = useState(false);

    useEffect(() => {

        // Checking watchlist status
        checkWatchlist("series", user?.id, tv?.id!)
            .then((result: boolean) => {
                setIsOnWatchlist(result);
            });
    }, [tv?.id, setIsOnWatchlist]);

    const handleClickRate = () => { };

    const handleClickFavorite = () => { };

    const handleClickWatchlist = () => {
        const sessionId = secureLocalStorage.getItem("session_id")?.toString();
        if (!sessionId) return;

        watchlistStatus(user?.id, sessionId, "tv", tv?.id!, !isOnWatchlist);
        setIsOnWatchlist(prev => !prev);
    };

    return (
        <div className='flex flex-col lg:flex-row py-5 md:py-16'>
            <div className='flex flex-col md:flex-row px-6'>
                <Image
                    src={tmdbImageUrl + tv?.poster_path}
                    alt={tv?.name ? tv?.name : "tv"}
                    className="mx-auto my-3 w-60 sm:w-64 md:w-72 lg:w-[500px] h-auto max-h-[500px]"
                    width={250}
                    height={500}
                />
                <div className='md:mx-5 flex-col flex justify-between text-center md:text-start'>
                    <div>
                        <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold mt-2'>
                            {`${tv?.name} (${tv?.first_air_date?.slice(0, 4)})`}
                        </h1>
                        <div className='text-xl text-neutral-400 flex flex-col sm:flex-row justify-center md:justify-start'>
                            {
                                tv?.genres?.map((genre, index) => {
                                    return (
                                        <p
                                            className={index !== 0 ? "ml-1" : "ml-0"}
                                            key={index}>{index === tv?.genres.length - 1 ? genre.name : genre.name + ","}
                                        </p>
                                    )
                                })
                            }
                            {
                                tv?.episode_run_time[0]
                                &&
                                <p>
                                    - {tv?.episode_run_time[0]}m
                                </p>
                            }
                        </div>
                    </div>
                    <div>
                        {
                            tv?.tagline
                            &&
                            <p className='text-neutral-300 text-2xl my-5 font-semibold'>
                                "{tv?.tagline}"
                            </p>
                        }
                        <p className='text-xl lg:w-2/3 xl:w-1/2 mt-5'>
                            {tv?.overview}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between md:justify-start mt-16">
                        {
                            tv?.created_by.map((creator) => {
                                return (
                                    <div className='text-xl flex flex-col my-5 sm:mr-10' key={creator.id}>
                                        <h5 className='font-semibold text-xl text-center'>Creator</h5>
                                        <p className='text-center'>{creator.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='flex flex-row lg:flex-col md:px-3 justify-between m-3 md:m-0'>
                {
                    tv?.homepage
                    &&
                    <Link
                        href={tv.homepage}
                        rel="noreferrer"
                        target="_blank"
                        className='md:my-5 m-3 hover:text-sky-200 transition duration-200'
                    >
                        <TbWorld className='text-5xl' />
                    </Link>
                }
                <button
                    onClick={handleClickWatchlist}
                    className={`md:my-5 m-3 hover:text-sky-200 transition duration-200 ${isOnWatchlist && "text-sky-300"}`}
                >
                    {
                        isOnWatchlist
                            ?
                            <BsFillBookmarkDashFill className='text-5xl' />
                            :
                            <BsFillBookmarkPlusFill className='text-5xl' />
                    }
                </button>
                <button
                    onClick={handleClickFavorite}
                    className='md:my-5 m-3 hover:text-sky-200 transition duration-200'
                >
                    <MdFavorite className='text-5xl' />
                </button>
                <button
                    onClick={handleClickRate}
                    className='md:my-5 m-3 hover:text-sky-200 transition duration-200'
                >
                    <MdStar className='text-5xl' />
                </button>
            </div>
        </div>
    )
}

export default TvDetails;