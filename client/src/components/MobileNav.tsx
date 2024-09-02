import React from "react";
import { navItems } from "../constants";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuthUI } from "../constants/Imports";

interface MobileNavProps {
  isOpen: Boolean;
  click: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, click }) => {
  const { setAccountTab, currentUser, setAuthTab } = useAuthUI();
  const location = useLocation();
  const currentLocation = location.pathname;
  return (
    <ul
      onClick={click}
      className={`mobile-nav border-[1px] z-10 bg-white flxColStart lg:hidden fixed left-1/2 -translate-x-1/2 w-[70vw]  rounded-b-3xl transition-height duration-300 ${
        !isOpen && "h-0 border-none"
      } overflow-hidden`}
    >
      {navItems.map((nav) => (
        <li
          className={`w-full py-3 border-b-[1px] text-center flxColCenter items-center ${
            currentLocation === nav.link && "highlightTextCol"
          }`}
          key={nav.name}
        >
          <Link className="w-full" to={nav.link}>
            {nav.name}
          </Link>
        </li>
      ))}
      {currentUser.isAuthenticated ? (
        <button
          className={`w-full py-3 text-center flxColCenter items-center ${
            location.pathname.split("/").includes("my-profile") &&
            "highlightTextCol"
          } `}
          disabled={location.pathname.split("/").includes("my-profile")}
          onClick={() => {
            setAccountTab(true);
          }}
        >
          Account
        </button>
      ) : (
        <button
          className={`w-full py-3 text-center flxColCenter items-center `}
          onClick={() => {
            setAuthTab(true);
          }}
        >
          Login
        </button>
      )}
    </ul>
  );
};

export default MobileNav;
