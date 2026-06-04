import { Link, useLocation } from "react-router-dom";

import HomeIcon from "@/assets/icons/HomeIcon";
import SubjectsIcon from "@/assets/icons/SubjectsIcon";
import ProgressIcon from "@/assets/icons/ProgressIcon";
import ProfileIcon from "@/assets/icons/ProfileIcon";
import { ContestIcon } from "@/assets/icons/ContestIcon";

const Navbar = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  const links = [
    {
      path: "/home",
      title: "خانه",
      icon: HomeIcon,
    },
    {
      path: "/subjects",
      title: "دروس",
      icon: SubjectsIcon,
    },
    {
      path: "/contest",
      title: "مسابقه",
      icon: ContestIcon,
    },
    {
      path: "/progress",
      title: "وضعیت",
      icon: ProgressIcon,
    },
    {
      path: "/profile",
      title: "پروفایل",
      icon: ProfileIcon,
    },
  ];

  return (
    <>
      <nav className="hidden lg:flex fixed top-3 left-1/2 -translate-x-1/2 z-50">
        <div
          className="
            flex items-center gap-2
            p-2
            rounded-2xl
            border border-white/10
            bg-black/60
            backdrop-blur-xl
            shadow-[0_10px_50px_rgba(0,0,0,0.5)]
          "
        >
          {links.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
            relative
            flex items-center gap-2
            px-5 py-3
            rounded-xl
            transition-all duration-300
            ${
              active
                ? "bg-custard text-black shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }
          `}
              >
                <Icon
                  strokeWidth={active ? 2.5 : 2}
                  strokeColor={active ? "#000" : "currentColor"}
                />

                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navbar - horizontally scrollable */}
      {/* Mobile Navbar - items shrunk to fit */}
      <nav className="lg:hidden w-11/12 fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <div
          className="
      flex items-center justify-between  /* or keep items-center gap-0.5 */
      gap-0.5
      p-2
      rounded-2xl
      border border-white/10
      bg-black/70
      backdrop-blur-xl
      shadow-[0_10px_50px_rgba(0,0,0,0.5)]
    "
        >
          {links.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
            flex flex-col items-center
            justify-center
            gap-0.5               /* smaller gap between icon and text */
            px-2 py-2             /* reduced horizontal padding */
            rounded-xl
            transition-all duration-300
            min-w-12              /* ~48px – adjust as needed */
            ${active ? "bg-custard text-black" : "text-gray-400"}
          `}
              >
                <Icon
                  strokeWidth={active ? 2.5 : 2}
                  strokeColor={active ? "#000" : "currentColor"}
                  className="w-5 h-5" /* optional: explicitly size icon */
                />

                <span className="text-[9px] font-medium whitespace-nowrap">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
