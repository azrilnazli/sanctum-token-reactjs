import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Movies = (props) => {
    const [books, setBooks] = React.useState([]); // empty array

    React.useEffect( () => { // array function
        axios.get('http://sanctum.test/api/book')
        .then( response => {
            setBooks(response.data)
        })
        .catch( error => console.error(error) );
    }, [] );

    const bookList = books.map( (book) => 
        <li key={book.id}>{book.title}</li>
    );
    return ( 
        <div className='container container-fluid bg-light rounded p-3'>
            <ul>{bookList}</ul>
        </div>
    );
}
export default Movies