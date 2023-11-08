import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { postsVerified } from '../service/postService'

export default function () {
    const [posts, setPosts] = useState([]);

    const getPostsVerified = async () => {
        await postsVerified()
            .then(res => {
                setPosts(res.data.data);
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getPostsVerified();
    }, [])
    console.log(posts);
    return (
        <>
            <header className=' h-[37.5rem] w-full bg-header-img'>
                <Nav />
            </header>
            <main className='flex flex-col gap-4 max-w-6xl mx-auto mt-36'>
                <div>
                    <h1 className='text-3xl font-bold'>Popular topics</h1>
                </div>
                <div className='flex justify-between text-lg text-primary'>
                    <ul className='flex gap-4'>
                        <li className=' hover:text-yellow-500 hover:underline cursor-pointer py-2'>Back-end</li>
                        <li className=' hover:text-yellow-500 hover:underline cursor-pointer py-2'>Front-end</li>
                    </ul>
                    <div>
                        <p className='hover:text-yellow-500 hover:underline cursor-pointer py-2'>View All</p>
                    </div>
                </div>

                <section className='flex flex-wrap'>
                    {
                        posts ?
                            posts.map(post => {
                                return (
                                    <div key={post.id} className=' w-1/4 px-2 flex flex-col gap-4 cursor-pointer'>
                                        <div className='w-full h-54 rounded-md relative'>
                                            <img src="/img/article.jpg" alt="theme" className=' object-cover w-full h-full rounded-md' />
                                            <div
                                                className='absolute top-0 right-0 text-white font-semibold px-2 py-1 bg-rgba-topic rounded-lg mt-1 mr-1'>
                                                {post.Topic.name}
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <h1 className='text-2xl font-semibold hover:opacity-75 hover:underline cursor-pointer'>{post.title}</h1>
                                            <p className='text-primary line-clamp-3 '>{post.article}</p>
                                            <div className='flex justify-between'>
                                                <p className='text-primary text-right mt-2'>Views: {post.views}</p>
                                                <p className='text-primary text-right mt-2 italic'>{post.User.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <>
                                Loading...
                            </>
                    }

                </section>
            </main>
        </>
    )
}
