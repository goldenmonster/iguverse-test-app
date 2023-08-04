import { useState, createContext, useContext, ReactNode, useMemo } from 'react';

type AuthContextProps = {
  email: string;
  setEmail: (email: string) => void;
  isLoggedIn: boolean;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  email: '',
  setEmail: () => {},
  isLoggedIn: false,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [email, setEmail] = useState<string>('');

  const isLoggedIn = useMemo<boolean>(() => {
    return !!email;
  }, [email]);

  return (
    <AuthContext.Provider
      value={{
        email,
        isLoggedIn,
        setEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
