import React, { useState } from 'react'
import { forgotPassword, login, updatePassword } from '../service/userService';
import { toast } from 'react-toastify';

export default function ModalLogin({ closeLogin }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [opt, setOPT] = useState('');

    const [forgotPasswordMode, setforgotPasswordMode] = useState(false);

    const onForgotPasswordMode = () => {
        setforgotPasswordMode(true);
    }

    const offForgotPasswordMode = () => {
        setforgotPasswordMode(false);
    }

    // main
    const handleLogin = async (e) => {
        e.preventDefault();
        await login(email, password)
            .then(res => {
                console.log('API Login', res);
                if (res.data.status === 0) {
                    closeLogin();
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        await forgotPassword(email)
            .then(res => {
                console.log('API ForgotPassword', res);
                if (res.data.status === 0) {
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        await updatePassword(password, +opt)
            .then(res => {
                console.log('API updatePassword', res);
                if (res.data.status === 0) {
                    toast.success(res.data.message);
                    setPassword('');
                    setOPT('');
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <>
            <div onClick={() => closeLogin()} className='flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-rgba'>
                <div onClick={(e) => e.stopPropagation()} className='w-[30rem] bg-white rounded-xl py-6 text-primary text-lg'>
                    <h1 className=' text-center text-3xl font-bold'>{!forgotPasswordMode ? "Login" : "Forgot password"}</h1>
                    <form className='flex flex-col gap-4 mt-2'>
                        {
                            !forgotPasswordMode ?
                                <>
                                    <div className='flex  items-center w-3/4 mx-auto'>
                                        <label htmlFor="email" className='flex-1 text-lg'>Email:</label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)}
                                            type="email" name='email' placeholder='Enter your email' className=' pl-2 py-1 text-lg w-64' />
                                    </div>

                                    <div className='flex items-center w-3/4 mx-auto'>
                                        <label htmlFor="password" className='flex-1 text-lg'>Password:</label>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)}
                                            type="password" name='password' placeholder='Enter your password' className=' pl-2 py-1 text-lg w-64' />
                                    </div>


                                    <div className='flex w-3/4 mx-auto'>
                                        <button onClick={(e) => handleLogin(e)} className='w-full bg-primary text-white rounded-xl py-2 font-bold text-md hover:opacity-75'>Login</button>
                                    </div>
                                </>
                                :
                                <>
                                    <div className='flex  items-center w-3/4 mx-auto'>
                                        <label htmlFor="email" className='flex-1 text-lg'>Email:</label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)}
                                            type="email" name='email' placeholder='Enter your email' className=' pl-2 py-1 text-lg w-64' />
                                    </div>
                                    <div className='flex w-3/4 mx-auto'>
                                        <button onClick={(e) => handleForgotPassword(e)} className='w-full bg-primary text-white rounded-xl py-2 font-bold text-md hover:opacity-75'>Take OPT from your email</button>
                                    </div>

                                    {/*  */}
                                    <hr className=' border-y' />
                                    <h1 className=' text-center text-xl font-bold mt-3'>Enter OPT and reset password</h1>
                                    <div className='flex items-center w-3/4 mx-auto'>
                                        <label htmlFor="opt" className='flex-1 text-lg'>OPT:</label>
                                        <input value={opt} onChange={(e) => setOPT(e.target.value)}
                                            type="text" name='opt' placeholder='Enter your OPT' className=' pl-2 py-1 text-lg w-64' />
                                    </div>
                                    <div className='flex items-center w-3/4 mx-auto'>
                                        <label htmlFor="password" className='flex-1 text-lg'>RePassword:</label>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)}
                                            type="password" name='password' placeholder='Enter new password' className=' pl-2 py-1 text-lg w-64' />
                                    </div>
                                    <div className='flex w-3/4 mx-auto'>
                                        <button onClick={(e) => handleUpdatePassword(e)} className='w-full bg-primary text-white rounded-xl py-2 font-bold text-md hover:opacity-75'>Send verify to your email</button>
                                    </div>
                                </>
                        }
                    </form>
                    {
                        !forgotPasswordMode ?
                            <>
                                <div className='flex w-3/4 mx-auto justify-between'>
                                    <button onClick={() => onForgotPasswordMode()} className=' text-left text-lg pt-4 underline hover:opacity-70 '>Forgot your password?</button>
                                    <button className=' text-left text-lg pt-4 underline hover:opacity-70 '>You don't have Account?</button>
                                </div>
                            </>
                            :
                            <div className='flex w-3/4 mx-auto justify-between'>
                                <button onClick={() => offForgotPasswordMode()} className=' text-left text-lg pt-4 underline hover:opacity-70 '>Back</button>
                            </div>
                    }
                </div>
            </div >
        </>
    )
}
