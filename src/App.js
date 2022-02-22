
import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

import Welcome from './components/Welcome';
import Home from './components/Home';
import Login from './components/Login';
import Movies from './components/Movies';
import Navbar from './components/Navbar';

import apiClient from './services/api';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import Register from './components/Register';

const App = () => {
  const [profile, setProfile] = React.useState(
    JSON.parse(localStorage.getItem('userObject'))
  );

  const [loggedIn, setLoggedIn] = React.useState(
    sessionStorage.getItem('loggedIn') === 'true' || false
  );
  const login = () => {
    setLoggedIn(true);
    sessionStorage.setItem('loggedIn', true);
  };
  const logout = () => {
    apiClient.post('/api/auth/logout').then(response => {
      if (response.status === 200) {
        setLoggedIn(false);
        sessionStorage.setItem('loggedIn', false);
      }
    })
  };

  const authLink = loggedIn 
  ? <a href="#" onClick={logout} className="nav-link "> <i className="fa fa-share-square" aria-hidden="true"></i> Logout ( {profile.name} ) </a> 
  : <NavLink to='/login' className="nav-link"><i className="fa fa-user" aria-hidden="true"></i> Login</NavLink>;

  return (
    <Router>
      <div className="container mt-1 mb-2 py-3 bg-primary">
        <Navbar  NavLink={NavLink} authLink={authLink}/>        
        <div className="container mt-1 mb-2 py-3 bg-primary">
          <Switch>
              <PublicRoute path='/'         exact loggedIn={loggedIn} component={Welcome} />
              <PublicRoute path='/register' exact loggedIn={loggedIn} component={Register} />

              <PrivateRoute path='/home'    loggedIn={loggedIn} component={Home} />
              <PrivateRoute path='/movies'  loggedIn={loggedIn} component={Movies} />
              
              
              <Route path='/login' render={props => (
                <Login {...props} login={login}  />
              )} />

          </Switch>
        </div>
      </div>  
    </Router>
  );
};
export default App;
