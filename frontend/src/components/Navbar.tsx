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
    active ? "text-custard" : "text-muted-foreground";

  return (
    <nav className="bg-secondary fixed bottom-0 left-0 right-0 bg-card border-t border-[#222222] z-50">
      <div className="max-w-md mx-auto px-6 pb-safe">
        <div className="flex items-center justify-around h-16">
          <Link
            to="/home"
            className={`flex flex-col items-center gap-1 ${itemClass(isActive("/home"))}`}
          >
            <HomeIcon />
            <span className="text-xs">خانه</span>
          </Link>

          <Link
            to="/subjects"
            className={`flex flex-col items-center gap-1 ${itemClass(isActive("/subjects"))}`}
          >
            <SubjectsIcon />
            <span className="text-xs">دروس</span>
          </Link>

          <Link
            to="/progress"
            className={`flex flex-col items-center gap-1 ${itemClass(isActive("/progress"))}`}
          >
            <ProgressIcon />
            <span className="text-xs">وضعیت</span>
          </Link>

          <Link
            to="/profile"
            className={`flex flex-col items-center gap-1 ${itemClass(isActive("/profile"))}`}
          >
            <ProfileIcon />
            <span className="text-xs">پروفایل</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
