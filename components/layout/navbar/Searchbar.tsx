import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';

const Searchbar = () => {
    const router = useRouter();

    const [isHidden, setIsHidden] = useState(true);
    const [search, setSearch] = useState("");

    const handleChange = (e: any) => {
        setSearch(e.target.value);
    };

    const handleKeyUp = (e: any) => {
        if (e.key === "Enter") return router.push(`/search?q=${search}`);
    };

    return (
        <div className='group flex items-center justify-start w-full'>
            <input
                type="text"
                className={
                    `p-1
                    bg-[rgba(255,255,255,.2)]
                    text-white
                    rounded-md
                    w-full
                    lg:w-96
                    transition-all
                    outline-none
                    text-lg
                    indent-2
                    mr-2
                    ${isHidden ? "sm:hidden" : "block"}`
                }
                value={search}
                onChange={handleChange}
                onKeyDown={handleKeyUp}
            />
            <FaSearch
                onClick={() => setIsHidden(prev => !prev)}
                className="mx-0 sm:mx-2 md:mx-4 text-xl hover:text-sky-200 transition-all active:text-sky-300 cursor-pointer"
            />
        </div>
    )
}

export default Searchbar;