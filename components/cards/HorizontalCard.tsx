import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import Image from 'next/image';
import { MdFavorite, MdStar, MdFavoriteBorder } from 'react-icons/md';
import { BsFillBookmarkDashFill, BsFillBookmarkPlusFill } from 'react-icons/bs';

import { Movie, Tv } from '../../types';
import { tmdbImageUrl } from '../../utils/constants';
import Link from 'next/link';
import checkWatchlist from '../../utils/checkWatchlist';
import { useAuthContext } from '../../contexts/authContext';
import { markAsFavorite, watchlistStatus } from '../../services/user-service';
import secureLocalStorage from 'react-secure-storage';
import checkFavorites from '../../utils/checkFavorites';
import RateModal from '../RateModal';

type Props = {
    movie?: Movie;
    series?: Tv;
}

const HorizontalCard: FC<Props> = ({ movie, series }) => {
    const { user } = useAuthContext();
    const [isOnWatchlist, setIsOnWatchlist] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [rate, setRate] = useState(0);

    useEffect(() => {
        const type = movie ? "movie" : "series";

        // Checking watchlist status
        checkWatchlist(type, user, movie ? movie?.id! : series?.id!)
            .then((result: boolean) => {
                setIsOnWatchlist(result);
            });

        // Checking favorite status
        checkFavorites(type, user, movie ? movie?.id! : series?.id!)
            .then((result: boolean) => {
                setIsFavorite(result);
            });

    }, [movie?.id, series?.id]);

    const handleClickWatchlist = (id: number) => {
        const sessionId = secureLocalStorage.getItem("session_id")?.toString();
        if (!sessionId) return;

        const type = movie ? "movie" : "tv";
        watchlistStatus(user?.id, sessionId, type, id, !isOnWatchlist);
        setIsOnWatchlist(prev => !prev);
    };

    const handleClickFavorite = (id: number) => {
        const sessionId = secureLocalStorage.getItem("session_id")?.toString();
        if (!sessionId) return;

        const type = movie ? "movie" : "tv";
        markAsFavorite(user?.id, sessionId, type, id, !isFavorite);
        setIsFavorite(prev => !prev);
    };

    const handleClickRate = () => {
        setIsVisible(true);
    };

    if (movie) {
        return (
            <>
                <div className='lg:w-[47vw] xl:w-[48vw] my-3 flex flex-col md:flex-row bg-neutral-800 rounded-md md:h-[300px]'>
                    <Image
                        className='rounded-l-md md:mx-0 mx-auto'
                        src={tmdbImageUrl + movie?.poster_path}
                        alt={movie?.title || "watchlist-item"}
                        width={200} height={400}
                    />
                    <div className='flex flex-col p-3 justify-between mt-5 md:mt-0'>
                        <div>
                            <Link href={`/movies/${movie?.id}`} className='text-2xl font-semibold flex flex-col sm:flex-row justify-between w-[100%]'>
                                <span>{movie.title}</span>
                                <span className='flex items-center font-semibold'>
                                    <MdStar className='mr-2 text-yellow-300' />
                                    {movie.vote_average.toFixed(1)}
                                </span>
                            </Link>
                            <p className='text-xl text-neutral-500'>{moment(movie.release_date).format("DD MMMM YYYY")}</p>
                            <p className='text-lg max-h-[115px] mt-3 overflow-y-hidden'>
                                {movie.overview}
                            </p>
                        </div>
                        <div className='flex justify-between mt-5'>
                            <button
                                onClick={() => handleClickWatchlist(movie?.id!)}
                                className='flex text-xl items-center hover:text-sky-200'
                            >
                                {
                                    isOnWatchlist
                                        ?
                                        <>
                                            <BsFillBookmarkDashFill className='text-3xl mr-1' />
                                            <span className='hidden sm:inline lg:hidden xl:inline font-semibold'>Remove</span>
                                        </>
                                        :
                                        <>
                                            <BsFillBookmarkPlusFill className='text-3xl mr-1' />
                                            <span className='hidden sm:inline lg:hidden xl:inline font-semibold'>Watchlist</span>
                                        </>
                                }
                            </button>
                            <button
                                onClick={() => handleClickFavorite(movie?.id!)}
                                className='flex text-xl items-center hover:text-sky-200'
                            >
                                {
                                    isFavorite
                                        ?
                                        <>
                                            <MdFavorite className='text-3xl mr-1' />
                                            <span className='hidden sm:inline lg:hidden xl:inline font-semibold'>Unfavorite</span>
                                        </>
                                        :
                                        <>
                                            <MdFavoriteBorder className='text-3xl mr-1' />
                                            <span className='hidden sm:inline lg:hidden xl:inline font-semibold'>Favorite</span>
                                        </>
                                }
                            </button>
                            <button
                                onClick={handleClickRate}
                                className='flex text-xl items-center hover:text-sky-200'
                            >
                                <MdStar className='text-3xl mr-1' />
                                <span className='hidden sm:inline lg:hidden xl:inline font-semibold'>{rate !== 0 ? rate : "Rate"}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <RateModal isVisible={isVisible} setIsVisible={setIsVisible} type="movie" contentId={movie?.id} setRate={setRate} />
            </>
        )
    } else {
        return (
            <>
                <div className='lg:w-[47vw] xl:w-[48vw] my-3 flex flex-col md:flex-row bg-neutral-800 rounded-md md:h-[300px]'>
                    <Image
                        className='rounded-l-md md:mx-0 mx-auto '
                        src={tmdbImageUrl + series?.poster_path}
                        alt={series?.name || "watchlist-item"}
                        width={200} height={400}
                    />
                    <div className='flex flex-col p-3 justify-between mt-5 md:mt-0'>
                        <div>
                            <Link href={`/series/${series?.id}`} className='text-2xl font-semibold flex flex-col sm:flex-row justify-between w-[100%]'>
                                <span>{series?.name}</span>
                                <span className='flex items-center font-semibold'>
                                    <MdStar className='mr-2 text-yellow-300' />
                                    {series?.vote_average.toFixed(1)}
                                </span>
                            </Link>
                            <p className='text-xl text-neutral-500'>{moment(series?.first_air_date).format("DD MMMM YYYY")}</p>
                            <p className='text-lg max-h-[115px] mt-3 overflow-y-hidden'>
                                {series?.overview}
                            </p>
                        </div>
                        <div className='flex justify-between mt-5'>
                            <button
                                onClick={() => handleClickWatchlist(series?.id!)}
                                className='flex text-xl items-center hover:text-sky-200'
                            >
                                {
                                    isOnWatchlist
                                        ?
                                        <>
                                            <BsFillBookmarkDashFill className='text-3xl mr-1' />
                                            <span className='hidden sm:inline lg:hidden xl:inline font-semibold'>Remove</span>
                                        </>
                                        :
                                        <>
                                            <BsFillBookmarkPlusFill className='text-3xl mr-1' />
                                            <span className='hidden sm:inline lg:hidden xl:inline font-semibold'>Watchlist</span>
                                        </>
                                }
                            </button>
                            <button
                                onClick={() => handleClickFavorite(series?.id!)}
                                className='flex text-xl items-center hover:text-sky-200'
                            >
                                {
                                    isFavorite
                                        ?
                                        <>
                                            <MdFavorite className='text-3xl mr-1' />
                                            <span className='hidden sm:inline lg:hidden xl:inline font-semibold'>Unfavorite</span>
                                        </>
                                        :
                                        <>
                                            <MdFavoriteBorder className='text-3xl mr-1' />
                                            <span className='hidden sm:inline lg:hidden xl:inline font-semibold'>Favorite</span>
                                        </>
                                }
                            </button>
                            <button
                                onClick={handleClickRate}
                                className='flex text-xl items-center hover:text-sky-200'
                            >
                                <MdStar className='text-3xl mr-1' />
                                <span className='hidden sm:inline lg:hidden xl:inline font-semibold'>{rate !== 0 ? rate : "Rate"}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <RateModal isVisible={isVisible} setIsVisible={setIsVisible} type="series" contentId={series?.id!} setRate={setRate} />
            </>
        )
    }
}

export default HorizontalCard;