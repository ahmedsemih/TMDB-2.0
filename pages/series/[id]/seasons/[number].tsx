import Head from 'next/head';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Episode from '../../../../components/episode';
import Drawer from '../../../../components/episode/drawer';

import ImageBg from '../../../../components/ImageBg';
import { getSeasonDetails, getTvShowDetails } from '../../../../services/tv-service';
import { Tv, TvSeason } from '../../../../types';
import { tmdbImageUrl } from '../../../../utils/constants';

type Props = {
    title: string;
    details: Tv;
    season: TvSeason;
}

const Season: FC<Props> = ({ title, details, season }) => {
    const [open, setOpen] = useState(0);

    const handleOpen = (episodeNumber: number) => {
        setOpen(episodeNumber)
    }

    const handleClose = () => {
        setOpen(-9);
    };

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <ImageBg
                    imageUrl={tmdbImageUrl + details.backdrop_path}
                    lgHeight='30vh'
                    mdHeight='50vh'
                >
                    <div className='py-5 px-6 w-full'>
                        <Link
                            href={`/series/${details.id}`}
                            className='md:text-5xl sm:text-3xl text-2xl font-semibold pb-3 w-fit'
                        >
                            {`${details.name} : ${season.name}`}
                        </Link>
                        <div className='text-lg md:text-xl text-neutral-400 flex flex-col sm:flex-row justify-center sm:justify-start mb-5'>
                            {
                                details.genres.map((genre, index) => {
                                    return (
                                        <p
                                            className={index !== 0 ? "ml-1" : "ml-0"}
                                            key={index}
                                        >
                                            {index === details.genres.length - 1 ? genre.name : genre.name + ","}
                                        </p>
                                    )
                                })
                            }
                            <p className='md:ml-2 hidden md:inline'> - {season.episodes.length} Episodes </p>
                        </div>
                        <Link
                            className='text-xl py-2 flex items-center'
                            href={`/series/${details.id}/seasons`}>
                            <FaArrowLeft className='mr-2' />
                            Back to seasons
                        </Link>
                    </div>
                </ImageBg>
                <div className='px-6 py-3'>
                    <h2 className='text-2xl md:text-3xl font-semibold my-5'>
                        Episodes
                        <span className='text-neutral-500'> ({season.episodes.length})</span>
                    </h2>
                    {
                        season.episodes.length > 0
                            ?
                            season.episodes.map((episode: TvSeason["episodes"][0], index) => {
                                return (
                                    <div className='bg-neutral-800 my-3 px-3' key={episode.id}>
                                        <Episode episode={episode} />
                                        {
                                            open === episode.episode_number
                                                ?
                                                <Drawer season={season} index={index} handleClose={handleClose} />
                                                :
                                                <div className='
                                                        flex
                                                        justify-center
                                                        border-t-2
                                                        border-neutral-700
                                                        py-1
                                                        hover:bg-neutral-700
                                                        transition-all
                                                        duration-200
                                                        cursor-pointer
                                                    '
                                                >
                                                    <MdKeyboardArrowDown className='text-3xl w-full' onClick={() => handleOpen(episode.episode_number)} />
                                                </div>
                                        }
                                    </div>
                                )
                            })
                            :
                            <p> Sorry, somethings went wrong. There are any episodes here. </p>
                    }
                </div>
            </div>
        </>
    )
};

export const getServerSideProps = async ({ params }: any) => {
    const { id, number } = await params;
    const details = await getTvShowDetails(id);
    const season = await getSeasonDetails(id, number);
    const title = `${details.name} - Season ${number}`;

    return {
        props: {
            title,
            details,
            season
        }
    }
};

export default Season;