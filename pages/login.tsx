import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { RiErrorWarningFill, RiQuestionFill } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PasswordInput from '../components/inputs/PasswordInput';
import TextInput from '../components/inputs/TextInput';
import Logo from '../public/assets/tmdb-logo.svg';
import { getRequestToken, getSessionId, login } from '../services/auth-service';
import { loginAdventages } from '../utils/constants';
import { useAuthContext } from '../contexts/authContext';

const Login = () => {
    const router = useRouter();
    const { setPass } = useAuthContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (username.trim() === "" || password.trim() === "") return;

        const { request_token } = await getRequestToken();
        const res = await login(username, password, request_token);
        secureLocalStorage.setItem("request_token", res.request_token);
        secureLocalStorage.setItem("expires_at", res.expires_at);
        secureLocalStorage.setItem("req", password);
        setPass(password);

        if (!res.success) {
            setUsername("");
            setPassword("");
            return toast.error("Wrong email or password.", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

        const { session_id, success } = await getSessionId(res.request_token);

        if (!success) return toast.error("Somethings went wrong. Please try again.", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        secureLocalStorage.setItem("session_id", session_id);
        router.back();
    };

    return (
        <>
            <Head>
                <title>Login - TMDB</title>
            </Head>
            <div className="flex justify-center items-center overflow-y-hidden">
                <div className='flex my-48'>
                    <form
                        onSubmit={handleSubmit}
                        className='
                            flex
                            flex-col
                            bg-neutral-800
                            px-5
                            py-8
                            max-w-96
                            rounded-l-md
                            rounded-r-md
                            lg:rounded-r-none'
                    >
                        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8'>
                            Login
                        </h1>
                        <TextInput
                            label='Username'
                            username={username}
                            setUsername={setUsername}
                        />
                        <PasswordInput
                            label='Password'
                            password={password}
                            setPassword={setPassword}
                        />
                        <button
                            type='submit'
                            className='
                                px-8
                                py-4
                                bg-sky-500
                                text-gray-200
                                font-bold
                                hover:bg-sky-600
                                transition-all
                                duration-200
                                mt-3'
                        >Login</button>
                    </form>
                    <div
                        className='
                            flex-col
                            hidden
                            lg:flex
                            bg-neutral-800
                            px-5
                            py-8
                            max-w-96
                            rounded-r-md
                            border-l-2
                            border-neutral-700'
                    >
                        <Link href="/" className="mr-5">
                            <Image src={Logo} alt="TMDB" width={200} height={100} priority />
                        </Link>
                        <h2 className='text-2xl mt-8 font-semibold flex items-center'>
                            <RiQuestionFill className='mr-2' />
                            Why should I login ?
                        </h2>
                        <ul>
                            {
                                loginAdventages.map((advantage, index) => {
                                    return <li key={index} className='text-lg my-3'>- {advantage}</li>
                                })
                            }
                        </ul>
                        <div className='mt-8'>
                            <h2 className='text-2xl mb-4 flex items-center font-semibold'>
                                <RiErrorWarningFill className='mr-2' />
                                Warning
                            </h2>
                            <p>This is not the official TMDB web site.</p>
                            <p>
                                We using
                                <Link
                                    className='text-sky-300'
                                    href="https://www.themoviedb.org/documentation/api"
                                    rel='noreferrer'
                                > TMDB API </Link> just for fun.</p>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default Login;