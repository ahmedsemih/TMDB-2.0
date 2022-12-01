import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useBaseContext } from '../contexts/baseContext';
import { getMovieGenres } from '../services/movie-service';
import { getTvGenres } from '../services/tv-service';
import { Genre } from '../types';

const Nav = () => {
    const [data, setData] = useState([]);
    const { activeType } = useBaseContext();

    // ACTIVATING BODY SCROLL AFTER LEAVING CAROUSEL
    const handleLeave = () => {
        const html = document.querySelector('html');
        if (html) {
            html.style.overflowY = 'auto';
            html.style.overflowX = 'hidden';
        };
    };

    // HORIZONTAL SCROLL ON MOVIE CAROUSEL
    const horizontalScroll = (e: any) => {
        const html = document.querySelector('html');
        if (html) html.style.overflowY = 'hidden';
        const delta = Math.max(-1, Math.min(1, (e.nativeEvent.wheelDelta || -e.nativeEvent.detail)));
        e.currentTarget.scrollLeft -= (delta * -100);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (activeType === "movie") {
                const movieGenres = await getMovieGenres();
                setData(movieGenres.genres);
            } else {
                const tvGenres = await getTvGenres();
                setData(tvGenres.genres);
            }
        }
        return () => {
            fetchData();
        }
    }, [activeType]);

    return (
        <nav className='relative border-y-2 border-neutral-800'>
            <div
                className="bg-[rgba(16,16,16,.8)] hover:bg-neutral-900 transition-all duration-200 py-4 flex items-center overflow-x-scroll scrollbar-hide whitespace-nowrap overflow-y-hidden"
                onWheel={horizontalScroll}
                onMouseLeave={handleLeave}
            >
                {
                    data && data?.map((genre: Genre) => {
                        return <Link href={`/search?type=${activeType}&genre=${genre.id}`} key={genre.id} className='text-2xl hover:text-sky-200 mx-6'>{genre.name}</Link>
                    })
                }
            </div>
            <div className="absolute right-0 top-0 bg-gradient-to-l from-neutral-900 h-16 w-8" />
            <div className="absolute left-0 top-0 bg-gradient-to-r from-neutral-900 h-16 w-8" />
        </nav>
    )
}

export default Nav;