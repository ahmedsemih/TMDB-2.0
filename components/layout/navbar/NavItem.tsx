import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { NavItem } from '../../../types';

type Props = {
    item: NavItem;
}

const NavItem: FC<Props> = ({ item }) => {
    const router = useRouter();

    return (
        <Link
            href={item.path}
            className={
                `md:mx-4 
                text-xl 
                hidden
                lg:flex-row
                md:flex
                flex-col
                items-center
                justify-center
                ${item.path === router.pathname
                    ?
                    "text-sky-300"
                    :
                    "hover:text-sky-200 transition-all active:text-sky-300"}`
            }>
            <item.Icon className='text-3xl xl:mr-3 mr-2' />
            <p className='hidden lg:block'>{item.name}</p>
        </Link>
    )
}

export default NavItem;