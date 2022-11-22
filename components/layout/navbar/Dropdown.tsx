import Link from 'next/link';
import { FC } from 'react';
import { NavItem } from '../../../types';
import Searchbar from './Searchbar';

type Props = {
    isOpen: boolean;
    elements: NavItem[];
}

const Dropdown: FC<Props> = ({ isOpen, elements }) => {
    return (
        <>
            {
                isOpen && <div
                    className="md:hidden flex-col mt-1 bg-neutral-900 w-full sm:w-64 h-auto top-20 absolute transition-all sm:right-4 rounded-md pt-2 pb-5 pl-10 shadow-md pr-6"
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
                </div>
            }
        </>
    )
}

export default Dropdown;