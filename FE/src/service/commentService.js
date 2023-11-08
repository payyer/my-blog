import axios from "axios";

const getComments = async () => {
    return await axios.get(`http://localhost:8080/api/v1/comment`, { withCredentials: true })
}

const postComment = async (postId, article) => {
    return await axios.post(`http://localhost:8080/api/v1/comment/create/${postId}`, { article }, { withCredentials: true })
}
const destroyComment = async (commentId) => {
    return await axios.delete(`http://localhost:8080/api/v1/comment/delete/${commentId}`, { withCredentials: true })
}
export { getComments, postComment, destroyComment };