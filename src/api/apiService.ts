import axios from 'axios';

import ErrorEventBus from 'src/utils/eventBus';

const axiosApiInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
});

// request delay for mocked API testing purposes
const REQUEST_DELAY = +(process.env.REACT_APP_REQUEST_DELAY || 0);

// Request interceptor to set authorization token
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('access_token') || 'test';
    config.headers = {
      Authorization: `Bearer ${token}`,
    };

    if (REQUEST_DELAY) {
      return new Promise((resolve) => setTimeout(() => resolve(config), REQUEST_DELAY));
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to get error message and emit new 'responseError' event with it
// We listen to 'responseError' event in Snackbar provider to show errors in the app
axiosApiInstance.interceptors.response.use(
  (value) => value,
  (error) => {
    ErrorEventBus.emit('responseError', error.message);
    return Promise.reject(error);
  },
);

export default axiosApiInstance;
