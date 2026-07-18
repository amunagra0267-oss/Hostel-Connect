import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Field, inputClass, Button } from '../components/UI.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import hostelPic from '../assests/hostel.jpeg'

const DOMAIN = '@geetauniversity.edu.in'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [statusMessage, setStatusMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const nextErrors = {}
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    if (!trimmedEmail) {
      nextErrors.email = 'Please enter your email address.'
    } else if (!trimmedEmail.toLowerCase().endsWith(DOMAIN)) {
      nextErrors.email = `Please use your ${DOMAIN} email.`
    }

    if (!trimmedPassword) {
      nextErrors.password = 'Please enter your password.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setStatusMessage('')
    try {
      // TODO(backend): once /api/auth/login exists, this same call swaps
      // to hit it for real — nothing else on this page needs to change.
      await login(email, password)
      navigate('/')
    } catch (err) {
      setErrors((prev) => ({ ...prev, password: err.message }))
    } finally {
      setSubmitting(false)
    }
  }

  const handleForgotPassword = () => {
    navigate('/forgot-password')
  }

  return (
    <div className="min-h-screen w-full bg-ink-950">
      <div className="flex min-h-screen w-full flex-col bg-ink-900 lg:flex-row lg:justify-center lg:bg-ink-900">
        <div className="hidden md:flex md:w-[46%] md:min-h-screen md:overflow-hidden lg:w-[46%]">
          <div className="relative w-full overflow-hidden">
            <img src={hostelPic} alt="Geeta University hostel" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-500">
                A MODERN HOSTEL EXPERIENCE
              </p>
              <h1 className="max-w-sm font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                Live, Learn,
                <br />
                Belong.
              </h1>
              <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-300">
                One portal for complaints, leave, visitor passes, mess and notices — built for the residents of Geeta University.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
          <div className="w-full max-w-md rounded-2xl border border-ink-700 bg-ink-950/70 p-6 sm:p-8">
            <p className="text-center font-display text-lg font-bold text-gold-500">HostelConnect</p>
            <p className="mb-6 text-center text-xs tracking-[0.35em] text-neutral-500">GEETA UNIVERSITY</p>
            <h2 className="text-center font-display text-xl font-bold text-white">Sign in to HostelConnect</h2>
            <p className="mt-1 mb-6 text-center text-xs text-neutral-500">Enter your credentials to access your portal.</p>

            <form onSubmit={submit} noValidate>
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  className={`${inputClass} ${errors.email ? 'border-red-500/70' : ''}`}
                  placeholder={`you${DOMAIN}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: '' }))
                    }
                  }}
                />
              </Field>
              <Field label="Password" error={errors.password}>
                <input
                  type="password"
                  className={`${inputClass} ${errors.password ? 'border-red-500/70' : ''}`}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: '' }))
                    }
                  }}
                />
              </Field>
              <Button type="submit" className="mt-2 w-full" disabled={submitting}>
                {submitting ? 'Signing in…' : 'Sign In'}
              </Button>
              {statusMessage ? (
                <p className="mt-3 text-center text-sm text-emerald-400">{statusMessage}</p>
              ) : null}
              <p className="mt-4 text-center text-xs text-neutral-500">
                <button type="button" className="hover:text-gold-500" onClick={handleForgotPassword}>
                  Forgot password?
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
