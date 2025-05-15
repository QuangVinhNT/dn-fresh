import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // gửi cookie đi cùng request
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor xử lý lỗi hoặc gắn token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
  },
  (err) => Promise.reject(err)
)

// Interceptor xử lý response
axiosInstance.interceptors.response.use(
  (response) => {
    // console.log(response.data)
    return response
  },
  (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      window.location.href = '/login';
    }
    return Promise.reject(error)
  }
)

export default axiosInstance;
