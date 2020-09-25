import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Moderator from './pages/Moderator'


import { logout } from './actions/auth'
import { clearMessage } from './actions/messages'

import { history } from './helpers/history'


import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'


function App() {

  const [showModeratorBord, setShowModeratorBord] = useState(false)
  const [showAdminBord, setShowAdminBord] = useState(false)

  const { user: currentUser } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {

    history.listen((location) => {
      dispatch(clearMessage())
    })

  }, [dispatch])



  // useEffect(() => {

  //   if (currentUser) {
  //     setShowModeratorBord(currentUser.roles.includes('ROLE_MODERATOR'))
  //     setShowAdminBord(currentUser.roles.includes('ROLE_ADMIN'))
  //   }

  // }, [currentUser])



  const logOut = () => dispatch(logout())

  return (

    <Router history={history}>

      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">

          <Link to={'/'} className="navbar-brand">
            DEVORA
          </Link>

          <div className="navbar-nav mr-auto">

            <li className="nav-item">
              <Link to={'/home'} className="nav-link">Home</Link>
            </li>

            {showModeratorBord && (
              <li className="nav-item">
                <Link to={'/mod'} className="nav-link">Moderator Bord</Link>
              </li>
            )}

            {showAdminBord && (
              <li className="nav-item">
                <Link to={'/admin'} className="nav-link">Administration bord</Link>
              </li>
            )}

          </div>

          {currentUser ?
            (
              <div className="navbar-nav ml-auto">

                <li className="nav-item">
                  <Link to={'/profile'} className="nav-link">{currentUser.username}</Link>
                </li>

                <li>
                  <a href="/login" onClick={logOut} className="nav-link">Log Out</a>
                </li>

              </div>
            ) :

            (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={'/login'} className="nav-link">Log in</Link>
                </li>

                <li className="nav-item">
                  <Link to={'/register'} className="nav-link">Sign up</Link>
                </li>
              </div>
            )}


        </nav>
      </div>



      <div className="container mt-3">
        <Switch>

          <Route exact path={['/', '/home']} component={Home} />
          <Route exact path={'/login'} component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/mod" component={Moderator} />
          <Route path="/admin" component={Admin} />
          <Route path="profile" component={Profile} />

        </Switch>
      </div>

    </Router >

  );
}

export default App;
