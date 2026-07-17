import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Field, inputClass, Button } from '../components/UI.jsx'
import hostelPic from '../assests/hostel.jpeg'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      setError('Please enter your email address.')
      setMessage('')
      return
    }

    if (!/^[^\s@]+@gmail\.com$/i.test(trimmedEmail)) {
      setError('Please use a Gmail address ending with gmail.com')
      setMessage('')
      return
    }

    setError('')
    setMessage(`OTP has been sent to ${trimmedEmail}. Please check your inbox.`)
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
                ACCOUNT RECOVERY
              </p>
              <h1 className="max-w-sm font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                Reset your
                <br />
                password.
              </h1>
              <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-300">
                We will send a one-time password to your registered Gmail inbox so you can continue securely.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
          <div className="w-full max-w-md rounded-2xl border border-ink-700 bg-ink-950/70 p-6 sm:p-8">
            <p className="text-center font-display text-lg font-bold text-gold-500">HostelConnect</p>
            <p className="mb-6 text-center text-xs tracking-[0.35em] text-neutral-500">GEETA UNIVERSITY</p>
            <h2 className="text-center font-display text-xl font-bold text-white">Forgot Password</h2>
            <p className="mt-1 mb-6 text-center text-xs text-neutral-500">
              Enter your Gmail address to receive an OTP.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <Field label="Email" error={error}>
                <input
                  type="email"
                  className={`${inputClass} ${error ? 'border-red-500/70' : ''}`}
                  placeholder="you@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError('')
                  }}
                />
              </Field>

              <Button type="submit" className="mt-2 w-full">Send OTP</Button>

              {message ? (
                <p className="mt-3 text-center text-sm text-emerald-400">{message}</p>
              ) : null}

              <button
                type="button"
                onClick={() => navigate('/login')}
                className="mt-4 w-full text-center text-sm text-neutral-400 hover:text-gold-500"
              >
                Back to Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
