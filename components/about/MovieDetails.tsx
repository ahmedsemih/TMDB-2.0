import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import { BsFillBookmarkDashFill, BsFillBookmarkPlusFill } from 'react-icons/bs';
import { MdFavorite, MdStar } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb'
import secureLocalStorage from 'react-secure-storage';

import { useAuthContext } from '../../contexts/authContext';
import { markAsFavorite, watchlistStatus } from '../../services/user-service';
import { Movie } from '../../types';
import checkFavorites from '../../utils/checkFavorites';
import checkWatchlist from '../../utils/checkWatchlist';
import { tmdbImageUrl } from '../../utils/constants';

type Props = {
    movie: Movie;
    director: any;
    writer: any;
}

const Details: FC<Props> = ({ movie, director, writer }) => {
    const { user } = useAuthContext();
    const [isOnWatchlist, setIsOnWatchlist] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {

        // Checking watchlist status
        checkWatchlist("movie", user?.id, movie?.id)
            .then((result: boolean) => {
                setIsOnWatchlist(result);
            });

        // Checking favorite status
        checkFavorites("movie", user?.id, movie?.id)
            .then((result: boolean) => {
                setIsFavorite(result);
            });
    }, [movie.id, user]);

    const handleClickWatchlist = () => {
        const sessionId = secureLocalStorage.getItem("session_id")?.toString();
        if (!sessionId) return;

        watchlistStatus(user?.id, sessionId, "movie", movie?.id, !isOnWatchlist);
        setIsOnWatchlist(prev => !prev);
    };

    const handleClickFavorite = () => {
        const sessionId = secureLocalStorage.getItem("session_id")?.toString();
        if (!sessionId) return;

        markAsFavorite(user?.id, sessionId, "movie", movie?.id, !isFavorite);
        setIsFavorite(prev => !prev);
    };

    const handleClickRate = () => { };

    return (
        <div className='flex flex-col lg:flex-row py-5 md:py-16'>
            <div className='flex flex-col md:flex-row px-6'>
                <Image
                    src={tmdbImageUrl + movie?.poster_path}
                    alt={movie?.name ? movie?.name : "movie"}
                    className="mx-auto my-3 w-60 sm:w-64 md:w-72 lg:w-[400px] h-auto max-h-[500px]"
                    width={250}
                    height={500}
                />
                <div className='md:mx-5 flex-col flex justify-between text-center md:text-start'>
                    <div>
                        <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold mt-2'>
                            {`${movie?.title} (${movie?.release_date?.slice(0, 4)})`}
                        </h1>
                        <div className='text-xl text-neutral-400 flex flex-col sm:flex-row justify-center md:justify-start'>
                            {
                                movie?.genres?.map((genre, index) => {
                                    return (
                                        <p
                                            className={index !== 0 ? "ml-1" : "ml-0"}
                                            key={index}>{index === movie?.genres.length - 1 ? genre.name : genre.name + ","}
                                        </p>
                                    )
                                })
                            }
                            <p>
                                - {(movie?.runtime / 60).toFixed(0)}h {movie?.runtime % 60}m
                            </p>
                        </div>
                    </div>
                    <div>
                        {
                            movie?.tagline
                            &&
                            <p className='text-neutral-300 text-2xl my-5 font-semibold'>
                                "{movie?.tagline}"
                            </p>
                        }
                        <p className='text-xl lg:w-2/3 xl:w-1/2 mt-5'>
                            {movie?.overview}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between md:justify-start mt-16">
                        {
                            director
                            &&
                            <div className='text-xl flex flex-col my-5 md:mr-5 xl:mr-10'>
                                <h5 className='font-semibold text-xl text-center'>Director</h5>
                                <p className='text-center'>{director}</p>
                            </div>
                        }
                        {
                            writer
                            &&
                            <div className='text-xl flex flex-col my-5'>
                                <h5 className='font-semibold text-xl text-center'>Writer</h5>
                                <p className='text-center'>{writer}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='flex flex-row lg:flex-col md:px-3 justify-between m-3 md:m-0'>
                {
                    movie?.homepage
                    &&
                    <Link
                        href={movie.homepage}
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
                    className={`md:my-5 m-3 hover:text-sky-200 transition duration-200 ${isFavorite && "text-sky-300"}`}
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

export default Details;