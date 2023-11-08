import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav';
import { getPostDetail, postsVerified, } from '../service/postService';
import { destroyComment, getComments, postComment } from '../service/commentService';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
export default function PostDetail() {
    const token = Cookies.get('user_access')
    const user = jwtDecode(token);
    const navigate = useNavigate();

    const postId = location.pathname.split('/')[2];
    const [posts, setPosts] = useState([]);
    const [postDetail, setPostsDetail] = useState({});
    const [articleComment, setArticleComment] = useState('');

    const [nameAuthor, setNameAuthor] = useState('');
    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount] = useState(0);
    const commentCurrentPost = comments.filter(item => item.postId == postId);

    const getPost = async () => {
        await getPostDetail(postId)
            .then(res => {
                setNameAuthor(res.data.data.User.name);
                setPostsDetail(res.data.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getPosts = async () => {
        await postsVerified()
            .then(res => {
                setPosts(res.data.data)
            })
            .catch(err => {
                console.log(res);
            })
    }

    const getComment = async () => {
        await getComments()
            .then(res => {
                setComments(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const createComment = async (e, postId) => {
        e.preventDefault();
        await postComment(postId, articleComment)
            .then(res => {

                if (res.data.status === 0) {
                    toast.success(res.data.message);
                    setArticleComment('');
                    setCommentCount(commentCount + 1);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteComment = async (commentId) => {
        await destroyComment(commentId)
            .then(res => {
                console.log(res);
                setCommentCount(commentCount + 1);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const changeToAnotherPost = (id) => {
        navigate(`/post/${id}`);
        window.scroll(0, 0);
    }

    useEffect(() => {
        getPosts();
        getPost();
        getComment();
    }, [commentCount])

    return (
        <>
            <Nav />
            <main className='flex max-w-6xl mx-auto pt-28'>
                <div className=' w-2/12 text-center'><span className='font-semibold'>Date: </span>{postDetail ? dayjs(postDetail.updatedAt).format('DD/MM/YYYY') : 'Loading'}</div>
                <div className='flex flex-col w-8/12 gap-4'>
                    {
                        postDetail &&
                        (
                            <div key={postDetail.id}>
                                <h1 className=' text-4xl font-bold text-center'>{postDetail.title}</h1>
                                <div>
                                    {postDetail.article}
                                </div>
                                <p className='text-right text-primary'>Views: {postDetail.views}</p>
                                <p className='text-right italic text-primary'>Author: {nameAuthor}</p>
                            </div>
                        )
                    }
                    <section className='flex flex-col gap-3'>
                        <p>All Comment</p>
                        <form>
                            <div className='flex items-center'>
                                <textarea name="article" value={articleComment} onChange={(e) => setArticleComment(e.target.value)} id="" cols="80" rows="2" placeholder='Comment right now!' className=' p-4 border border-secondary'>

                                </textarea>
                                <button onClick={(e) => createComment(e, postDetail.id)}
                                    className=' bg-blue-500 px-5 ml-5 text-white font-bold shadow-xl rounded-md hover:opacity-80'>
                                    Submit
                                </button>
                            </div>
                        </form>
                        {
                            commentCurrentPost &&
                            commentCurrentPost.map((comment) => {
                                return (
                                    <div key={comment.id} className='flex justify-between items-center border-b p-2 border-secondary'>
                                        <div>
                                            <p className='font-semibold'>{comment.User.name}</p>
                                            <p>{comment.article}</p>
                                        </div>
                                        {
                                            comment.userId === user.id &&
                                            (
                                                <div className='text-white flex gap-3'>
                                                    <button className='px-2 py-1 rounded-md hover:bg-gray-600 bg-gray-500'>Edit</button>
                                                    <button onClick={() => deleteComment(comment.id)} className='px-2 py-1 rounded-md hover:bg-red-600 bg-red-500'>Delete</button>
                                                </div>
                                            )
                                        }

                                    </div>
                                )
                            })

                        }
                    </section>

                    <section className='mt-4 w-full pb-12'>
                        <h2 className='text-3xl font-bold'>Another posts</h2>
                        <div className='flex w-full flex-wrap'>
                            {
                                posts &&
                                posts.map((post, index) => {
                                    return (
                                        <div onClick={() => changeToAnotherPost(post.id)} key={index} className='flex flex-col gap-4 w-1/3 px-1 cursor-pointer py-2'>
                                            <div className='w-full h-40 '>
                                                <img src="/img/article.jpg" alt="Ảnh ở đây" className=' object-cover h-full w-full' />
                                            </div>
                                            <div>
                                                <h1 className='text-2xl font-semibold hover:opacity-75 hover:underline'>{post.title}</h1>
                                                <p className='text-primary line-clamp-3'>{post.article}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
