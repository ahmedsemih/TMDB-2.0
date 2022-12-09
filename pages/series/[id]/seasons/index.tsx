import moment from 'moment';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import ImageBg from '../../../../components/ImageBg';
import { getSeasonDetails, getTvShowDetails } from '../../../../services/tv-service';
import { Tv, TvSeason } from '../../../../types';
import { tmdbImageUrl } from '../../../../utils/constants';
import delay from '../../../../utils/delay';

type Props = {
    title: string;
    details: Tv;
    seasons: TvSeason[];
}

const Seasons: FC<Props> = ({ title, details, seasons }) => {
    const router = useRouter();
    const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(true);

    useEffect(() => {
        delay(1000, () => setLoading(false));
    }, []);

    const handleClickSeason = (seasonNumber: number) => {
        if (window.innerWidth > 1024) return;
        router.push(`/series/${details.id}/seasons/${seasonNumber}`);
    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="min-h-[82vh]">
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
                            {details.name}
                        </Link>
                        <div className='text-lg md:text-xl text-neutral-400 flex flex-col sm:flex-row justify-center sm:justify-start'>
                            {
                                details.genres.map((genre, index) => {
                                    return (
                                        <p
                                            className={index !== 0 ? "ml-1" : "ml-0"}
                                            key={index}>{index === details.genres.length - 1 ? genre.name : genre.name + ","}
                                        </p>
                                    )
                                })
                            }
                            <p className='md:ml-2 hidden md:inline'> - {details.number_of_seasons} Seasons / {details.number_of_episodes} Episodes </p>
                        </div>
                    </div>
                </ImageBg>
                <div className='px-6'>
                    {
                        seasons?.map((season: TvSeason) => {
                            return (
                                <div
                                    className="bg-neutral-800 flex flex-col sm:flex-row my-3 p-3 cursor-pointer lg:cursor-auto hover:bg-neutral-700 lg:hover:bg-neutral-800"
                                    key={season.id}
                                    onClick={() => handleClickSeason(season.season_number)}
                                >
                                    {
                                        loading
                                            ?
                                            <Image
                                                className='mx-auto sm:mx-0'
                                                src={tmdbImageUrl + season.poster_path}
                                                alt={season.name}
                                                width={150}
                                                height={200}
                                            />
                                            :
                                            <div className='bg-neutral-600 w-[150px] h-[200px]' />
                                    }
                                    <div className='px-3 flex flex-col justify-between'>
                                        <div>
                                            <h2 className='text-xl md:text-3xl'>{season.name}
                                                {
                                                    season.air_date && ` (${season?.air_date?.slice(0, 4)})`
                                                }
                                            </h2>
                                            <p className='text-lg md:text-xl text-neutral-500'>
                                                {season?.episodes.length} Episodes
                                            </p>
                                            <p className='text-lg md:text-xl mt-3 sm:max-h-[90px] max-h-fit overflow-y-hidden'>
                                                {
                                                    season.overview
                                                        ?
                                                        season.overview
                                                        :
                                                        `${season.name} of ${details.name} primiered on ${season?.air_date ? moment(season?.air_date).format("MMMM DD, YYYY") : "soon"}.`
                                                }
                                            </p>
                                        </div>
                                        <Link
                                            className='bg-neutral-600 px-5 py-2 rounded-sm w-fit hidden lg:block'
                                            href={`/series/${details.id}/seasons/${season.season_number}`}
                                        >
                                            More Info
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async ({ params }: any) => {
    const { id } = await params;
    const details: Tv = await getTvShowDetails(id);
    const seasons: TvSeason[] = [];
    const title = `${details.name} - Seasons`

    for (let i = 1; i <= details.number_of_seasons; i++) {
        seasons.push(await getSeasonDetails(id, i));
    }

    return {
        props: {
            title,
            details,
            seasons
        }
    }
};

export default Seasons;