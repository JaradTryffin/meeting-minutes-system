import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    //handle errors globally
    return Promise.reject(error);
  },
);

export default apiClient;
