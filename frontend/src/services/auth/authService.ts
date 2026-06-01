import axios from "axios";

const API_URL = "https://farzam1389.pythonanywhere.com/api";

const api = axios.create({
  baseURL: API_URL,
});

const getToken = () => localStorage.getItem("access_token");
const setToken = (token) => localStorage.setItem("access_token", token);
const removeToken = () => localStorage.removeItem("access_token");

const getRefreshToken = () => localStorage.getItem("refresh_token");
const setRefreshToken = (token) => localStorage.setItem("refresh_token", token);
const removeRefreshToken = () => localStorage.removeItem("refresh_token");

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();

        const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;

        setToken(access);

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        authService.logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const authService = {
  isLoggedIn: () => {
    return !!getToken();
  },

  login: async (username, password) => {
    const response = await api.post("/auth/login/", { username, password });
    if (response.data.access) {
      setToken(response.data.access);
      setRefreshToken(response.data.refresh);
    }
    return response.data;
  },

  logout: () => {
    removeToken();
    removeRefreshToken();
    window.location.href = "/login";
  },

  getCurrentUser: async () => {
    return api.get("/auth/user/");
  },
};

export { api };
export default authService;