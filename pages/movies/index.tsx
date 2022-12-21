import React, { FC, useEffect } from 'react';
import Head from 'next/head';

import Banner from '../../components/Banner';
import Nav from '../../components/Nav';
import { getPopular, getTopRated, getUpcoming } from '../../services/movie-service';
import { Movie } from '../../types';
import Carousel from '../../components/Carousel';
import { useBaseContext } from '../../contexts/baseContext';

type Props = {
    popular: Movie[];
    upcoming: Movie[];
    topRated: Movie[];
}

const Movies: FC<Props> = ({ popular, upcoming, topRated }) => {
    const { setSelected, setActiveType } = useBaseContext();

    useEffect(() => {
        setSelected(upcoming[0]?.backdrop_path ? upcoming[0] : upcoming[1]);
        setActiveType("movies");
    }, []);

    return (
        <>
            <Head>
                <title>Movies - TMDB</title>
            </Head>
            <div>
                <Banner />
                <Nav />
                <Carousel
                    title='Upcoming'
                    description='Upcoming & New Movies'
                    movies={upcoming}
                />
                <Carousel
                    title='Popular'
                    description='Most Popular Movies'
                    movies={popular}
                />
                <Carousel
                    title='Top Rated'
                    description='Top Rated Movies'
                    movies={topRated}
                />
            </div>
        </>
    )
}

export const getServerSideProps = async () => {
    const popular = await getPopular();
    const upcoming = await getUpcoming();
    const topRated = await getTopRated();

    return {
        props: {
            popular: popular.results,
            upcoming: upcoming.results,
            topRated: topRated.results
        }
    }
};

export default Movies;