import { FC, useEffect } from 'react';
import Banner from '../components/Banner';
import Carousel from '../components/Carousel';

import { useBaseContext } from '../contexts/baseContext';
import { discoverMovies, getTrending } from '../services/movie-service';
import { discoverTv } from '../services/tv-service';
import { Movie } from '../types';

type Props = {
  trending: Movie[];
  movieDiscover: Movie[];
  tvDiscover: Movie[];
}

const Home: FC<Props> = ({ trending, movieDiscover, tvDiscover }) => {
  const { setSelected, setActiveType } = useBaseContext();

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
      <Carousel title='Movie Discover' description='Discover New Movies' movies={movieDiscover} />
      <Carousel title='Tv Discover' description='Discover New Tv Series' movies={tvDiscover} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const trending = await getTrending();
  const movieDiscover = await discoverMovies();
  const tvDiscover = await discoverTv();

  return {
    props: {
      trending: trending.results,
      movieDiscover: movieDiscover.results,
      tvDiscover: tvDiscover.results
    }
  }
};

export default Home;