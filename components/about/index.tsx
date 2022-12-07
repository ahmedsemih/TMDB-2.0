import { FC } from 'react';
import { BsClockFill, BsBank2, BsGraphUp, BsStarFill } from 'react-icons/bs';
import { Movie } from '../../types';

import { tmdbImageUrl } from '../../utils/constants';
import ImageBg from '../ImageBg';
import Belt from './Belt';
import Details from './Details';

type Props = {
    movie: Movie;
    writer: any;
    director: any;
}

const About: FC<Props> = ({ movie, writer, director }) => {
    return (
        <>
            <ImageBg imageUrl={tmdbImageUrl + movie?.backdrop_path}>
                <Details movie={movie} director={director ? director[0]?.name : null} writer={writer ? writer[0]?.name : null} />
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
}

export default About;