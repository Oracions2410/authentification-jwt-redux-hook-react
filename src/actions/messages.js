import { SET_MESSAGE, CLEAR_MESSAGE } from './types'

export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message
})

export const CLEAR_MESSAGE = () => ({
    type: CLEAR_MESSAGE
})