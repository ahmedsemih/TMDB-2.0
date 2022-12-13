import React, { FC, useEffect } from 'react';

import Banner from '../components/Banner';
import Carousel from '../components/Carousel';
import { useBaseContext } from '../contexts/baseContext';
import { getPopular, getTrending } from '../services/movie-service';
import { getPopular as getPopularSeries } from '../services/tv-service';
import { getPopularPeople } from '../services/person-service';
import { Movie } from '../types';

type Props = {
    people:any;
    trending:Movie[];
    movies:Movie[];
    series:any;
}

const Trending:FC<Props> = ({people, trending, movies, series}) => {
    const {setSelected, setActiveType} = useBaseContext();

    useEffect(() => {
        if (trending[0].backdrop_path) {
          setSelected(trending[0]);
          setActiveType(trending[0].media_type === "tv" ? "series" : "movies");
        } else {
          setSelected(trending[1]);
          setActiveType(trending[1].media_type === "tv" ? "series" : "movies");
        }
      }, []);

  return (
    <div>
        <Banner />
        <Carousel title='Trending' description='Trending Movies & Tv Series' movies={trending} />
        <Carousel title='Popular People' description="Most Popular People" cast={people} />
        <Carousel title='Popular Movies' description='Most Popular Movies' movies={movies} />
        <Carousel title='Popular Series' description='Most Popular Series' movies={series} />
    </div>
  )
}

export const getServerSideProps = async () => {
    const people = await getPopularPeople(1);
    const trending = await getTrending();
    const movies = await getPopular(1);
    const series = await getPopularSeries(1);

    return {
        props:{
            people:people.results,
            trending:trending.results,
            movies:movies.results,
            series:series.results
        }
    }
}

export default Trending;