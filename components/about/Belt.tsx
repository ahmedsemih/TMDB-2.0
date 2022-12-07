import React, { FC } from 'react';
import { IconType } from 'react-icons';

type Props = {
    icons: IconType[];
    titles: string[];
    texts: string[];
}

const Belt: FC<Props> = ({ icons, titles, texts }) => {
    return (
        <div className='flex flex-wrap md:justify-between px-3 py-3 justify-center border-y-[1px] border-neutral-800'>
            {
                icons.map((Icon, index) => {
                    return (
                        <div className='flex items-center m-3' key={index} >
                            <Icon className='text-5xl mr-3' />
                            <div>
                                <h3 className='font-semibold text-2xl'>{titles[index]}</h3>
                                <p className='text-xl'>{texts[index]}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Belt;