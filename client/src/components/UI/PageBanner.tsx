import React from "react";
import { props } from "../../Context/GlobalContext";

interface bannerProps extends props {
  heading: string;
}

const PageBanner: React.FC<bannerProps> = ({ heading, children }) => {
  return (
    <div className="h-[50vh] w-full flxColCenter justify-center gap-10 text-white text-center primaryBg rounded-b-[8rem] header-margin">
      <h1 className="text-6xl font-extrabold">{heading}</h1>
      {children}
    </div>
  );
};

export default PageBanner;
