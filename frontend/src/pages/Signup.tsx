import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import LoginPicture from "@/assets/LoginPage.png";

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
          />
        </div>

        <div className="group">
          <label
            htmlFor="email"
            className="text-white text-base font-bold mr-2 mb-2 block"
          >
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

        <div className="group">
          <label
            htmlFor="name"
            className="text-white text-base font-bold mr-2 mb-2 block"
          >
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

        <div className="group">
          <label
            htmlFor="username"
            className="text-white text-base font-bold mr-2 mb-2 block"
          >
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
          />
        </div>

        <div className="group">
          <label
            htmlFor="username"
            className="text-white text-base font-bold mr-2 mb-2 block"
          >
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
          className="w-full bg-custard text-black font-bold py-3.5 rounded-full mt-4 active:scale-95 transition-transform"
        >
          ثبت‌نام
        </button>
      </form>

      <div className="flex flex-row mx-auto gap-2 mt-6 text-center">
        <p className="text-white text-sm">حسابی دارید؟</p>
        <Link className="text-blue-500 font-semibold text-sm" to="/login">
          وارد شوید
        </Link>
      </div>
    </div>
  );
};

export default Login;
