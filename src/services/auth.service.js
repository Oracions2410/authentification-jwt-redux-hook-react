import axios from 'axios'

const URL = 'https://api.dastudy.net/api/v1/accounts/'

const register = (username, email, password, confirmPassword) => {
    return axios.post(URL + 'register', { username, email, password, confirmPassword })
}

const login = (login, password) => {
    return axios.post(URL + 'register', { login, password })
        .then(response => {
            localStorage.setItem('user', response.data)
        })
}

const logout = () => {

}

export default {
    register,
    login,
    logout
}