import PageHeader from "@/components/PageHeader";
import Navbar from "@/components/Navbar";

import DefaultProfile from "@/assets/DefaultProfile.png";

const Profile = () => {
  return (
    <div
      className="flex flex-col min-h-screen bg-secondary p-6 text-white"
      dir="rtl"
    >
      <PageHeader heading="پروفایل" />

      <div className="flex flex-col items-center justify-center mt-16">
        <div className="relative">
          <img
            className="w-24 h-24 rounded-full object-cover border-2 border-custard/20"
            src={DefaultProfile}
            alt="Profile Picture"
          />
          <div className="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.05)] pointer-events-none"></div>
        </div>

        <h2 className="text-white mt-4 font-bold text-2xl">نام کاربر</h2>

        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-xs text-white">
          <svg
            className="visible w-3.5 h-3.5"
            fill="white"
            viewBox="0 0 320 512"
          >
            <path d="M320 144C320 223.5 255.5 288 176 288C96.47 288 32 223.5 32 144C32 64.47 96.47 0 176 0C255.5 0 320 64.47 320 144zM192 64C192 55.16 184.8 48 176 48C122.1 48 80 90.98 80 144C80 152.8 87.16 160 96 160C104.8 160 112 152.8 112 144C112 108.7 140.7 80 176 80C184.8 80 192 72.84 192 64zM144 480V317.1C154.4 319 165.1 319.1 176 319.1C186.9 319.1 197.6 319 208 317.1V480C208 497.7 193.7 512 176 512C158.3 512 144 497.7 144 480z"></path>
          </svg>
          <span>ایران</span>
        </div>
      </div>

      <div
        dir="rtl"
        className="flex justify-between items-center mt-4 bg-secondary-light rounded-2xl px-8 py-6"
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white">150</span>
            <span className="mt-2 text-sm font-medium text-gray-400 tracking-wide">
              test
            </span>
          </div>
        ))}
      </div>

      <Navbar />
    </div>
  );
};

export default Profile;
