import React from 'react';
import { Redirect } from 'react-router-dom';
import apiClient from '../services/api';

const Register = (props) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');

    const [toLogin, setToLogin] = React.useState(false);
    const [toRegister, setToRegister] = React.useState(false);
    
    const [authError, setAuthError] = React.useState(false);
    const [unknownError, setUnknownError] = React.useState(false);

    const [errorMsg, setErrorMsg] = React.useState(false);
    const [nameErrorMsg, setNameErrorMsg] = React.useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = React.useState(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = React.useState(false);



    const handleSubmit = (e) => {
        e.preventDefault();

        setNameErrorMsg(false);
        setEmailErrorMsg(false);
        setPasswordErrorMsg(false);

        setAuthError(false);
        setUnknownError(false); 

        apiClient.post('/api/auth/register', {

            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,

        }).then(response => {
            console.log(response);
            if (response.status === 200) {

                setToLogin(true); // redirect
            }
        }).catch(error => {
            console.log(error.response);
            if (error.response && error.response.status === 422) {
                
                setAuthError(true);
                setErrorMsg(error.response.data.message);

                if (error.response.data.errors.name) {
                    setNameErrorMsg(error.response.data.errors.name[0]);
                }  

                if (error.response.data.errors.email) {
                    setEmailErrorMsg(error.response.data.errors.email[0]);
                }       

                if (error.response.data.errors.password) {
                    setPasswordErrorMsg(error.response.data.errors.password[0]);
                }    

            } else {
                setUnknownError(true);
                console.error(error);
            }
        });
      
    }

    if (toLogin === true) {
        return <Redirect to='/login' />
    }

    if (toRegister === true) {
        return <Redirect to='/register' />
    }
    
    return (
        <div className="row">
            <div className="col-4">
                <img className="img-fluid rounded" src="/img/login.jpg" alt="" />
            </div>
            
            <div className="col-8">
            
            <div className="card"  >

                <div className="card-body">
                {authError ? <div className="alert alert-danger"> { errorMsg ? errorMsg : 'Error while submitting' }</div> : null}
                <h3>  <i className="fa fa-cog"></i> Register</h3>
                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
           
                        
                        <form onSubmit={handleSubmit}>


                        <div className="input-group mb-3">
                            
                            <span className="input-group-text" id="inputGroup-sizing-default"><i className="fa fa-user"></i></span>
                            <input
                                type="name"
                                name="name"
                                className={"form-control" + ( nameErrorMsg  ? ' is-invalid' : '')}
                                placeholder="Your fullname"
                                value={name}
                                onChange={e => setName(e.target.value)}
                               
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                            />
                            {nameErrorMsg ? <span className="invalid-feedback" ><strong>{nameErrorMsg}</strong></span> : null }  
                            </div>


                            <div className="input-group mb-3">
                            
                                    <span className="input-group-text" id="inputGroup-sizing-default"><i className="fa fa-envelope"></i></span>
                                    <input
                                        type="email"
                                        name="email"
                                        className={"form-control" + (emailErrorMsg ? ' is-invalid' : '')}
                                        placeholder="Your E-mail"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                       
                                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                    />
                                    {emailErrorMsg ? <span className="invalid-feedback" ><strong>{emailErrorMsg}</strong></span> : null }  
                            </div>


                            <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default"><i className="fa fa-lock"></i></span>
                                <input
                                    type="password"
                                    name="password"
                                    className={"form-control" + (passwordErrorMsg  ? ' is-invalid' : '')}
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    
                                />
                            </div>

                            
                            <div className="input-group mb-3">
                            <span className="input-group-text " id="inputGroup-sizing-default"><i className="fa fa-lock"></i></span>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    className={"form-control" + (passwordErrorMsg  ? ' is-invalid' : '')}
                                    placeholder="Confirm your password"
                                    value={passwordConfirmation}
                                    onChange={e => setPasswordConfirmation(e.target.value)}
                                   
                                />
                                 {passwordErrorMsg ? <span className="invalid-feedback" ><strong>{passwordErrorMsg}</strong></span> : null } 
                            </div>
                        
                            <button type="submit" className="btn btn-primary">Register</button>
                      
                        </form>

                </div>
            </div>
            </div>
        </div>
    );
};

export default Register;