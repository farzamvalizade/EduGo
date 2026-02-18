import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refresh_token");

        const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;

        Cookies.set("access_token", access, { expires: 1 });

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        authService.logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

const authService = {
  login: async (username: string, password: string) => {
    const response = await api.post("/auth/login/", { username, password });
    if (response.data.access) {
      Cookies.set("access_token", response.data.access);
      Cookies.set("refresh_token", response.data.refresh);
      console.log(response.data.refresh);
    }
    return response.data;
  },

  logout: () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    window.location.href = "/login";
  },

  getCurrentUser: async () => {
    return api.get("/auth/user/");
  },
};

export { api }; // Use this 'api' instance for all your other data fetching
export default authService;
