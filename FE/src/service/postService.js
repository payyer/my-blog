import axios from 'axios';

const postsNotVerified = async () => {
    return await axios.get('http://localhost:8080/api/v1/post/post-unverified', { withCredentials: true })
}

const postsVerified = async () => {
    return await axios.get('http://localhost:8080/api/v1/post/post-verified', { withCredentials: true })
}

const getPostDetail = async (postId) => {
    return await axios.get(`http://localhost:8080/api/v1/post/detail/${postId} `, { withCredentials: true })
}

const deletePost = async (postId) => {
    return await axios.delete(`http://localhost:8080/api/v1/post/delete/${postId}`, { withCredentials: true })
}

export { postsNotVerified, postsVerified, deletePost, getPostDetail };