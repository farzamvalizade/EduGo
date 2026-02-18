import Logo from "@/assets/Logo.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center p-6">
      <img src={Logo} alt="Logo" className="mx-auto mb-8 object-contain" />

      <div className="flex flex-col text-white text-center">
        <h1 className="font-bold text-5xl mb-4">ادوگو</h1>
        <p className="text-2xl opacity-90">یک پله بالاتر در یادگیری.</p>
      </div>

      <div className="flex flex-row items-center gap-4 mt-12 w-full">
        <Link
          className="bg-custard p-4 rounded-full flex items-center justify-center"
          to="/subjects"
          aria-label="موضوعات"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 640 640"
          >
            <path
              fill="currentColor"
              d="M448 128c106 0 192 86 192 192s-86 192-192 192H192C86 512 0 426 0 320s86-192 192-192zM192 240c-13.3 0-24 10.7-24 24v32h-32c-13.3 0-24 10.7-24 24s10.7 24 24 24h32v32c0 13.3 10.7 24 24 24s24-10.7 24-24v-32h32c13.3 0 24-10.7 24-24s-10.7-24-24-24h-32v-32c0-13.3-10.7-24-24-24m240 96c-17.7 0-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32s-14.3-32-32-32m64-96c-17.7 0-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32s-14.3-32-32-32"
            />
          </svg>
        </Link>

        <Link
          className="bg-custard p-4 rounded-full flex items-center justify-center"
          to="/progress"
          aria-label="پیشرفت"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
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
        </Link>

        <Link
          className="flex-1 bg-custard p-4 rounded-full font-bold text-center text-lg shadow-lg active:scale-95 transition-transform"
          to="/login"
        >
          شروع کنید
        </Link>
      </div>
    </div>
  );
};

export default Home;
