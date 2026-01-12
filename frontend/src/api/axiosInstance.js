import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true
});

//Request interceptor -> add token automatically
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
        
    },

    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;

