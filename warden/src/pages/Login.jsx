import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import hostelImage from "../assets/Hostel.jpeg";


export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) {
    const from = location.state?.from?.pathname || '/dashboard'
    return <Navigate to={from} replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-screen">
      <div
        className="login-visual"
        style={{
           backgroundImage: `url(${hostelImage})`,
        }}
      >
        <div className="visual-copy">
          <div className="eyebrow">Warden Control Center</div>
          <h1>Run the hostel from one place.</h1>
          <p>
            Review complaints, approve leave and visitor passes, track attendance and
            keep every resident informed — all from a single portal built for
            Geeta University's wardens.
          </p>
        </div>
      </div>

      <div className="login-form-side">
        <div className="login-box">
          <div className="brand-name">HostelConnect</div>
          <div className="brand-sub">Geeta University</div>
          <h2>Warden Sign In</h2>
          <p className="lead">Enter your credentials to access the warden portal.</p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="warden@geetauniversity.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <div className="field-error">{error}</div>}
            </div>
            <button className="login-submit" type="submit" disabled={submitting}>
              {submitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="login-foot">
            <a href="#">Forgot password?</a>
          </div>
          <div className="login-foot" style={{ marginTop: 22, fontSize: '0.72rem' }}>
            Demo: warden@geetauniversity.edu / warden123
          </div>
        </div>
      </div>
    </div>
  )
}
