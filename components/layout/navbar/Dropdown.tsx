import Link from 'next/link';
import { useState } from 'react';
import { ImUser } from 'react-icons/im';
import { MdBookmark, MdFavorite, MdLogout } from 'react-icons/md';
import secureLocalStorage from 'react-secure-storage';

import { useAuthContext } from '../../../contexts/authContext';
import { logout } from '../../../services/auth-service';

const Dropdown = () => {
    const { setUser, setPass } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        const sessionId = secureLocalStorage.getItem("session_id")!.toString();
        logout(sessionId)
            .then(() => {
                setUser(null);
                setPass(null);
                secureLocalStorage.clear();
            });
    };

    return (
        <div className='py-5 hidden md:block'>
            <div
                className='flex items-center text-xl md:mx-4 hover:text-sky-200 cursor-pointer'
                onClick={() => setIsOpen(true)}
                onMouseEnter={() => setIsOpen(true)}
            >
                <ImUser className='text-3xl xl:mr-3 mr-2' />
                <p className='hidden lg:block'>Account</p>
            </div>
            {
                isOpen
                &&
                <div
                    className='absolute bg-[rgba(17,17,17,.8)] shadow-lg mt-5 p-3 rounded-sm right-2'
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <Link
                        href="/watchlist"
                        className='flex items-center text-2xl py-2 hover:text-sky-200'>
                        <MdBookmark className='mr-3' />
                        <p className='text-center'>Watchlist</p>
                    </Link>
                    <Link
                        href="/favorites"
                        className='flex items-center text-2xl py-2 hover:text-sky-200'>
                        <MdFavorite className='mr-3' />
                        <p className='text-center'>Favorites</p>
                    </Link>
                    <button
                        className='flex items-center text-2xl py-2 hover:text-sky-200'
                        onClick={handleLogout} >
                        <MdLogout className='mr-3' />
                        <p className='text-center'>Logout</p>
                    </button>
                </div>
            }
        </div>
    )
}

export default Dropdown;