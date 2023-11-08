import React, { useEffect, useState } from 'react'
import ModalLogin from './ModalLogin'
import ModalRegister from './ModalRegister';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
export default function Nav() {
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [isLogded, setIsLogded] = useState({});
    const token = Cookies.get('user_access');

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setUserName(decoded.name);
            setUserRole(decoded.role);
            setIsLogded(true);
        } else {
            setIsLogded(false);
        }
    }, [token])

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

    const logoutUser = () => {
        Cookies.remove('user_access');
        toast.success('Đăng xuất thành cộng');
        setIsLogded(false);
        setUserRole('');
        setUserName('');
    }

    const openAdminManager = () => {
        navigate('/admin')
    }

    return (
        <>
            <nav className=' fixed bg-rgba h-20 w-full text-white z-20'>
                <div className='flex justify-between max-w-6xl h-full mx-auto items-center'>
                    <div onClick={() => navigate('/')}>
                        <h1 className='flex text-2xl font-bold cursor-pointer'>AnhHocIT</h1>
                    </div>
                    <>
                        <div className='flex text-md font-bold '>
                            <ul className='flex'>
                                {
                                    isLogded ?
                                        <>
                                            <li className='py-2 px-4 hover:opacity-75 cursor-pointer'>{userName}</li>
                                            {
                                                userRole === 'admin' ?
                                                    <>
                                                        <li onClick={() => openAdminManager()} className='py-2 px-4 hover:opacity-75 cursor-pointer'><Link to>Admin Manager</Link> </li>
                                                    </>
                                                    :
                                                    <>
                                                        <li onClick={() => logoutUser()} className='py-2 px-4 hover:opacity-75 cursor-pointer'>My profile</li>
                                                    </>
                                            }

                                            <li onClick={() => logoutUser()} className='py-2 px-4 hover:opacity-75 cursor-pointer'>Logout</li>
                                        </>

                                        :

                                        <>
                                            <li onClick={() => openLogin()} className='py-2 px-4 hover:opacity-75 cursor-pointer'>Login</li>
                                            <li onClick={() => openRegister()} className='py-2 px-4 hover:opacity-75 cursor-pointer'>Register</li>
                                        </>
                                }
                            </ul>
                            <i className="fa-solid fa-magnifying-glass py-2 px-4 mt-1 hover:opacity-75 cursor-pointer"></i>
                        </div>
                    </>
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
