import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem("hc_admin_user")
    return saved ? JSON.parse(saved) : null
  })

  const login = (email) => {
    const admin = {
      name: "Anita Desai",
      role: "Hostel Administrator",
      org: "Geeta University",
      email,
    }
    sessionStorage.setItem("hc_admin_user", JSON.stringify(admin))
    setUser(admin)
  }

  const logout = () => {
    sessionStorage.removeItem("hc_admin_user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
