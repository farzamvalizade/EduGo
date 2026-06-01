import { Link, useLocation } from "react-router-dom";

import HomeIcon from "@/assets/icons/HomeIcon";
import SubjectsIcon from "@/assets/icons/SubjectsIcon";
import ProgressIcon from "@/assets/icons/ProgressIcon";
import ProfileIcon from "@/assets/icons/ProfileIcon";

const Navbar = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  const itemClass = (active: boolean) =>
    active ? "text-custard font-semibold" : "text-muted-foreground";

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

      {/* Mobile Navbar */}
      <nav className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <div
          className="
      flex items-center gap-1
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
            gap-1
            px-3 py-2
            rounded-xl
            transition-all duration-300
            min-w-20
            ${active ? "bg-custard text-black" : "text-gray-400"}
          `}
              >
                <Icon
                  strokeWidth={active ? 2.5 : 2}
                  strokeColor={active ? "#000" : "currentColor"}
                />

                <span className="text-[10px] font-medium">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
