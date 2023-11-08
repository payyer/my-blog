import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableShowPost from '../components/TableShowPost';
export default function AdminManager() {

    const [tableUpdateFlag, setTableUpdateFlag] = useState(false);
    const token = Cookies.get('user_access');

    const navigate = useNavigate();


    useEffect(() => {
        if (token) {
            const user = jwtDecode(token);
            console.log(user);
            if (user.role !== 'admin') {
                toast.error("Bạn không có quyền truy cập!")
                navigate('/');
            }
        } else {
            toast.error("Bạn không có quyền truy cập!")
            navigate('/');
        }
    }, [])
    return (
        <>
            <Nav />
            <main className='flex max-w-7xl mx-auto pt-20'>
                <div className=' w-1/2 px-3 '>
                    <p className='text-3xl py-4 text-center font-bold'>
                        The posts have not been moderated
                    </p>
                    <TableShowPost type={'check'} tableUpdateFlag={tableUpdateFlag} setTableUpdateFlag={setTableUpdateFlag} />
                </div>
                <div className=' w-1/2 px-3 '>
                    <p className='text-3xl py-4 text-center font-bold'>
                        Posts have been moderated
                    </p>
                    <TableShowPost type={'verified'} tableUpdateFlag={tableUpdateFlag} setTableUpdateFlag={setTableUpdateFlag} />
                </div>
            </main>
        </>

    )
}
