import Head from 'next/head';
import Link from 'next/link';
import { FC } from 'react';

import CastCard from '../components/cards/CastCard';
import HorizontalCard from '../components/cards/HorizontalCard';
import Pagination from '../components/Pagination';
import { getMoviesByGenre, getMoviesByQuery, getPeopleByQuery, getSeriesByGenre, getSeriesByQuery } from '../services/search-service';

type Props = {
    title: string;
    type: string;
    page: number;
    genre: string;
    contents: any[];
    totalPages: number;
    q: string;
}

const Search: FC<Props> = ({ title, type, contents, page, totalPages, genre, q }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className='flex flex-col md:flex-row my-5 px-6 py-10 pt-20 xl:w-[1440px] xl:mx-auto'>
                <div className='flex flex-col w-full md:w-72 mr-3'>
                    <h1
                        className={`
                            text-2xl
                            bg-neutral-800
                            rounded-md
                            text-center
                            py-2
                            px-3
                            font-semibold
                            ${type === "people" ? "mt-7" : "mt-2"}
                        `}
                    >
                        Categories
                    </h1>
                    <Link
                        className={`
                            text-2xl
                            mt-2
                            bg-neutral-800
                            rounded-md
                            text-center
                            py-2
                            px-3
                            hover:bg-neutral-700
                            transition-all
                            duration-100
                            ${type === "movies" && "bg-neutral-700"}
                        `}
                        href={
                                genre
                                ?
                                {
                                    pathname: "",
                                    query: { type: "movies", genre: genre, page: 1 },
                                }
                                :
                                {
                                    pathname: "",
                                    query: { type: "movies", q: q, page: 1 },
                                }
                        }
                    >
                        Movies
                    </Link>
                    <Link
                        className={`
                            text-2xl
                            mt-2
                            bg-neutral-800
                            rounded-md
                            text-center
                            py-2
                            px-3
                            hover:bg-neutral-700
                            transition-all
                            duration-100
                            ${type === "series" && "bg-neutral-700"}
                        `}
                        href={
                                genre
                                ?
                                {
                                    pathname: "",
                                    query: { type: "series", genre: genre, page: 1 },
                                }
                                :
                                {
                                    pathname: "",
                                    query: { type: "series", q: q, page: 1 },
                                }
                        }
                    >
                        Series
                    </Link>
                    <Link
                        className={`
                            text-2xl
                            mt-2
                            bg-neutral-800
                            rounded-md
                            text-center
                            py-2
                            px-3
                            hover:bg-neutral-700
                            transition-all
                            duration-100
                            ${type === "people" && "bg-neutral-700"}
                        `}
                        href={
                                genre
                                ?
                                {
                                    pathname: "",
                                    query: { type: "people", page: 1 },
                                }
                                :
                                {
                                    pathname: "",
                                    query: { type: "people", q: q, page: 1 },
                                }
                        }
                    >
                        People
                    </Link>
                </div>
                <div className='w-full'>
                    {
                        type === "people"
                            ?
                            <div
                                className='
                                    md:grid
                                    md:grid-cols-2
                                    lg:grid-cols-3
                                    xl:grid-cols-4
                                    w-full
                                    flex
                                    flex-col
                                    items-center
                                '
                            >
                                {
                                    contents.map((content: any) => {
                                        return <CastCard actor={content} />
                                    })
                                }
                            </div>
                            :
                            <div className='flex flex-col items-center'>
                                {
                                    contents.length > 0 && totalPages > 0
                                        ?
                                        contents.map((content: any) => {
                                            return (
                                                type === "series"
                                                    ?
                                                    <HorizontalCard series={content} />
                                                    :
                                                    <HorizontalCard movie={content} />
                                            )
                                        })
                                        :
                                        <p className='text-2xl my-10 text-center'>
                                            Sorry, what you were looking for was not found.
                                        </p>
                                }
                            </div>
                    }
                    <Pagination page={page} totalPages={totalPages} q={q} type={type} />
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async ({ query }: any) => {
    const { q = null, genre = null, page = 1, type = "movies" } = await query;
    let title: string;
    var contents: any = [];

    if (genre) {
        if (type === "movies") contents = await getMoviesByGenre(genre, page);
        else contents = await getSeriesByGenre(genre, page);
        title = `By Genre ${genre} - TMDB`;
    } else {
        if (type === "people") contents = await getPeopleByQuery(q, page);
        else if (type === "movies") contents = await getMoviesByQuery(q, page);
        else contents = await getSeriesByQuery(q, page);
        title = `${q} - TMDB`;
    }

    return {
        props: {
            q,
            title,
            type,
            page,
            genre,
            contents: contents.results,
            totalPages: contents.total_pages
        }
    }
};

export default Search;