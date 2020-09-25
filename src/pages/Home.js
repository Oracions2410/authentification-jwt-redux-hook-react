import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {

    const { loggedIn } = useSelector(state => state.auth)

    if (!loggedIn) {
        return <Redirect to={'/login'} />
    }

    return (<>
        <h1 style={{ color: 'red' }}>Home</h1>
    </>)
}

export default Home