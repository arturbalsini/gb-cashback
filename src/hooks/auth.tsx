import React, { createContext, useCallback, useState, useContext } from "react";

import axios from "axios";

interface SignInCredencials {
  email: string;
  password: string;
}

interface AuthState {
  user: User;
}

interface User {
  id: number;
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credencials: SignInCredencials): Promise<void>;
  signOut(): void;
  confirmLogon(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem("@CashBack:user");

    if (user) {
      return { user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await axios.post<User>("/api/auth", {
      email,
      password,
    });

    const user = response.data;

    user.password = "";
    localStorage.setItem("@CashBack:user", JSON.stringify(user));

    setData({
      user,
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@CashBack:user");

    setData({} as AuthState);
  }, []);

  const confirmLogon = useCallback(() => {
    const user = localStorage.getItem("@CashBack:user");

    if (!user) {
      setData({} as AuthState);
    }

    return true;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, confirmLogon }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
