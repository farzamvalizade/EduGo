import { useState, useEffect, use } from "react";
import { useNavigate, Link } from "react-router-dom";

import authService, { api } from "@/services/auth/authService";

import LoginPicture from "../assets/LoginPage.png";

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
      className="min-h-screen bg-linear-to-b from-gray-900 via-black to-black"
      dir="rtl"
    >
      <div className="mx-auto max-w-7xl min-h-screen grid lg:grid-cols-2">
        {/* Branding Section */}
        <div className="hidden lg:flex flex-col justify-center px-12 border-l border-[#222222]">
          <img
            src={LoginPicture}
            alt="EduGo"
            className="w-72 mx-auto mb-8 object-contain"
          />

          <h1 className="text-5xl font-bold text-white mb-4 text-center">
            ادوگو
          </h1>

          <p className="text-gray-400 text-xl text-center max-w-md mx-auto leading-relaxed">
            یادگیری مرحله‌به‌مرحله، آزمون‌های تعاملی و دریافت گواهی پس از تکمیل
            دروس.
          </p>
        </div>

        {/* Login Form */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-10">
              <Link to="/">
                <img
                  src={LoginPicture}
                  alt="EduGo"
                  className="w-48 mx-auto mb-4"
                />
              </Link>

              <h1 className="text-3xl font-bold text-white">ادوگو</h1>
            </div>

            <div className="bg-[#151515] border border-[#262626] rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-white mb-2">خوش آمدید</h2>

              <p className="text-gray-400 mb-8">
                برای ادامه وارد حساب خود شوید
              </p>

              {error && (
                <div className="mb-6 rounded-2xl bg-red-500/10 border border-red-500/30 p-4">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block mb-2 text-sm text-gray-300">
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

                <div>
                  <label className="block mb-2 text-sm text-gray-300">
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
                  className="
                  w-full
                  py-4
                  rounded-2xl
                  bg-custard
                  text-black
                  font-bold
                  transition-all
                  hover:scale-[1.02]
                "
                >
                  ورود
                </button>
              </form>

              <div className="text-center mt-6">
                <span className="text-gray-400">حسابی ندارید؟</span>

                <Link to="/signup" className="text-custard mr-2 font-semibold">
                  ثبت‌نام کنید
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
