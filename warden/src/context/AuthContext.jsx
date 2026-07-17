import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

// Demo credential store. Swap this out for a real API call later —
// see the `login` function below for where the request would go.
const DEMO_WARDEN = {
  email: 'warden@geetauniversity.edu',
  password: 'warden123',
  name: 'Ramesh Verma',
  role: 'Hostel Warden',
  hostel: 'Boys Hostel - Block C',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('warden_user')
    if (stored) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  async function login(email, password) {
    // Replace this block with: const res = await fetch('/api/warden/login', {...})
    await new Promise((r) => setTimeout(r, 500))
    if (email.trim().toLowerCase() !== DEMO_WARDEN.email || password !== DEMO_WARDEN.password) {
      throw new Error('Invalid email or password')
    }
    const sessionUser = {
      name: DEMO_WARDEN.name,
      email: DEMO_WARDEN.email,
      role: DEMO_WARDEN.role,
      hostel: DEMO_WARDEN.hostel,
    }
    localStorage.setItem('warden_user', JSON.stringify(sessionUser))
    setUser(sessionUser)
    return sessionUser
  }

  function updateProfile(updates) {
    setUser((prev) => {
      const next = { ...(prev || {}), ...updates }
      localStorage.setItem('warden_user', JSON.stringify(next))
      return next
    })
  }

  function logout() {
    localStorage.removeItem('warden_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
