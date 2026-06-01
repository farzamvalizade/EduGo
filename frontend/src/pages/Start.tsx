import Logo from "@/assets/Logo.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-gray-900 via-gray-800 to-black p-6 md:p-12">
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-custard/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
      ={" "}
      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-12 md:flex-row md:justify-between md:gap-16">
        <div className="text-center md:text-right">
          <img
            src={Logo}
            alt="ادوگو"
            className="mx-auto mb-6 h-64 w-auto md:mx-0 md:h-24 rounded-2xl"
          />
          <h1 className="bg-linear-to-r from-white to-gray-300 bg-clip-text text-5xl font-extrabold text-transparent md:text-7xl lg:text-8xl mb-2">
            ادوگو
          </h1>
          <p className="mt-4 text-2xl font-light text-gray-300 md:text-3xl lg:text-4xl">
            یک پله بالاتر در یادگیری.
          </p>
          <p className="mt-6 max-w-md text-gray-400 md:text-lg">
            مسیر یادگیری خود را با موضوعات تخصصی شروع کنید و پیشرفت خود را دنبال
            کنید.
          </p>
        </div>

        <div className="w-full max-w-md space-y-5">
          <div className="flex gap-2">
            <Link
              to="/subjects"
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white/10 p-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-custard hover:text-gray-900 hover:shadow-lg hover:shadow-custard/30 focus:outline-none focus:ring-2 focus:ring-custard md:p-5 md:text-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 640 640"
                className="transition-colors group-hover:text-gray-900"
              >
                <path
                  fill="currentColor"
                  d="M448 128c106 0 192 86 192 192s-86 192-192 192H192C86 512 0 426 0 320s86-192 192-192zM192 240c-13.3 0-24 10.7-24 24v32h-32c-13.3 0-24 10.7-24 24s10.7 24 24 24h32v32c0 13.3 10.7 24 24 24s24-10.7 24-24v-32h32c13.3 0 24-10.7 24-24s-10.7-24-24-24h-32v-32c0-13.3-10.7-24-24-24m240 96c-17.7 0-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32s-14.3-32-32-32m64-96c-17.7 0-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32s-14.3-32-32-32"
                />
              </svg>
              <span>دروس</span>
            </Link>

            <Link
              to="/progress"
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white/10 p-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-custard hover:text-gray-900 hover:shadow-lg hover:shadow-custard/30 focus:outline-none focus:ring-2 focus:ring-custard md:p-5 md:text-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                className="transition-colors group-hover:text-gray-900"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 20.777a9 9 0 0 1-2.48-.969M14 3.223a9.003 9.003 0 0 1 0 17.554m-9.421-3.684a9 9 0 0 1-1.227-2.592M3.124 10.5c.16-.95.468-1.85.9-2.675l.169-.305m2.714-2.941A9 9 0 0 1 10 3.223M12 9l-2 3h4l-2 3"
                />
              </svg>
              <span>وضعیت</span>
            </Link>
          </div>

          <Link
            to="/login"
            className="block w-full rounded-2xl bg-custard px-6 py-4 text-center text-xl font-bold text-gray-900 shadow-xl transition-all hover:scale-[1.02] hover:bg-custard/90 focus:outline-none focus:ring-2 focus:ring-custard focus:ring-offset-2 focus:ring-offset-gray-900 md:py-5 md:text-2xl"
          >
            شروع کنید
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
