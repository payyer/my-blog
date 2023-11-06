import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { register } from '../service/userService';

export default function ModalRegister({ closeRegister }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        await register(email, password, name, age, gender, phone)
            .then(res => {
                console.log('API Register', res);
                if (res.data.status === 0) {
                    closeRegister();
                    toast.success(res.data.message);
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
            <div onClick={() => closeRegister()} className='flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-rgba'>
                <div onClick={(e) => e.stopPropagation()} className='w-[30rem] bg-white rounded-xl py-6 text-primary text-lg'>
                    <h1 className=' text-center text-3xl font-bold'>Register</h1>
                    <form className='flex flex-col gap-4 mt-2'>
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

                        <div className='flex items-center w-3/4 mx-auto'>
                            <label htmlFor="name" className='flex-1 text-lg'>User name:</label>
                            <input value={name} onChange={(e) => setName(e.target.value)}
                                type="text" name='name' placeholder='Enter your name' className=' pl-2 py-1 text-lg w-64' />
                        </div>

                        <div className='flex items-center w-3/4 mx-auto'>
                            <label htmlFor="age" className='flex-1 text-lg'>Age:</label>
                            <input value={age} onChange={(e) => setAge(e.target.value)}
                                type="text" name='age' placeholder='Enter your age' className=' pl-2 py-1 text-lg w-64' />
                        </div>

                        <div className='flex items-center w-3/4 mx-auto'>
                            <label htmlFor="age" className='flex-1 text-lg'>Gender:</label>
                            <select value={gender} onChange={(e) => setGender(e.target.value)}
                                type="text" name='age' className=' pl-2 py-1 text-lg w-64'>
                                <option value="">-- Select --</option>
                                <option value="Male">-- Male --</option>
                                <option value="Female">-- Female --</option>
                                <option value="Other">-- Other --</option>
                            </select>
                        </div>

                        <div className='flex items-center w-3/4 mx-auto'>
                            <label htmlFor="phone" className='flex-1 text-lg'>Phone:</label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)}
                                type="text" name='phone' placeholder='Enter your password' className=' pl-2 py-1 text-lg w-64' />
                        </div>

                        <div className='flex w-3/4 mx-auto'>
                            <button onClick={(e) => handleRegister(e)} className='w-full bg-primary text-white rounded-xl py-2 font-bold text-md'>Register</button>
                        </div>
                    </form>
                    <div className='flex w-3/4 mx-auto'>
                        <button className=' text-left text-lg pt-4 underline hover:opacity-70 '>Login now!</button>
                    </div>
                </div>
            </div >
        </>
    )
}
