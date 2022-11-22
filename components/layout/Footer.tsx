import React from 'react';
import { FaYoutube, FaTwitter, FaFacebook, FaGooglePlay } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { SiHuawei } from 'react-icons/si';
import { GrAppleAppStore } from 'react-icons/gr';

const Footer = () => {
  return (
    <div className='w-full bg-neutral-900 border-t-2 border-neutral-800 flex sm:flex-row justify-between px-6 py-8 flex-wrap flex-col'>
      <div className='flex-col mr-3 mb-5'>
        <h5 className='text-2xl mb-3'>
          Our Social Medias
        </h5>
        <div className='flex text-3xl justify-between max-w-xs'>
          <FaYoutube className='hover:text-red-600 transition-all cursor-pointer' />
          <FaTwitter className='hover:text-sky-600 transition-all cursor-pointer' />
          <FaFacebook className='hover:text-blue-700 transition-all cursor-pointer' />
          <RiInstagramFill className='hover:text-pink-400 transition-all cursor-pointer' />
        </div>
      </div>
      <div className='mr-3 flex-col items-center mb-5'>
        <p className='text-xl cursor-pointer hover:text-sky-200 transition-all mb-3'>FAQ</p>
        <p className='text-xl cursor-pointer hover:text-sky-200 transition-all'>Help Center</p>
      </div>
      <div className='mr-3 flex-col items-center mb-5'>
        <p className='text-xl cursor-pointer hover:text-sky-200 transition-all mb-3'>About Us</p>
        <p className='text-xl cursor-pointer hover:text-sky-200 transition-all'>Contact Us</p>
      </div>
      <div className='mr-3 flex-col items-center mb-5'>
        <p className='text-xl cursor-pointer hover:text-sky-200 transition-all mb-3'>Privacy Policy</p>
        <p className='text-xl cursor-pointer hover:text-sky-200 transition-all'>Term of Use</p>
      </div>
      <div className='flex-col mr-3 mb-5'>
        <h5 className='text-2xl mb-3'>
          Our Mobile Apps
        </h5>
        <div className='flex text-3xl justify-between max-w-xs'>
          <FaGooglePlay className='hover:text-blue-400 transition-all cursor-pointer' />
          <GrAppleAppStore className='hover:text-blue-300 transition-all cursor-pointer' />
          <SiHuawei className='hover:text-red-600 transition-all cursor-pointer' />
        </div>
      </div>
    </div>
  )
}

export default Footer;