import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MdBookmark } from 'react-icons/md';

import { useAuthContext } from '../contexts/authContext';
import { getMovieWatchlist } from '../services/user-service';
import { getSeriesWatchlist } from '../services/user-service';
import { MovieWatchlist, TvWatchlist } from '../types';
import { tmdbImageUrl } from '../utils/constants';
import secureLocalStorage from 'react-secure-storage';
import HorizontalCard from '../components/cards/HorizontalCard';
import ImageBg from '../components/ImageBg';
import Spinner from '../components/Spinner';

const Watchlist = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const [type, setType] = useState("movies");
  const [isLoading, setIsLoading] = useState(true);
  const [watchlistItems, setWatchlistItems]: any[] = useState([]);

  useEffect(() => {
    const sessionId = secureLocalStorage.getItem("session_id")?.toString();
    if (!sessionId) return router.back();

    const fetchWatchlist = async () => {
      setIsLoading(true);

      if (type === "movies") {
        const result: MovieWatchlist = await getMovieWatchlist(user.id, sessionId);
        const movieArray: any[] = [];

        if (result.total_results === 0){
         setIsLoading(false);
         return setWatchlistItems(null);
        }  

        for (let i = 1; i <= result.total_pages; i++) {
          const movies: MovieWatchlist = await getMovieWatchlist(user.id, sessionId, i);
          movies.results.forEach((movie) => {
            movieArray.push(movie);
          });
        };

        setWatchlistItems(movieArray);
        setIsLoading(false);

      } else {
        const result: TvWatchlist = await getSeriesWatchlist(user.id, sessionId);
        const seriesArray: any[] = [];

        if (result.total_results === 0){
          setIsLoading(false);
          return setWatchlistItems(null);
         }  
        for (let i = 1; i <= result.total_pages; i++) {
          const series: TvWatchlist = await getSeriesWatchlist(user.id, sessionId, i);
          series.results.forEach((series) => {
            seriesArray.push(series);
          });
        };

        setWatchlistItems(seriesArray);
        setIsLoading(false);
      }
    };
    fetchWatchlist();
  }, [type]);

  return (
    <>
      <Head>
        <title>{`${user?.username} - Watchlist`}</title>
      </Head>
      <div>
        <ImageBg imageUrl={watchlistItems && tmdbImageUrl + watchlistItems[0]?.backdrop_path}>
          <div className='pt-10 pb-5 px-6 flex flex-col w-full'>
            <div className='flex items-end'>
              <h1 className='text-2xl sm:text-4xl  lg:text-5xl font-semibold'>Watchlists</h1>
              <button
                onClick={() => setType("movies")}
                className={`
                  text-xl
                  md:text-2xl
                  ml-10
                  mr-3
                  ${type === "movies" ? "text-sky-300" : "hover:text-sky-200"}
              `}
              >
                Movies
              </button>
              <button
                onClick={() => setType("series")}
                className={`
                  text-xl
                  md:text-2xl
                  ml-3
                  ${type === "series" ? "text-sky-300" : "hover:text-sky-200"}
              `}
              >
                Series
              </button>
            </div>
          </div>
        </ImageBg>
        <div className={`flex flex-wrap m-6 min-h-[60vh] ${watchlistItems.length > 1 && "lg:justify-around"}`}>
          {
            isLoading
              ?
              <div className='flex justify-center items-center w-full'>
                <Spinner />
              </div>
              :
              (
                watchlistItems
                  ?
                  watchlistItems.map((item: any) => {
                    return type === "movies" ? <HorizontalCard movie={item} /> : <HorizontalCard series={item} />
                  })
                  :
                  <div className='flex flex-col items-center justify-center'>
                    <MdBookmark className='text-[200px] text-sky-400 mb-10' />
                    <p className='text-xl md:text-3xl font-semibold text-center'>You do not have any watchlist item yet.</p>
                    <p className='text-md md:text-lg text-center mt-1'>You can click the bookmark icon on the series or movie page and add it to the watchlist.</p>
                  </div>
              )
          }
        </div>
      </div>
    </>
  )
}

export default Watchlist;