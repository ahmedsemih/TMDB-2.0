import React, { FC } from 'react';
import Image from 'next/image';
import moment from 'moment';

import { getPersonDetails, getPersonMovies, getPersonSeries } from '../../services/person-service';
import { noAvatarImage, tmdbImageUrl } from '../../utils/constants';
import Carousel from '../../components/Carousel';
import { Person } from '../../types';

type Props = {
  details: Person;
  movies: any;
  series: any;
}

const Person: FC<Props> = ({ details, movies, series }) => {
  return (
    <div className='w-full xl:w-[1440px] mx-auto flex flex-col md:flex-row mt-20 mb-6 px-6' >
      <div>
        <Image
          className='mx-auto w-[250px] sm:w-[400px] h-[400px] sm:h-[600px] md:h-[450px] lg:h-[600px] rounded-md'
          src={details.profile_path ? tmdbImageUrl + details.profile_path : noAvatarImage}
          alt={details.name || "person"}
          width={600}
          height={800}
        />
        <div className='mt-6 px-6 md:px-0'>
          <h2 className='text-3xl font-semibold'>
            Personal Info
          </h2>
          <h4 className='text-xl font-semibold mt-3'>
            Known For
          </h4>
          <p className='text-lg'>
            {details.known_for_department}
          </p>
          <h4 className='text-xl font-semibold mt-3'>
            Known Credits
          </h4>
          <p className='text-lg'>
            {movies.cast.length + movies.crew.length + series.cast.length + series.crew.length}
          </p>
          {
            details.birthday
            &&
            <>
              <h4 className='text-xl font-semibold mt-3'>Birthday</h4>
              <p className='text-lg'> {moment(details.birthday).format("DD.MM.YYYY")} </p>
            </>
          }
          {
            details.place_of_birth
            &&
            <>
              <h4 className='text-xl font-semibold mt-3'>Place of Birth</h4>
              <p className='text-lg'> {details.place_of_birth} </p>
            </>
          }
          {
            details.deathday
            &&
            <>
              <h4 className='text-xl font-semibold mt-3'>Deathday</h4>
              <p className='text-lg'> {moment(details.deathday).format("DD.MM.YYYY")} </p>
            </>
          }
          {
            details.also_known_as?.length > 0
            &&
            <>
              <h4 className='text-xl font-semibold mt-3'>Also Known As</h4>
              {
                details.also_known_as.map((name: string, index: number) => {
                  return <p className='text-lg' key={index}> {name} </p>
                })
              }
            </>
          }
        </div>
      </div>
      <div className='w-full md:w-[70%]'>
        <div className='mt-6 md:mt-0 px-6'>
          <h1 className='text-5xl font-semibold'>{details.name}</h1>
          <h2 className='text-3xl font-semibold mt-6'>Biography</h2>
          <p className='text-lg'>
            {details.biography || "---"}
          </p>
        </div>
        {
          details.known_for_department === "Acting"
            ?
            <>
              {
                movies.cast.length > 0 && <Carousel title='Known Movies' description='' movies={movies.cast} />
              }
              {
                series.cast.length > 0 && <Carousel title='Known Series' description='' movies={series.cast} />
              }
            </>
            :
            <>
              {
                movies.crew.length > 0 && <Carousel title='Known Movies' description='' movies={movies.crew} />
              }
              {
                series.crew.length > 0 && <Carousel title='Known Series' description='' movies={series.crew} />
              }
            </>
        }
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params }: any) => {
  const { id } = await params;
  const details = await getPersonDetails(id);
  const movies = await getPersonMovies(id);
  const series = await getPersonSeries(id);

  return {
    props: {
      details,
      movies,
      series
    }
  }
};

export default Person;