import { Dispatch, SetStateAction, useState } from 'react';

import Banner from '../components/Banner';
import Carousel from '../components/Carousel';
import { discoverMovies, getTrending } from '../services/movie-service';
import { discoverTv } from '../services/tv-service';

const Home = ({ trending, movieDiscover, tvDiscover }: any) => {
  const [selected, setSelected]: [any, Dispatch<SetStateAction<any>>] = useState(0);

  return (
    <div>
      <Banner selected={selected} movie={trending.results[0].backdrop_path ? trending.results[0] : trending.results[1]} />
      <Carousel setSelected={setSelected} title='Trending' description='Trending Movies & Tv Series' movies={trending.results} />
      <Carousel setSelected={setSelected} title='Movie Discover' description='Discover New Movies' movies={movieDiscover.results} />
      <Carousel setSelected={setSelected} title='Tv Discover' description='Discover New Tv Series' movies={tvDiscover.results} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const trending = await getTrending();
  const movieDiscover = await discoverMovies();
  const tvDiscover = await discoverTv();

  return {
    props: {
      trending,
      movieDiscover,
      tvDiscover
    }
  }
};

export default Home;