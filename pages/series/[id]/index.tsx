import React, { FC, useEffect, useState } from 'react';
import { FaChevronRight, FaStar } from 'react-icons/fa';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';

import About from '../../../components/about';
import Carousel from '../../../components/Carousel';
import Reviews from '../../../components/reviews';
import { getSeasonDetails, getSimilar, getTvShowCredits, getTvShowDetails } from '../../../services/tv-service';
import { Tv, TvSeason } from '../../../types';
import { tmdbImageUrl } from '../../../utils/constants';

type Props = {
    id: number;
    title: string;
    tv: Tv;
    credits: any;
    lastSeason: TvSeason;
}

const Series: FC<Props> = ({ id, title, tv, credits, lastSeason }) => {
    const [similar, setSimilar]: any = useState([]);

    useEffect(() => {
        const fetchSimilar = async () => {
            const series = await getSimilar(id, 1);
            setSimilar(series.results);
        }
        fetchSimilar();
    }, [id]);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <About tv={tv} />
                {
                    lastSeason.poster_path
                    &&
                    <div className='flex flex-col xl:flex-row mt-5'>
                        <div className='px-3 my-3 flex flex-col xl:w-[50%]'>
                            <div className='flex xl:items-end flex-col xl:flex-row'>
                                <h2 className='text-3xl inline font-bold ml-3'>Last Season</h2>
                                <Link href={`/series/${id}/seasons`} className='text-xl flex items-center ml-3'>
                                    See All Seasons
                                    <FaChevronRight className='text-sm mt-1 ml-2' />
                                </Link>
                            </div>
                            <div className='bg-neutral-800 flex flex-col md:flex-row p-3 m-3 md:h-[250px]'>
                                <Image
                                    className='m-5 md:m-0' src={tmdbImageUrl + lastSeason?.poster_path}
                                    alt={lastSeason?.name || "season"}
                                    width={150}
                                    height={500}
                                />
                                <div className='px-5 flex flex-col justify-between'>
                                    <div>
                                        <Link
                                            href={`/series/${id}/seasons/${lastSeason?.season_number}`}
                                            className='text-2xl font-semibold'
                                        >
                                            <span>{`${lastSeason?.name} (${moment(lastSeason?.air_date).format("YYYY")})`}</span>
                                            <span className='text-xl my-3 font-semibold ml-3 text-neutral-500'>
                                                {lastSeason?.episodes.length} Episodes
                                            </span>
                                        </Link>
                                        <p className='text-xl overflow-hidden md:h-[145px]'>
                                            {
                                                lastSeason?.overview !== ""
                                                    ?
                                                    lastSeason?.overview
                                                    :
                                                    `${lastSeason?.name} of ${tv?.name} primiered on ${moment(lastSeason?.air_date).format("MMMM DD, YYYY")}.`
                                            }
                                        </p>
                                    </div>
                                    <Link
                                        className='text-2xl bg-neutral-700 px-3 py-2 w-fit rounded-sm transition-all duration-200 hover:bg-gray-500'
                                        href={`/series/${id}/seasons/${lastSeason?.season_number}`}
                                    >
                                        More Info
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='px-3 my-3 flex flex-col xl:w-[50%]'>
                            <h2 className='text-3xl mr-3 inline font-bold ml-3'>Last Episode</h2>
                            <div className='bg-neutral-800 flex flex-col md:flex-row p-3 m-3 md:h-[250px]'>
                                <Image
                                    className='m-2 sm:m-5 md:m-0'
                                    src={tmdbImageUrl + tv?.last_episode_to_air.still_path}
                                    alt={tv?.last_episode_to_air.name || "season"}
                                    width={250}
                                    height={500}
                                />
                                <div className='px-5 flex flex-col justify-between'>
                                    <div>
                                        <h3
                                            className='text-2xl font-semibold'
                                        >{`${tv?.last_episode_to_air.name} (${tv?.last_episode_to_air.air_date.slice(0, 4)})`}
                                        </h3>
                                        <p className='text-xl overflow-hidden md:h-[115px]'>
                                            {tv?.last_episode_to_air.overview}
                                        </p>
                                    </div>
                                    <div className='flex font-semibold text-xl my-3'>
                                        <Link
                                            className='mr-5'
                                            href={`/series/${id}/seasons/${tv?.last_episode_to_air.season_number}`}
                                        >
                                            Season {tv?.last_episode_to_air.season_number}
                                        </Link>
                                        <p>
                                            Episode {tv?.last_episode_to_air.episode_number}
                                        </p>
                                    </div>
                                    <p className='text-2xl flex items-center font-semibold'>
                                        <FaStar className='mr-2 text-yellow-400' />
                                        {tv?.last_episode_to_air.vote_average.toFixed(1)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <Carousel cast={credits.cast} title="Cast" description='Actors & Actresses' />
                <Reviews id={id} type="series" />
                {
                    similar && <Carousel movies={similar} title="Similar Series" description="Similar Series & TV Shows" />
                }
            </div>
        </>
    )
}

export const getServerSideProps = async ({ params }: any) => {
    const { id } = await params;
    const tv = await getTvShowDetails(id);
    const credits = await getTvShowCredits(id);
    const lastSeason = await getSeasonDetails(id, tv?.number_of_seasons);
    const title = tv.name + " - TMDB";

    return {
        props: {
            id,
            title,
            tv,
            credits,
            lastSeason
        }
    }
};

export default Series;