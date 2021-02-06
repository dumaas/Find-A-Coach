import axios from 'axios';

let axiosConfig = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Content-Type': 'application/json',
    // common: {
    //   'Authorization': 'authToken',
    // },
  }
})

export default axiosConfig;
