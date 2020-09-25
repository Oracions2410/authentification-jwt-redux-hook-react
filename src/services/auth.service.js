import axios from 'axios'

const URL = 'https://api.dastudy.net/api/v1/accounts/'

const register = (username, email, password, confirmPassword) => {
    return axios.post(URL + 'register/', { username, email, password, confirmPassword })
}

const login = (login, password) => {
    return axios.post(URL + 'login/', { login, password })
        .then(response => {
            localStorage.setItem('user', response.data)
        })
}

const logout = () => {
    localStorage.removeItem('user')
}

export default {
    register,
    login,
    logout
}