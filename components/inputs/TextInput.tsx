import React, { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';

type Props = {
    label: string,
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
}

const TextInput: FC<Props> = ({ label, username, setUsername }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    return (
        <div className='flex-col flex'>
            <label
                htmlFor={label}
                className={`
                    text-xl
                    text-neutral-200
                    font-semibold
                    transition-all
                    duration-200
                    ${isVisible ? "opacity-100" : "opacity-0"}
                `}
            >{label}</label>
            <input
                onFocus={() => setIsVisible(true)}
                onBlur={() => username === "" && setIsVisible(false)}
                onChange={handleChange}
                name={label}
                value={username}
                className='
                    py-3
                    mb-5
                    text-xl
                    w-full
                    sm:w-72
                    md:w-96
                    bg-transparent
                    text-neutral-300
                    border-b-2
                    outline-none
                    border-neutral-300
                    focus:text-gray-100
                    focus:border-gray-100'
                placeholder={!isVisible ? label : ""}
                type="text"
            />
        </div>
    )
}
export default TextInput;