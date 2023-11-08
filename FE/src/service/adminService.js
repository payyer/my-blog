import axios from 'axios';

const verifyPost = async (postId) => {
    return await axios.put('http://localhost:8080/api/v1/admin/censorship', { postId }, { withCredentials: true })
}


export { verifyPost }