import { FC, useEffect, useState } from 'react';
import Head from 'next/head';

import { getMovieCredits, getMovieDetails, getSimilarMovies } from '../../../services/movie-service';
import { Credit, Movie } from '../../../types';
import Carousel from '../../../components/Carousel';
import Reviews from '../../../components/reviews';
import About from '../../../components/about';

type Props = {
    id: number;
    movie: Movie;
    title: string;
    credits: any;
    director: Credit["crew"];
    writer: Credit["crew"];
}

const Movie: FC<Props> = ({ id, movie, title, credits, director, writer }) => {
    const [similar, setSimilar] : any = useState(null);

    useEffect(() => {
        const fetchSimilar = async () => {
            const result = await getSimilarMovies(id, 1);
            setSimilar(result.results);
        };
        fetchSimilar();
    }, [id]);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <About movie={movie} writer={writer} director={director} />
                <Carousel cast={credits.cast} title="Cast" description='Actors & Actresses' />
                <Reviews id={id} type="movies" />
                <Carousel movies={similar && similar} title="Similar Movies" description="Similar Genre Movies" />
            </div>
        </>
    )
}

export const getServerSideProps = async ({ params }: any) => {
    const { id } = await params;
    const movie = await getMovieDetails(id);
    const title = await movie.title + " - TMDB"
    const credits = await getMovieCredits(id);
    const director = await credits.crew.filter((credit: any) => {
        return credit.job === "Director";
    });
    const writer = await credits.crew.filter((credit: any) => {
        return credit.job === "Writer";
    });

    return {
        props: {
            id,
            movie,
            title,
            director,
            writer,
            credits,
        }
    }
}

export default Movie;