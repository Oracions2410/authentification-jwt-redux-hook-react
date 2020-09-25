import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types'

const user = localStorage.getItem('user')

const initialState = user ? { loggedIn: true, user } : { loggedIn: false, user: null }


/**
 * 
 * @param {*} state 
 * @param {*} action 
 */
export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case REGISTER_SUCCESS:
            return { ...state, loggedIn: false }

        case REGISTER_FAIL:
            return { ...state, loggedIn: false }

        case LOGIN_SUCCESS:
            return { ...state, loggedIn: true, user: payload.user }

        case LOGIN_FAIL:
            return { ...state, loggedIn: false, user: null }

        case LOGOUT:
            return { ...state, loggedIn: false, user: null }

        default:
            return state
    }
}