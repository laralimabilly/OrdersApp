import axios from 'axios';
import config from './src/config';

const axiosInstance = axios.create({
  baseURL: `${config.apiBaseUrl}/`,
  timeout: 30000,
});

export default axiosInstance;
