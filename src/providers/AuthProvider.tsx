import { useState, createContext, useContext, ReactNode, useMemo } from 'react';

import { User } from '../types';

type AuthContextProps = {
  user: User;
  setUser: (user: User) => void;
  isLoggedIn: boolean;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  user: {
    email: '',
    name: '',
  },
  setUser: () => {},
  isLoggedIn: false,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<{ email: string; name: string }>({
    email: '',
    name: '',
  });

  const isLoggedIn = useMemo<boolean>(() => {
    return !!user.email;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
