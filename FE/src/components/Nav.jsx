import React, { useState } from 'react'
import ModalLogin from './ModalLogin'
import ModalRegister from './ModalRegister';
import { toast } from 'react-toastify';

export default function Nav() {
    const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
    const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);

    const openLogin = () => {
        setIsModalLoginOpen(true);
    }

    const closeLogin = () => {
        setIsModalLoginOpen(false);
    }

    const openRegister = () => {
        setIsModalRegisterOpen(true);
    }

    const closeRegister = () => {
        setIsModalRegisterOpen(false);
    }

    return (
        <>
            <nav className=' fixed bg-rgba h-20 w-full text-white'>
                <div className='flex justify-between max-w-6xl h-full mx-auto items-center'>
                    <div>
                        <h1 className='flex text-2xl font-bold cursor-pointer'>AnhHocIT</h1>
                    </div>
                    <div className='flex text-md font-bold '>
                        <ul className='flex'>
                            <li onClick={() => openLogin()} className='py-2 px-4 hover:opacity-75 cursor-pointer'>Login</li>
                            <li onClick={() => openRegister()} className='py-2 px-4 hover:opacity-75 cursor-pointer'>Register</li>
                        </ul>
                        <i className="fa-solid fa-magnifying-glass py-2 px-4 mt-1 hover:opacity-75 cursor-pointer"></i>
                    </div>
                </div>
            </nav>

            {
                isModalLoginOpen &&
                <ModalLogin closeLogin={closeLogin} />
            }

            {
                isModalRegisterOpen &&
                <ModalRegister closeRegister={closeRegister} />
            }
        </>
    )
}
