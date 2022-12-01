import Link from 'next/link';
import { FC } from 'react';
import { MdLogout } from 'react-icons/md';
import secureLocalStorage from 'react-secure-storage';
import { useAuthContext } from '../../../contexts/authContext';
import { logout } from '../../../services/auth-service';

import { NavItem } from '../../../types';
import Searchbar from './Searchbar';

type Props = {
    isOpen: boolean;
    elements: NavItem[];
    isAuth: boolean;
}

const Menu: FC<Props> = ({ isOpen, elements, isAuth }) => {
    const { setUser } = useAuthContext();

    const handleLogout = async () => {
        const sessionId = secureLocalStorage.getItem("session_id")!.toString();
        logout(sessionId)
            .then(() => {
                setUser(null);
                secureLocalStorage.clear();
            });
    };

    return (
        <>
            {
                isOpen
                &&
                <div
                    className="
                        md:hidden
                        flex-col
                        mt-1
                        bg-neutral-900
                        w-full
                        sm:w-64
                        h-auto
                        top-20
                        absolute
                        transition-all
                        sm:right-4
                        rounded-md
                        pt-2
                        pb-5
                        pl-10
                        shadow-md
                        pr-6"
                >
                    <div className='mb-3 sm:hidden pr-5'>
                        <Searchbar />
                    </div>
                    {
                        elements.map((element, index) => {
                            return (
                                <Link href={element.path} key={index} className='flex items-center text-2xl py-2'>
                                    <element.Icon className='mr-3' />
                                    <p className='text-center'>{element.name}</p>
                                </Link>
                            )
                        })
                    }
                    {
                        isAuth
                        &&
                        <button className='flex items-center text-2xl py-2' onClick={handleLogout} >
                            <MdLogout className='mr-3' />
                            <p className='text-center'>Logout</p>
                        </button>
                    }
                </div>
            }
        </>
    )
}

export default Menu;