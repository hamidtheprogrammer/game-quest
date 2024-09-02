import React, { ReactNode } from "react";
import { Footer, Header } from "./constants/Imports";

interface layoutProps {
  children: ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
