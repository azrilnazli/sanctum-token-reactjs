import React from 'react';
import apiClient from '../services/api';
import { Redirect } from 'react-router-dom';

const Home = (props) => {

    const [user, setUser] = React.useState([]);

    // useEffect()
    React.useEffect(() => {
        apiClient.get('/api/user')
        .then(response => {
            setUser(response.data);
            //sessionStorage.setItem("name", response.data.name);

            // Put the object into storage
            localStorage.setItem('userObject', JSON.stringify(response.data));
        })
        .catch(error => console.error(error));
    
    }, [] ); // Empty array [] means this only run on first render

    return (
        <div className='container container-fluid bg-light rounded p-3'>
            <h2>User's Dashboard</h2>
            Name : {user.name}
            <br />
            Email : {user.email} 
            <br />
            Created : {user.created_at}
            <br />
        </div>
    );
};

export default Home;
