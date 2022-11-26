import { Dispatch, FC, SetStateAction } from 'react';

import { Movie } from '../types';
import Card from './Card';

type Props = {
  title: string;
  description: string;
  movies: Movie[];
  setSelected: Dispatch<SetStateAction<Movie>>;
}

const Carousel: FC<Props> = ({ title, description, movies, setSelected }) => {

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

  return (
    <div className='bg-neutral-900 font-bold' >
      <div className='pt-8 pl-6 pb-1'>
        <h2 className='text-3xl mr-3 inline'>{title}</h2>
        <span className='text-neutral-500 text-xl hidden md:inline'>{description}</span>
      </div>
      <div
        className='flex overflow-y-hidden overflow-x-scroll scrollbar-hide whitespace-nowrap py-8 mx-6'
        onWheel={horizontalScroll}
        onMouseLeave={handleLeave}
      >
        {
          movies.map((movie, index) => {
            return <Card setSelected={setSelected} movie={movie} key={index} />
          })
        }
      </div>
    </div>
  )
}

export default Carousel;