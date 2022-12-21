import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import secureLocalStorage from 'react-secure-storage';
import StarRating from 'react-star-ratings';
import { useAuthContext } from '../contexts/authContext';

import { rateMovie } from '../services/movie-service';
import { rateTvShow } from '../services/tv-service';
import checkRate from '../utils/checkRate';

type Props = {
    isVisible: boolean;
    setIsVisible: Dispatch<SetStateAction<boolean>>;
    type: string;
    contentId: number;
    setRate?: any;
}

const RateModal: FC<Props> = ({ isVisible, setIsVisible, type, contentId, setRate }) => {
    const {user} = useAuthContext();
    const [rating, setRating] = useState(0);

    useEffect(()=>{
        checkRate(type,user,contentId)
        .then((rate:number)=>{
            setRating(rate);
            setRate && setRate(rate);
        });
    },[]);

    const handleChange = (newRating: number) => {
        setRating(newRating);

        const sessionId = secureLocalStorage.getItem("session_id")?.toString();
        if (!sessionId) return;

        if (type === "movie") {
            rateMovie(contentId, sessionId, newRating);
        } else {
            rateTvShow(contentId, sessionId, newRating);
        }
    };

    if (!isVisible) return null;
    return (
        <div className='
            fixed
            inset-0
            bg-black
            bg-opacity-25
            backdrop-blur-sm
            flex
            justify-center
            items-center
            z-50'
        >
            <div className='bg-neutral-800 p-5 shadow-md rounded-md'>
                <div className='flex justify-between'>
                    <p className='text-2xl text-center mb-5 font-semibold w-[95%]'>
                        Rate This!
                    </p>
                    <IoMdClose className='text-3xl cursor-pointer' onClick={() => setIsVisible(false)} />
                </div>
                <StarRating
                    rating={rating}
                    starRatedColor="#fde047"
                    starEmptyColor='#525252'
                    starHoverColor='#fde047'
                    changeRating={handleChange}
                    numberOfStars={10}
                    starDimension="30"
                    name="rating"
                />
            </div>
        </div>
    )
}

export default RateModal;