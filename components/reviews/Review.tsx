import Image from 'next/image';
import React, { FC } from 'react';
import moment from 'moment';
import {FaStar} from 'react-icons/fa';

import { Reviews } from '../../types';
import { tmdbImageUrl } from '../../utils/constants';

type Props = {
    review:Reviews["results"][0];
}

const Review:FC<Props> = ({review}) => {
    return (
        <div className='flex flex-col md:flex-row bg-neutral-800 m-3 pl-3 pt-1'>
            <div className='min-w-[100px] min-h-[100px] ml-3 sm:ml-1 mt-5 rounded-md'>
                <Image src={
                    review?.author_details?.avatar_path
                        ?
                        (
                            review?.author_details?.avatar_path.includes("http")
                                ?
                                review?.author_details?.avatar_path.slice(1)
                                :
                                tmdbImageUrl + review?.author_details?.avatar_path
                        )
                        :
                        "https://res.cloudinary.com/dtzs4c2uv/image/upload/v1666326774/noavatar_rxbrbk.png"
                } alt="avatar" width={100} height={100} />
            </div>
            <div className='p-3'>
                <div className='flex sm:items-center flex-col sm:flex-row items-start'>
                <p className='text-2xl font-bold capitalize mr-5'>
                    {review.author_details.username}
                </p>
                {
                    review.author_details.rating
                    &&
                    <div className='flex items-center text-2xl'>
                    <FaStar className='text-yellow-400' />
                    <p className='ml-1 font-bold'>{review.author_details.rating?.toFixed(1)}</p>
                    </div>
                }
                </div>
                <p className='text-neutral-400 text-md'>
                    {moment(review.updated_at).format("DD MMMM YYYY")}
                </p>
                <p className='text-xl mt-3 overflow-hidden'>
                    {review.content}
                </p>
            </div>
        </div>
    )
}

export default Review;