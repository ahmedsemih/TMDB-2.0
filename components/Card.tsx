import { FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { tmdbImageUrl } from '../utils/constants';
import { Movie } from '../types';
import { getMovieDetails } from '../services/movie-service';
import { getTvShowDetails } from '../services/tv-service';
import { useBaseContext } from '../contexts/baseContext';
import delay from '../utils/delay';

type Props = {
  movie: Movie;
}

const Card: FC<Props> = ({ movie }) => {
  const router = useRouter();
  const { activeType, setSelected, setActiveType } = useBaseContext();

  const handleHover = async (movie: any) => {
    setSelected(null);

    const details = await getMovieDetails(movie.id);
    if (movie.name === details.name) {
      setActiveType("movies");
      if (details.backdrop_path) return delay(500, setSelected(details));
      setSelected(null);
    } else {
      setActiveType("series");
      const newDetails = await getTvShowDetails(movie.id);
      if (newDetails.backdrop_path) return delay(500, setSelected(newDetails));
      setSelected(null);
    }
  };

  return (
    <>
      {
        movie?.poster_path && movie?.overview
          ?
          <Image
            width={250}
            height={500}
            onMouseEnter={() => handleHover(movie)}
            onClick={() => router.push(`/${activeType}/${movie?.id}`)}
            className='w-[250px] h-[400px] md:h-[500px] mr-5 hover:scale-125 hover:shadow-xl cursor-pointer'
            src={tmdbImageUrl + movie?.poster_path} alt="TMDB" />
          :
          null
      }
    </>
  )
}
export default Card;