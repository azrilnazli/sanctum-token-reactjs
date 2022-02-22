import axios from 'axios';

// axios create
const apiClient = axios.create({

    baseURL: 'http://localhost:8000',
    //baseURL: 'http://api.test',
    withCredentials: true, // laravel condif/cors.php set to true

});


// intercept every request
apiClient.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token'); // get the token set by login()
        config.headers.Authorization =  `Bearer ${token}`; // set the header according to Sanctum format
        return config; // return back config()
    },
    (error) => {
      return Promise.reject(error);
    }
  )

  
export default apiClient;