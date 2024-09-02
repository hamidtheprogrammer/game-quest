import { ReactNode, createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { authenticateToken } from "../apiClient/authApi";

export interface props {
  children: ReactNode;
}

interface CurrentUserProps {
  userId: string | null;
  username: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export interface GlobalProps {
  authTab: Boolean;
  setAuthTab: (value: boolean) => void;
  currentAuth: string;
  setCurrentAuth: (value: string) => void;
  currentUser: CurrentUserProps;
  accountTab: Boolean;
  setAccountTab: (value: boolean) => void;
}

const defaultGlobalContext: GlobalProps = {
  authTab: false,
  setAuthTab: () => {},
  currentAuth: "login",
  setCurrentAuth: () => {},
  currentUser: {
    userId: null,
    username: null,
    isAuthenticated: false,
    isAdmin: false,
  },
  accountTab: false,
  setAccountTab: () => {},
};

export const GlobalState = createContext<GlobalProps>(defaultGlobalContext);

export const GlobalContext: React.FC<props> = ({ children }) => {
  const { data, isError } = useQuery({
    queryFn: authenticateToken,
    queryKey: ["authenticate-token"],
    retry: false,
  });
  const [authTab, setAuthTab] = useState<Boolean>(false);
  const [currentAuth, setCurrentAuth] = useState<string>("login");
  const [accountTab, setAccountTab] = useState<Boolean>(false);
  const [currentUser, setCurrentUser] = useState<CurrentUserProps>({
    userId: null,
    username: null,
    isAuthenticated: false,
    isAdmin: false,
  });

  useEffect(() => {
    setCurrentUser((prevUser) => ({ ...prevUser, isAuthenticated: !isError }));
  }, [isError]);

  useEffect(() => {
    if (currentUser.isAuthenticated) {
      setCurrentUser({
        userId: data?.userId,
        username: data?.username,
        isAuthenticated: !isError,
        isAdmin: data?.isAdmin,
      });
    }
  }, [data, isError]);

  return (
    <GlobalState.Provider
      value={{
        authTab,
        setAuthTab,
        currentAuth,
        setCurrentAuth,
        currentUser,
        accountTab,
        setAccountTab,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};

export default GlobalState;
