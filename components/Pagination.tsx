import Link from 'next/link';
import React, { FC } from 'react';

type Props = {
    id: number;
    page: number;
    totalPages: number;
}

const Pagination: FC<Props> = ({ id, page, totalPages }) => {
    return (
        <nav className='w-full flex justify-center my-3'>
            <ul className="inline-flex items-center w-fit">
                <li>
                    <Link
                        href={{
                            pathname: "",
                            query: { id: id, page: Number(page) - 1 },
                        }}
                        className={`
                            block
                            px-3
                            py-2
                            ml-0
                            leading-tight
                            border
                            border-neutral-600
                            text-neutral-400
                            bg-neutral-800
                            hover:text-neutral-100
                            hover:bg-neutral-700
                            hover:border-neutral-400
                            transition-all
                            duration-150
                            rounded-l-lg
                            ${page - 1 == 0 && "pointer-events-none"}
                        `}
                    >
                        <span className="sr-only">Previous</span>
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </Link>
                </li>
                {
                    [...Array(totalPages)].map((value, index) => {
                        return (
                            <li key={index}>
                                <Link
                                    key={index + 1}
                                    href={{
                                        pathname: "",
                                        query: { id: id, page: index + 1 },
                                    }}
                                    className={`
                                        px-4
                                        py-2
                                        leading-tight
                                        border
                                        
                                        transition-all
                                        duration-150
                                        ${page == index + 1
                                            ?
                                            "bg-neutral-600 font-semibold border-neutral-300 text-neutral-100"
                                            :
                                            "border-neutral-600 text-neutral-400 bg-neutral-800 hover:text-neutral-100 hover:bg-neutral-700 hover:border-neutral-400"
                                        }
                                        `}
                                >
                                    {index + 1}
                                </Link>
                            </li>
                        )

                    }
                    )
                }
                <li>
                    <Link
                        href={{
                            pathname: "",
                            query: { id: id, page: Number(page) + 1 },
                        }}
                        className={`
                            block
                            px-3
                            py-2
                            leading-tight
                            rounded-r-lg
                            border
                            border-neutral-600
                            text-neutral-400
                            bg-neutral-800
                            hover:text-neutral-100
                            hover:bg-neutral-700
                            hover:border-neutral-400
                            transition-all
                            duration-150
                            ${page == totalPages && "pointer-events-none"}
                        `}
                    >
                        <span className="sr-only">Next</span>
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;