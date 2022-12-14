import Head from 'next/head';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { FaArrowLeft, FaStar } from 'react-icons/fa';

import ImageBg from '../../../components/ImageBg';
import { getTvShowDetails } from '../../../services/tv-service';
import { Tv } from '../../../types';
import { tmdbImageUrl } from '../../../utils/constants';
import Reviews from '../../../components/reviews';
import Pagination from '../../../components/Pagination';

type Props = {
    title: string;
    series: Tv;
    page: number;
}

const TvReviews: FC<Props> = ({ title, series, page }) => {
    const [totalPages, setTotalPages] = useState(1);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <ImageBg
                    imageUrl={tmdbImageUrl + series?.backdrop_path}
                    lgHeight='30vh'
                    mdHeight='50vh'
                >
                    <div className='py-5 px-6 w-full'>
                        <Link
                            href={`/series/${series.id}`}
                            className='md:text-5xl sm:text-3xl text-2xl font-semibold pb-3 w-fit'
                        >
                            {series.name}
                            <span className='text-neutral-500 ml-2'>
                                ({series.first_air_date.slice(0, 4)})
                            </span>
                        </Link>
                        <div className='text-lg md:text-xl text-neutral-400 flex flex-col sm:flex-row justify-center sm:justify-start mb-5'>
                            {
                                series.genres.map((genre, index) => {
                                    return (
                                        <p
                                            className={`${index !== 0 ? "ml-1" : "ml-0"} mt-2`}
                                            key={index}
                                        >
                                            {index === series.genres.length - 1 ? genre.name : genre.name + ","}
                                        </p>
                                    )
                                })
                            }
                        </div>
                        <Link
                            className='text-xl py-2 flex items-center'
                            href={`/series/${series?.id}`}>
                            <FaArrowLeft className='mr-2' />
                            Back to main
                        </Link>
                    </div>
                </ImageBg>
                <div className='py-5 xl:min-h-[50vh]'>
                    <Reviews id={series.id} type="tv" page={page} onReviewsPage={true} setTotalPages={setTotalPages} />
                </div>
                <Pagination id={series.id} page={page} totalPages={totalPages} />
            </div>
        </>
    )
}

export const getServerSideProps = async ({ params, query }: any) => {
    const { id } = await params;
    var currentPage = 1;
    if (query.page) {
        const { page } = await query;
        currentPage = page;
    }
    const series = await getTvShowDetails(id);
    const title = `${series.name} - Reviews`;

    return {
        props: {
            title,
            series,
            page: currentPage
        }
    }
}

export default TvReviews;