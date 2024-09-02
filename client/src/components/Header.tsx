import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  genreOptions,
  navItems,
  useAuthUI,
  productContext,
} from "../constants/Imports";

const Header: React.FC = () => {
  const { setAuthTab, currentUser, setAccountTab } = useAuthUI();
  const { setQuery } = productContext();
  const location = useLocation();

  return (
    <header className="primaryBg fixed w-full top-0  z-20 py-2">
      <nav className="wrapper flxColStart flxBtw items-center mainTextCol w-full overflow-hidden">
        <div className=" flxBtw items-center mainTextCol w-full">
          <Link to={"/"} className="flxBtw gap-3 items-center w-fit">
            <span>
              <img
                className="lg:w-[4.5rem] max-lg:w-[3.5rem] max-md:w-[2.8rem]"
                src="/icon.png"
                alt=""
              />
            </span>
            <span className="font-bold md:text-lg lg:text-xl  uppercase">
              GameQuest
            </span>
          </Link>
          <div className="flex items-center h-[2rem] rounded-full overflow-hidden relative w-[50%] max-md:hidden">
            <i className="fa-solid fa-magnifying-glass absolute left-[0.5rem] text-black/90"></i>
            <input
              type="text"
              placeholder="search game titles"
              className="w-full h-full pl-[2rem] text-black focus:border-none"
            />
          </div>
          <div className="flxRowStart gap-7">
            <ul className="flxRowCenter gap-7 items-center font-[400]">
              {navItems.map((nav) => (
                <li key={nav.name}>
                  <Link to={nav.link}>
                    <i className={`${nav.name} text-2xl max-sm:text-lg`}></i>
                  </Link>
                </li>
              ))}
            </ul>
            {currentUser.isAuthenticated ? (
              <button
                disabled={location.pathname.split("/").includes("my-profile")}
                onClick={() => {
                  setAccountTab(true);
                }}
              >
                <i className="fa-regular fa-user text-2xl max-sm:text-lg"></i>
              </button>
            ) : (
              <Button
                name="login"
                click={() => {
                  setAuthTab(true);
                }}
              />
            )}
          </div>
        </div>
        <div className="flex items-center h-[2rem] rounded-full overflow-hidden relative w-full md:hidden">
          <i className="fa-solid fa-magnifying-glass absolute left-[0.5rem] text-black/90"></i>
          <input
            type="text"
            placeholder="search game titles"
            className="w-full h-full pl-[2rem] text-black focus:border-none"
          />
        </div>
        <ul className="flxRowStart md:flxRowCenter gap-7 items-center font-extrabold text-sm py-2 w-full overflow-x-auto genre-nav">
          <li>
            <Link to={"/shop"}>All</Link>
          </li>
          {genreOptions.map((genre) => (
            <li
              onClick={() => {
                setQuery({
                  pageNumber: 1,
                  genre: [genre.name],
                  age: null,
                  minPrice: 0,
                  maxPrice: 1000,
                });
              }}
              key={genre.name}
            >
              <Link to={"/shop"}>{genre.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
