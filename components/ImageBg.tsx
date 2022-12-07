import React, { FC, ReactNode, useEffect, useState } from 'react';

type Props = {
    children: ReactNode;
    imageUrl: string;
}

const ImageBg: FC<Props> = ({ children, imageUrl }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (imageUrl === undefined || imageUrl === null) return setIsLoading(true);
        setIsLoading(false);
    }, [imageUrl]);

    return (
        <>
            {
                isLoading
                    ?
                    <div
                        className='
                            bg-neutral-900
                            w-full
                            pt-24
                            md:pt-16
                            md:h-[70vh]
                            h-full
                            flex
                            items-center
                            justify-center'
                    >
                        {children}
                    </div>
                    :
                    <div
                        style={{
                            background: `linear-gradient(rgba(17,17,17,.7),
                                         rgba(17,17,17,.7)),
                                         url(${imageUrl})`,
                            backgroundPosition: "top center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat"
                        }}
                        className="
                            w-full
                            pt-24
                            md:pt-16
                            lg:h-[75vh]
                            md:h-[80vh]
                            h-auto
                            flex
                            items-center
                            justify-center"
                    >
                        {children}
                    </div>
            }
        </>

    )
}

export default ImageBg;