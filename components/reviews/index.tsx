import Link from 'next/link';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

import { getMovieReviews } from '../../services/movie-service';
import { getTvShowReviews } from '../../services/tv-service';
import { Reviews } from '../../types';
import Review from './Review';

type Props = {
    id: number;
    type: string;
}

const Reviews: FC<Props> = ({ id, type }) => {
    const [reviews, setReviews]: [Reviews | any, Dispatch<SetStateAction<Reviews | any>>] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            if (type === "movie") {
                const reviews = await getMovieReviews(id, 1);
                setReviews(reviews);
            } else {
                const reviews = await getTvShowReviews(id, 1);
                setReviews(reviews);
            }
        };
        fetchReviews();
    }, [id])

    return (
        <div className='px-3'>
            <div className='flex sm:items-end flex-col sm:flex-row'>
                <h2 className='text-3xl pl-3 font-bold mr-5'>Reviews</h2>
                <Link
                    href={`/movies/${id}/reviews`}
                    className="flex items-center hover:text-sky-200 transition duration-200 text-xl pl-3 sm:p-0"
                >
                    See all reviews {`(${reviews?.results.length})`}
                    <FaChevronRight className='text-sm mt-1 ml-2' />
                </Link>

            </div>
            <div>
                {
                    reviews?.results.length > 0
                        ?
                        reviews?.results.slice(0, 3).map((review: Reviews["results"][0], index: number) => {
                            return (
                                <Review review={review} key={index} />
                            )
                        })
                        :
                        <p className='text-2xl pl-3 py-3'>There is no reviews yet.</p>
                }
            </div>
        </div>
    )
}

export default Reviews;