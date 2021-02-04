import axios from 'axios';

let axiosConfig = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    // common: {
    //   'Authorization': 'authToken',
    // },
    // 'Content-Type': 'application/json',
  }
})

export default axiosConfig;
