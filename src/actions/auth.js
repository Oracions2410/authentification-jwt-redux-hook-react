import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT, SET_MESSAGE
} from './types'

import AuthService from '../services/auth.service'


/**
 * Save new User 
 * @param {*} username 
 * @param {*} email 
 * @param {*} password 
 * @param {*} confirmPassword 
 */
export const register = (username, email, password, confirmPassword) => (dispatch) => {
    return AuthService.register(username, email, password, confirmPassword)
        .then(response => {
            console.log('>>>>>>>>>>>>>>>>-------', response)

            dispatch({
                type: REGISTER_SUCCESS
            })

            dispatch({
                type: SET_MESSAGE,
                payload: response.data
            })

            return Promise.resolve()

        },
            error => {
                console.log('<<<<<<<<<<<<<<<<', error.response)
                dispatch({
                    type: REGISTER_FAIL
                })

                dispatch({
                    type: SET_MESSAGE,
                    payload: error.message
                })

                return Promise.reject()
            })
}



/**
 * Authentify user with credentials
 * @param {*} login 
 * @param {*} password 
 */
export const login = (login, password) => (dispatch) => {
    return AuthService.login(login, password)
        .then(data => {

            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data }
            })

            return Promise.resolve()
        },
            error => {
                dispatch({
                    type: LOGIN_FAIL
                })

                dispatch({
                    type: SET_MESSAGE,
                    payload: error.message
                })

                return Promise.reject()

            })

}

/**
 * Destry user session
 */
export const logout = () => (dispatch) => {
    AuthService.logout()
    dispatch({
        type: LOGOUT
    })
}