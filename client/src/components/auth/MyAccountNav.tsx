import React from "react";
import { useAuthUI, Logout, accountNav, Button } from "../../constants/Imports";
import { Link } from "react-router-dom";

const MyAccountNav: React.FC = () => {
  const { currentUser, accountTab, setAccountTab } = useAuthUI();
  return (
    <nav
      className={`fixed flxColStart top-0 right-0 md:w-[40rem] bg-white w-full h-[50vh] z-30 ${
        !accountTab && "translate-x-full pointer-events-none"
      } transition-transform duration 500`}
    >
      <h1 className=" py-2 flxBtw pl-5 border-b-[1px] w-full">
        <span className="">My Account</span>
        <button
          onClick={() => {
            setAccountTab(false);
          }}
          className="absolute right-5"
        >
          X
        </button>
      </h1>
      <div className="flxColStart pl-5">
        <h1 className="flxRowStart items-center py-6 gap-2">
          <span className="font-[530] text-sm">
            Welcome, {currentUser?.username}
          </span>
          <Logout />
        </h1>
        <ul className="flxColStart gap-3">
          {accountNav.map((nav) => (
            <li
              onClick={() => {
                setAccountTab(false);
              }}
              className="text-sm"
              key={nav.name}
            >
              <Link to={`/my-account/${nav.tab}`}>{nav.name}</Link>
            </li>
          ))}
        </ul>
        {currentUser.isAdmin && (
          <Link to={"/admin-dashboard"}>
            <Button
              click={() => {
                setAccountTab(false);
              }}
              name="Admin Dashboard"
              styles="text-white mt-9"
            />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default MyAccountNav;
