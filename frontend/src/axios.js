import axios from 'axios';

let axiosConfig = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
    // common: {
    //   'Authorization': 'authToken',
    // },
  }
})

export default axiosConfig;
