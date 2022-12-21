import { FC } from 'react';
import { BsClockFill, BsBank2, BsGraphUp, BsStarFill } from 'react-icons/bs';
import { AiTwotonePieChart } from 'react-icons/ai';
import { RiFilmFill } from 'react-icons/ri';

import { Movie, Tv } from '../../types';
import { tmdbImageUrl } from '../../utils/constants';
import ImageBg from '../ImageBg';
import Belt from './Belt';
import MovieDetails from './MovieDetails';
import TvDetails from './TvDetails';

type Props = {
    movie?: Movie;
    tv?: Tv;
    writer?: any;
    director?: any;
}

const About: FC<Props> = ({ movie, tv, writer, director }) => {
    if (movie) { // MOVIE
        return (
            <>
                <ImageBg imageUrl={tmdbImageUrl + movie?.backdrop_path}>
                    <MovieDetails movie={movie!} director={director ? director[0]?.name : null} writer={writer ? writer[0]?.name : null} />
                </ImageBg>
                <Belt
                    icons={[BsClockFill, BsStarFill, BsBank2, BsGraphUp]}
                    titles={["Status", "Rating", "Budget", "Revenue"]}
                    texts={[
                        movie?.status,
                        movie?.vote_average?.toFixed(1),
                        movie?.budget ? "$" + movie?.budget?.toLocaleString() : "-",
                        movie?.revenue ? "$" + movie?.revenue?.toLocaleString() : "-"
                    ]}
                />
            </>
        )
    } else { // TV SHOW
        return (
            <>
                <ImageBg imageUrl={tmdbImageUrl + tv?.backdrop_path}>
                    <TvDetails tv={tv!} />
                </ImageBg>
                <Belt
                    icons={[BsClockFill, BsStarFill, RiFilmFill, AiTwotonePieChart]}
                    titles={["Status", "Rating", "Seasons", "Episodes"]}
                    texts={[
                        `${tv?.status}`,
                        `${tv?.vote_average?.toFixed(1)}`,
                        `${tv?.number_of_seasons}`,
                        `${tv?.number_of_episodes}`
                    ]}
                />
            </>
        )
    }
}

export default About;