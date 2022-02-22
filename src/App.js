
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

const App = () => {
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

        sessionStorage.removeItem('myToken');
      }
    })
  };
  return (
    <Router>
      <div className="container mt-1 mb-2 py-3 bg-primary">
        <Navbar  NavLink={NavLink} logout={logout}/>        
        <div className="container mt-1 mb-2 py-3 bg-primary">
          <Switch>
              <PublicRoute path='/'         exact loggedIn={loggedIn} component={Welcome} />
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
