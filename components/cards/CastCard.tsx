import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { Credit } from '../../types';
import { tmdbImageUrl } from '../../utils/constants';

type Props = {
    actor: Credit["cast"];
}

const CastCard: FC<Props> = ({ actor }) => {
    const router = useRouter();

    return (
        <>
            {
                actor?.profile_path
                    ?
                    <div className="group flex flex-col justify-center mr-5 min-w-[260px] w-[260px] min-h-[500px] h-[400px] md:h-[500px] hover:scale-125 hover:shadow-xl rounded-md">
                        <Image
                            width={260}
                            height={390}
                            onClick={() => router.push(`/people/${actor?.id}`)}
                            className='mr-5 cursor-pointer w-full sm:w-96'
                            src={tmdbImageUrl + actor?.profile_path} alt="TMDB" />
                        <div className='p-3 text-center bg-neutral-800 '>
                            <p className='text-xl font-bold'>{actor.name}</p>
                            <p className='font-medium group-hover:hidden'>{actor?.character?.includes("uncredited") ? actor?.character?.split("(uncredited)")[0] : actor?.character }</p>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    )
}

export default CastCard;