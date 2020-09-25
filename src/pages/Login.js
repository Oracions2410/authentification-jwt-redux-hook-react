import React, { useState, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'


import { login as loginAction } from '../actions/auth'

/**
 * 
 * @param {*} value 
 */
const required = (value) => {
    if (!value) {
        return <div className="alert alert-danger" role="alert">
            The field is required
        </div>
    }
}

/**
 * 
 * @param {*} props 
 */
const Login = (props) => {

    const form = useRef()
    const checkBtn = useRef()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const { loggedIn } = useSelector(state => state.auth)
    const { message } = useSelector(state => state.message)

    const dispatch = useDispatch()


    if (loggedIn) {
        return <Redirect to="/home" />
    }

    /**
     * 
     * @param {*} e 
     * @param {*} setValue 
     */
    const handleChange = (e, setValue) => setValue(e.target.value)


    /**
     * 
     * @param {*} e 
     */
    const handleLogin = (e) => {
        e.preventDefault()

        setLoading(true)

        form.current.validateAll()

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(loginAction(login, password))
                .then(() => {
                    props.history.push('/home')
                    window.location.reload()
                })
                .catch(() => {
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }

    }


    return <>
        <div className="col-md-12">
            <div className="card card-container">

                <img src={require('../assets/images/avatar_2x.png')}
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleLogin} ref={form}>

                    {/* Login field */}
                    <div className="form-group">
                        <label htmlFor="login">Login</label>
                        <Input
                            type="text"
                            name="login"
                            value={login}
                            onChange={(e) => handleChange(e, setLogin)}
                            className="form-control"
                            validations={[required]}
                        />
                    </div>

                    {/* Password field */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => handleChange(e, setPassword)}
                            className="form-control"
                            validations={[required]}
                        />
                    </div>

                    {/* Submit button */}
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading ?
                                (<span className="spinner-border spinner-border-sm"></span>)
                                : (
                                    <span>LOGIN</span>
                                )}
                        </button>
                    </div>

                    {/* Show errors message */}
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">{message}</div>
                        </div>
                    )}

                    <CheckButton style={{ display: 'none' }} ref={checkBtn} />
                </Form>

            </div>
        </div>
    </>
}

export default Login


