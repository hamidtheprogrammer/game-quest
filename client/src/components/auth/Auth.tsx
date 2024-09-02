import React from "react";
import {
  Register,
  Login,
  memberPerks,
  Button,
  useAuthUI,
} from "../../constants/Imports.tsx";

interface AuthProps {
  authMode?: string;
}

const Auth: React.FC<AuthProps> = ({ authMode }) => {
  const { setCurrentAuth, authTab, setAuthTab } = useAuthUI();
  return (
    <div
      className={`${
        !authTab && "-translate-y-full opacity-0 pointer-events-none"
      } auth-tab`}
    >
      <h1 className="w-full flxColCenter border-b-[1px] py-5">
        <span className="">
          {authMode === "login"
            ? "Login to your GamerQuest account"
            : authMode === "register" && "Create a new GamerQuest account"}
        </span>
        <button
          onClick={() => {
            setAuthTab(false);
          }}
          className="absolute right-5"
        >
          X
        </button>
      </h1>
      <div className="max-md:flxColCenter md:flxRowStart">
        <div className="flex-1">
          {authMode === "login" ? (
            <section className="flxColCenter space-y-5">
              <Login />
              <p className="font-semibold text-black/70">OR</p>
              <Button
                click={() => {
                  setCurrentAuth("register");
                }}
                name="Create account"
                styles="w-[18rem] px-0 py-3 mainTextCol bg-transparent border-[1px] highlightTextCol highlightBorderCol mx-auto"
              />
            </section>
          ) : (
            authMode === "register" && (
              <section className="flxColCenter space-y-5">
                <Register />
                <p className="font-semibold text-black/70">Already a member?</p>
                <Button
                  click={() => {
                    setCurrentAuth("login");
                  }}
                  name="Sign in"
                  styles="w-[18rem] px-0 py-3 mainTextCol bg-transparent border-[1px] highlightTextCol highlightBorderCol mx-auto"
                />
              </section>
            )
          )}
        </div>
        <aside className="flex-1 flxColStart pt-5 max-md:hidden">
          <h1 className="flxColStart">
            <span className="font-bold">Member Benefits</span>{" "}
            <span>Exclusive Perks for Members:</span>
          </h1>
          <ul className="flxColStart gap-4 mt-5">
            {memberPerks.map((perk) => (
              <li className="max-w-[20rem]" key={perk.heading}>
                <h1 className="font-[400] primaryTextCol">{perk.heading}</h1>
                <p className="text-xs">{perk.content}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Auth;
