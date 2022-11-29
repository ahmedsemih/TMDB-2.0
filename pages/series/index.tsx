import React, { FC, useEffect } from 'react';
import Head from 'next/head';

import Banner from '../../components/Banner';
import Nav from '../../components/Nav';
import { getPopular, getTopRated, getAiringToday, getTvOnTheAir } from '../../services/tv-service';
import { Movie } from '../../types';
import Carousel from '../../components/Carousel';
import { useBaseContext } from '../../contexts/baseContext';

type Props = {
    popular: Movie[];
    topRated: Movie[];
    airingToday: Movie[];
    onTheAir: Movie[];
}

const Series: FC<Props> = ({ popular, topRated, airingToday, onTheAir }) => {
    const { setSelected } = useBaseContext();

    useEffect(() => {
        setSelected(popular[0]?.backdrop_path ? popular[0] : popular[1])
    }, []);

    return (
        <>
            <Head>
                <title>Series - TMDB</title>
            </Head>
            <div>
                <Banner />
                <Nav />
                <Carousel
                    title='Popular'
                    description='Most Popular Series'
                    movies={popular}
                />
                <Carousel
                    title='Airing Today'
                    description="Today's Tv Contents"
                    movies={airingToday}
                />
                <Carousel
                    title='On The Air'
                    description="Current Series"
                    movies={onTheAir}
                />
                <Carousel
                    title='Top Rated'
                    description='Top Rated Series'
                    movies={topRated}
                />
            </div>
        </>
    )
}

export const getServerSideProps = async () => {
    const popular = await getPopular();
    const topRated = await getTopRated();
    const airingToday = await getAiringToday();
    const onTheAir = await getTvOnTheAir();

    return {
        props: {
            popular: popular.results,
            topRated: topRated.results,
            airingToday: airingToday.results,
            onTheAir: onTheAir.results
        }
    }
};

export default Series;