import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import apiClient from './services/api';


const App = () => {

  const [profile, setProfile] = React.useState(
    JSON.parse(localStorage.getItem('userObject'))
  );

  const [loggedIn, setLoggedIn] = React.useState(
    sessionStorage.getItem('loggedIn') === 'true' || false
  );

  const [getToken, setToken] = React.useState(
    sessionStorage.getItem('myToken')   );

  const tokenized = (props) => {
    sessionStorage.setItem('myToken', props);
  };

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
  const authLink = loggedIn 
    ? <a href="#" onClick={logout} className="nav-link "> <i class="fa fa-share-square" aria-hidden="true"></i> Logout ( {profile.name} ) </a> 
    : <NavLink to='/login' className="nav-link"><i class="fa fa-user" aria-hidden="true"></i> Login</NavLink>;
  return (
    <Router>
      <div className="container mt-1 mb-2 py-3 bg-primary">
        
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary p-3">
        <a className="navbar-brand" href="#"><i className="fa fa-cog fa-spin"></i> React Flix</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink as={NavLink} to='/home' className="nav-link">Home</NavLink>
              </li>

          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item ">
              {authLink}
            </li>
          </ul>
          </div>
        </nav>
        
        <div className="container mt-1 mb-2 py-3 bg-primary">
          <Switch>

            <Route path='/home' exact render={props => (
              <Home {...props} loggedIn={loggedIn} tokenized={tokenized} />
            )} /> 

            <Route path='/login' render={props => (
              <Login {...props} login={login} tokenized={tokenized} />
            )} />
          </Switch>
        </div>
      </div>  
    </Router>
  );
};

export default App;
