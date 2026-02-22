import { useState, useEffect, use } from "react";
import { useNavigate, Link } from "react-router-dom";

import authService, { api } from "@/services/auth/authService";

import LoginPicture from "@/assets/LoginPage.png";

import { HashLoader } from "react-spinners";

const Login = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await authService.login(username, password);
      navigate("/home");
    } catch (err) {
      setError("نام‌کاربری و رمزعبور را چک کنید سپس مجدد تلاش کنید!");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const login = async () => {
      await handleLogin();
    };

    login();
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isLoggedIn()) {
        navigate("/home");
      } else {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#1a1a1a",
        }}
      >
        <HashLoader size={60} color={"#ffffcb"} />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col min-h-screen bg-secondary p-8 dir-rtl"
      dir="rtl"
    >
      <div className="flex flex-col items-center mt-12 mb-12">
        <Link className="mx-auto w-2/3" to="/">
          <img src={LoginPicture} alt="Logo" className=" mb-4 object-contain" />
        </Link>
        <h1 className="text-white text-2xl font-bold tracking-tight">ادوگو</h1>
      </div>

      {error && (
        <div className="mx-auto bg-red-300 border border-red-800 px-4 py-2 rounded-2xl mb-2">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-sm mx-auto space-y-4"
      >
        <div className="group">
          <label
            htmlFor="username"
            className="text-white text-base font-bold mr-2 mb-2 block"
          >
            نام کاربری
          </label>
          <input
            type="text"
            className="w-full form-input"
            placeholder="نام کاربری"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="group">
          <label
            htmlFor="username"
            className="text-white text-base font-bold mr-2 mb-2 block"
          >
            رمز عبور
          </label>
          <input
            type="password"
            className="w-full form-input"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-custard text-black font-bold py-3.5 rounded-full mt-4 active:scale-95 transition-transform"
        >
          ورود
        </button>
      </form>

      <div className="flex flex-row mx-auto gap-2 mt-6 text-center">
        <p className="text-white text-sm">حسابی ندارید؟</p>
        <Link className="text-blue-500 font-semibold text-sm" to="/signup">
          ثبت‌نام کنید
        </Link>
      </div>
    </div>
  );
};

export default Login;
