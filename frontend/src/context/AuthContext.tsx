import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
}

interface AuthContextType {
  user: User | null;

  loading: boolean;

  login: (token: string) => Promise<void>;

  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  async function verifyToken() {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);

      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/me",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();

        setUser(data);
      } else {
        localStorage.removeItem("token");

        setUser(null);
      }
    } catch {
      setUser(null);
    }

    setLoading(false);
  }

  useEffect(() => {
    verifyToken();
  }, []);

  async function login(token: string) {
    localStorage.setItem("token", token);

    await verifyToken();
  }

  function logout() {
    localStorage.removeItem("token");

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,

        loading,

        login,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be inside AuthProvider");
  }

  return context;
}
