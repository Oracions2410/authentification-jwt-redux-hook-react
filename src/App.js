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

import { Test } from './Test'



// class App extends React.Component {

//   constructor(props ) {
//     super(props)
//     console.log('construction.....')
//   }

//   state = {
//     counter: 0,
//     test: new Test()
//   }


//   render() {
//     const increment = (value) => this.setState({ counter: ++value })

//     return <>
//       <button onClick={() => increment(this.state.counter)}>{this.state.counter}</button>
//     </>
//   }



// }



function App() {



  //const [test, setTest] = useState()
  const [counter, setCounter] = useState(0)




  const [showModeratorBord, setShowModeratorBord] = useState(false)
  const [showAdminBord, setShowAdminBord] = useState(false)

  const { user: currentUser } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {

    console.log('...executed....')
    const test = new Test()
    test.$o = 34

    console.log(test.$o)

    test.$o = 4

    console.log(test.$o)

    test.$o = 6

    console.log(test.$o)


    history.listen((location) => {
      dispatch(clearMessage())
    })
  }, [dispatch])

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBord(currentUser.roles.includes('ROLE_MODERATOR'))
      setShowAdminBord(currentUser.roles.includes('ROLE_ADMIN'))
    }
  })

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

            {currentUser && (
              <li className="nav-item">
                <Link to={'/profile'}>Profile</Link>
              </li>
            )}

          </div>


          <div className="navbar-nav ml-auto">

            <li className="nav-item">
              <Link to={'/login'} className="nav-link">Login</Link>
            </li>

            <li className="nav-item">
              <Link to={'/register'} className="nav-link">Sign up</Link>
            </li>

          </div>

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




        {/* <button onClick={() => setCounter(counter + 1)} className="btn btn-primary btn-block">{counter}</button> */}




      </div>

    </Router >

  );
}

export default App;
