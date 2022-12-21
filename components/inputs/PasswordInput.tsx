import React, { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type Props = {
    label: string,
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
}

const PasswordInput: FC<Props> = ({ label, password, setPassword }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isPassword, setIsPassword] = useState(true);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleClick = () => {
        setIsPassword(prev => !prev);
    };

    return (
        <div className='flex-col flex relative'>
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
                onBlur={() => password === "" && setIsVisible(false)}
                onChange={handleChange}
                name={label}
                value={password}
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
                    focus:border-gray-100
                '
                placeholder={!isVisible ? label : ""}
                type={isPassword ? "password" : "text"}
            />
            {
                isPassword
                    ?
                    <FaEye className="absolute bottom-9 right-3 text-xl" onClick={handleClick} />
                    :
                    <FaEyeSlash className="absolute bottom-9 right-3 text-xl" onClick={handleClick} />
            }
        </div>
    )
}

export default PasswordInput;