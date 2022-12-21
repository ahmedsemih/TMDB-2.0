import Head from 'next/head';
import React from 'react';

const NotFound = () => {
  return (
    <>
    <Head>
        <title>404 - Not Found</title>
    </Head>
    <div className='flex flex-col justify-center items-center min-h-[83vh] p-3'>
        <h1 className='text-[100px] font-bold italic text-center'>
            404 
            <span className='hidden md:inline ml-5 font-light'>
            | Not Found
            </span>
        </h1>
        <p className='text-2xl text-neutral-400 text-center'>
            Sorry, the page you are looking for couldn't be found.
        </p>
    </div>
    </>
  )
}

export default NotFound;