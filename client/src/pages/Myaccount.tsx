import React from "react";
import { useParams } from "react-router";
import {
  Logout,
  MyAccountDetails,
  accountNav,
  useAuthUI,
} from "../constants/Imports";
import { Link } from "react-router-dom";

const Myaccount: React.FC = () => {
  const { currentUser } = useAuthUI();
  const { tab } = useParams();
  return (
    <div className="flxBtw px-3 pt-8 header-margin">
      <section className="flxColStart px-5 border-[1px] rounded-lg border-black/30">
        <h1 className="flxColStart py-6 gap-2">
          <span className="font-[530] text-sm">
            Welcome, {currentUser?.username}
          </span>
          <Logout />
        </h1>
        <ul className="flxColStart gap-3">
          {accountNav.map((nav) => (
            <li
              className={`text-sm pr-2 ${
                tab === nav.tab && "border-r-2 highlightBorderCol"
              }`}
              key={nav.name}
            >
              <Link to={`/my-account/${nav.tab}`}>{nav.name}</Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="w-[80%] border-[1px] rounded-lg border-black/30 px-4 pb-5">
        {tab === "my-profile" && (
          <div>
            <h1 className="text-sm items-center py-6 gap-2">
              My profile details
            </h1>
            <MyAccountDetails />
          </div>
        )}
      </section>
    </div>
  );
};

export default Myaccount;
