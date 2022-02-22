import React from 'react';
import { Redirect } from 'react-router-dom';
import apiClient from '../services/api';

const Register = (props) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [toHome, setToHome] = React.useState(false);
    //const [myToken, setMytoken] = React.useState(false);
    const [authError, setAuthError] = React.useState(false);
    const [unknownError, setUnknownError] = React.useState(false);

    const [errorMsg, setErrorMsg] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = React.useState(false);



    const handleSubmit = (e) => {
        e.preventDefault();
        setAuthError(false);
        setUnknownError(false); 
       // props.setMyToken(false);
   
        apiClient.post('/api/auth/Register', {
            email: email,
            password: password
        }).then(response => {
            console.log(response);
            if (response.status === 200) {

                setToHome(true); // redirect
            }
        }).catch(error => {
            if (error.response && error.response.status === 422) {
                setAuthError(true);
                setErrorMsg(error.response.data.message);
                if (error.response.data.errors.email) {
                    setEmailError(true);
                    setEmailErrorMsg(error.response.data.errors.email[0]);
                    }       
            } else {
                setUnknownError(true);
                console.error(error);
            }
        });
      
    }

    if (toHome === true) {
        return <Redirect to='/home' />
    }
    
    return (
        <div className="row">
            <div className="col-4">
                <img className="img-fluid rounded" src="/img/Register.jpg" alt="" />
            </div>
            
            <div className="col-8">
            
            <div className="card"  >

                <div className="card-body">
                {authError ? <div className="alert alert-danger"> { errorMsg }</div> : null}
                <h3>  <i className="fa fa-cog"></i> Register</h3>
                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
           
                        
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                            
                                    <span className="input-group-text" id="inputGroup-sizing-default"><i className="fa fa-user"></i></span>
                                    <input
                                        type="email"
                                        name="email"
                                        className={"form-control" + (authError || unknownError ? ' is-invalid' : '')}
                                        placeholder="Email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                    />
                                    {emailError ? <span className="invalid-feedback" ><strong>{emailErrorMsg}</strong></span> : null }  

                            
                            </div>


                            <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default"><i className="fa fa-lock"></i></span>
                                <input
                                    type="password"
                                    name="password"
                                    className={"form-control" + (authError || unknownError ? ' is-invalid' : '')}
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        
                                <button type="submit" className="btn btn-primary">Register</button>
                                &nbsp;  
                                <button type="button" className="btn btn-warning">Register</button> 
                        </form>

                </div>
            </div>
            </div>
        </div>
    );
};

export default Register;