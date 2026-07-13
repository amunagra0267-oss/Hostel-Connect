import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [token, setToken] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("studentUser");
    const savedToken = localStorage.getItem("studentToken");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }

    setLoading(false);
  }, []);

  const login = useCallback((email, password, rememberMe) => {
    // Allow any email that ends with the university domain
    const domain = "@geetauniversity.edu.in";
    if (typeof email === "string" && email.trim().toLowerCase().endsWith(domain)) {
      const localPart = email.split("@")[0] || "student";
      const student = {
        id: `ST_${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
        name: localPart.charAt(0).toUpperCase() + localPart.slice(1),
        email: email,
        hostel: "Girls Hostel A",
        block: "A",
        room: "A-204",
        phone: "9876543210",
      };

      // generate a random password (for record/testing) and token
      const generatedPassword = Math.random().toString(36).slice(-10);
      const fakeToken = `jwt_${Math.random().toString(36).slice(2)}`;

      setUser(student);
      setToken(fakeToken);

      if (rememberMe) {
        localStorage.setItem("studentUser", JSON.stringify(student));
        localStorage.setItem("studentToken", fakeToken);
        // store generated password for convenience (dev/testing only)
        localStorage.setItem("studentPassword", generatedPassword);
      }

      return {
        success: true,
        generatedPassword,
      };
    }

    return {
      success: false,
      message: "Invalid Email or Password",
    };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken("");

    localStorage.removeItem("studentUser");
    localStorage.removeItem("studentToken");
  }, []);

  const isAuthenticated = useMemo(() => {
    return !!token;
  }, [token]);

  const value = useMemo(() => {
    return {
      user,
      token,
      loading,
      login,
      logout,
      isAuthenticated,
    };
  }, [
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};