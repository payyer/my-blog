import axios from 'axios';

const login = async (email, password) => {
    return await axios.post('http://localhost:8080/api/v1/auth/login', { email, password }, { withCredentials: true })
}

const logout = async () => {
    return await axios.delete('http://localhost:8080/api/v1/auth/logout', { withCredentials: true })
}

const register = async (email, password, name, age, gender, phone) => {
    return await axios.post('http://localhost:8080/api/v1/auth/register', { email, password, name, age, gender, phone }, { withCredentials: true })
}

const forgotPassword = async (email) => {
    return await axios.post('http://localhost:8080/api/v1/auth/forgot-password', { email }, { withCredentials: true })
}

const updatePassword = async (password, opt) => {
    return await axios.put('http://localhost:8080/api/v1/auth/reset-password', { password, opt }, { withCredentials: true })
}

export { login, register, logout, forgotPassword, updatePassword }