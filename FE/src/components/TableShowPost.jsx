import React, { useEffect, useState } from 'react'
import { deletePost, getPostDetail, postsNotVerified, postsVerified } from '../service/postService';
import dayjs from 'dayjs'
import { verifyPost } from '../service/adminService';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function TableShowPost(props) {
    const typeTable = props.type;
    const updateFlag = props.tableUpdateFlag;

    const navigate = useNavigate();
    const [postsNeedCheck, setPostsNeedCheck] = useState([]);
    const [posts, setPosts] = useState([]);

    const handleCheckVerifiedPost = async (id) => {
        await verifyPost(id)
            .then(res => {
                console.log(res);
                updatePosts();
                props.setTableUpdateFlag(!updateFlag);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleShowDetailPost = async (postId) => {
        await getPostDetail(postId)
            .then(res => {
                console.log(res);
                navigate(`post/${postId}`)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleDeletePost = async (postId) => {
        await deletePost(postId)
            .then(res => {
                updatePosts();
                if (res.data.data === 0) {
                    toast.success(res.data.message);
                    props.setTableUpdateFlag(!updateFlag);
                } else {
                    toast.success(res.data.message);
                }
            })
            .catch(err => {
                toast.error("Lỗi hệ thống");
                console.log(err);
            })
    }

    const updatePosts = () => {
        try {
            postsNotVerified()
                .then(res => {
                    setPostsNeedCheck(res.data.data);
                })
                .catch(err => {
                    console.log('Error Post not verified', err);
                })
            postsVerified()
                .then(res => {
                    setPosts(res.data.data);
                })
                .catch(err => {
                    console.log('Error Post verified', err);
                })
        }
        catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        updatePosts();
    }, [updateFlag])

    return (
        <table className='border-2 border-black w-full'>
            <thead>
                <tr className='border-2 border-black'>
                    <th className='border-2 border-black py-2'>Id</th>
                    <th className='border-2 border-black py-2'>Title</th>
                    <th className='border-2 border-black py-2'>User Name </th>
                    <th className='border-2 border-black py-2'>Topic</th>
                    <th className='border-2 border-black py-2'> {typeTable === 'check' ? 'Created At' : 'Verified At'}</th>
                    <th className='border-2 border-black py-2'>Option</th>
                </tr>
            </thead>
            <tbody>
                {

                    typeTable === 'check' && postsNeedCheck ?
                        postsNeedCheck.map((post, index) => {
                            return (
                                <tr key={index} className='border-2 border-black'>
                                    <td className='border-2 text-center border-black py-2'>{index + 1}</td>
                                    <td className='border-2 text-center border-black py-2 w-40'>{post.title}</td>
                                    <td className='border-2 text-center border-black py-2'>{post.User.name}</td>
                                    <td className='border-2 text-center border-black py-2'>{post.Topic.name}</td>
                                    <td className='border-2 text-center border-black py-2'>{dayjs(post.createdAt).format('DD/MM/YYYY')}</td>
                                    <td className='border-2 text-center border-black py-2'>
                                        <button onClick={() => handleShowDetailPost(post.id)} className='rounded bg-blue-400 px-1  mr-3 hover:opacity-75'><i className="fa-solid fa-eye"></i></button>
                                        <button onClick={() => handleCheckVerifiedPost(post.id)} className='rounded bg-green-400 px-1 hover:opacity-75 mr-3'><i className="fa-solid fa-check"></i></button>
                                        <button onClick={() => handleDeletePost(post.id)} className='rounded bg-red-400 px-1 hover:opacity-75'><i className="fa-solid fa-ban"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                        :
                        posts.map((post, index) => {
                            return (
                                <tr key={index} className='border-2 border-black'>
                                    <td className='border-2 text-center border-black py-2'>{index + 1}</td>
                                    <td className='border-2 text-center border-black py-2 w-40'>{post.title}</td>
                                    <td className='border-2 text-center border-black py-2'>{post.User.name}</td>
                                    <td className='border-2 text-center border-black py-2'>{post.Topic.name}</td>
                                    <td className='border-2 text-center border-black py-2'>{dayjs(post.updatedAt).format('DD/MM/YYYY')}</td>
                                    <td className='border-2 text-center border-black py-2'>
                                        <Link to={`/post/${post.id}`}><button className='rounded bg-blue-400 px-1 hover:opacity-75 mr-3'><i className="fa-solid fa-eye"></i></button></Link>
                                        <button onClick={() => handleDeletePost(post.id)} className='rounded bg-red-400 px-1 hover:opacity-75'><i className="fa-solid fa-ban"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                }
            </tbody>
        </table>
    )
}
