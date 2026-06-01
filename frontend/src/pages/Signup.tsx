import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import LoginPicture from "../assets/LoginPage.png";

import { Register } from "@/services/api/api";

import authService from "../services/auth/authService";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await Register({
        username,
        password,
        confirm_password: confirmPassword,
        first_name: name,
        last_name: surname,
        email,
      });

      await authService.login(username, password);

      navigate("/home", { replace: true });
    } catch (err) {
      setError("مشکلی پیش آمده است. لطفا دوباره تلاش کنید!");
      console.log(err);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black"
      dir="rtl"
    >
      <div className="mx-auto max-w-7xl min-h-screen grid lg:grid-cols-2">
        {/* Branding Side */}
        <div className="hidden lg:flex flex-col justify-center px-12 border-l border-[#262626]">
          <img
            src={LoginPicture}
            alt="EduGo"
            className="w-80 mx-auto mb-8 object-contain"
          />

          <h1 className="text-5xl font-bold text-white text-center mb-4">
            ادوگو
          </h1>

          <p className="text-xl text-gray-400 text-center max-w-md mx-auto leading-relaxed">
            مسیر یادگیری خود را آغاز کنید، مرحله‌به‌مرحله پیش بروید و گواهی
            دریافت کنید.
          </p>
        </div>

        {/* Register Form */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-lg">
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
              <h2 className="text-3xl font-bold text-white mb-2">
                ایجاد حساب کاربری
              </h2>

              <p className="text-gray-400 mb-8">اطلاعات خود را وارد کنید</p>

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
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    ایمیل
                  </label>

                  <input
                    type="email"
                    className="w-full form-input"
                    placeholder="ایمیل"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm text-gray-300">
                      نام
                    </label>

                    <input
                      type="text"
                      className="w-full form-input"
                      placeholder="نام"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-gray-300">
                      نام خانوادگی
                    </label>

                    <input
                      type="text"
                      className="w-full form-input"
                      placeholder="نام خانوادگی"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                    />
                  </div>
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
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    تکرار رمز عبور
                  </label>

                  <input
                    type="password"
                    className="w-full form-input"
                    placeholder="تکرار رمز عبور"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                  ثبت‌نام
                </button>
              </form>

              <div className="text-center mt-6">
                <span className="text-gray-400">حسابی دارید؟</span>

                <Link to="/login" className="text-custard mr-2 font-semibold">
                  وارد شوید
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
