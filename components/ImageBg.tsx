import React, { FC, ReactNode, useEffect, useState } from 'react';

type Props = {
    children: ReactNode;
    imageUrl: string;
    mdHeight?:string;
    lgHeight?:string;
    baseHeight?:string;
}

const ImageBg: FC<Props> = ({ children, imageUrl, mdHeight, lgHeight, baseHeight }) => {
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
                        className={`
                            bg-neutral-900
                            w-full
                            pt-24
                            md:pt-16
                            md:${mdHeight ? "h-["+mdHeight+"]" : "h-[70vh]"}
                            ${baseHeight ? "h-["+baseHeight+"]" : "h-full" }
                            flex
                            items-center
                            justify-center`}
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
                        className={`
                            w-full
                            pt-24
                            md:pt-16
                            lg:${lgHeight ? "h-[" + lgHeight + "]" : "h-[75vh]"}
                            md:${mdHeight ? "h-[" + mdHeight + "]" : "h-[80vh]"}
                            ${baseHeight ? "h-["+baseHeight+"]" : "h-auto" }
                            flex
                            items-center
                            justify-center`}
                    >
                        {children}
                    </div>
            }
        </>

    )
}

export default ImageBg;