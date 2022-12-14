import Head from 'next/head';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

import ImageBg from '../../../components/ImageBg';
import Pagination from '../../../components/Pagination';
import Reviews from '../../../components/reviews';
import { getMovieDetails } from '../../../services/movie-service';
import { Movie } from '../../../types';
import { tmdbImageUrl } from '../../../utils/constants';

type Props = {
    title:string;
    movie:Movie;
    page:number;
}

const MovieReviews:FC<Props> = ({movie, title, page}) => {
    const [totalPages, setTotalPages] = useState(1);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <ImageBg
                    imageUrl={tmdbImageUrl + movie?.backdrop_path}
                    lgHeight='30vh'
                    mdHeight='50vh'
                >
                    <div className='py-5 px-6 w-full'>
                        <Link
                            href={`/movies/${movie.id}`}
                            className='md:text-5xl sm:text-3xl text-2xl font-semibold pb-3 w-fit'
                        >
                            {movie.title}
                            <span className='text-neutral-500 ml-2'>
                                ({movie?.release_date?.slice(0, 4)})
                            </span>
                        </Link>
                        <div className='text-lg md:text-xl text-neutral-400 flex flex-col sm:flex-row justify-center sm:justify-start mb-5'>
                            {
                                movie.genres.map((genre, index) => {
                                    return (
                                        <p
                                            className={`${index !== 0 ? "ml-1" : "ml-0"} mt-2`}
                                            key={index}
                                        >
                                            {index === movie.genres.length - 1 ? genre.name : genre.name + ","}
                                        </p>
                                    )
                                })
                            }
                        </div>
                        <Link
                            className='text-xl py-2 flex items-center'
                            href={`/movies/${movie?.id}`}>
                            <FaArrowLeft className='mr-2' />
                            Back to main
                        </Link>
                    </div>
                </ImageBg>
                <div className='py-5 xl:min-h-[50vh]'>
                    <Reviews id={movie.id} type="movies" page={page} onReviewsPage={true} setTotalPages={setTotalPages} />
                </div>
                <Pagination id={movie.id} page={page} totalPages={totalPages} />
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
    const movie = await getMovieDetails(id);
    const title = `${movie.title} - Reviews`;

    return {
        props: {
            title,
            movie,
            page: currentPage
        }
    }
}

export default MovieReviews;