import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();


  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      await login(email, password, rememberMe);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-stretch">
      {/* Left Hero Section */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/university-campus.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">HC</span>
            </div>
            <div>
              <h1 className="text-primary font-bold text-sm tracking-wide">HostelConnect</h1>
              <p className="text-surface-variant text-xs">GEETA UNIVERSITY</p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-surface-variant text-xs uppercase tracking-widest mb-4">A MODERN HOSTEL EXPERIENCE</p>
          <h2 className="text-5xl font-bold leading-tight mb-6 text-white">
            <span>Live, Learn, </span>
            <span className="text-primary">Belong</span>
            <span>.</span>
          </h2>
          <p className="text-surface-variant text-base leading-relaxed max-w-md">
            One portal for complaints, leave, visitor passes, mess and notices — built for the residents of Geeta University.
          </p>
        </div>

        <div className="relative z-10 text-surface-variant text-xs">
          © 2026 Geeta University — HostelConnect
        </div>
      </div>

      {/* Right Login Section */}
      <div className="w-full lg:w-1/2 bg-surface-container flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <p className="text-primary text-xs font-semibold tracking-widest mb-2">WELCOME BACK</p>
            <h3 className="text-3xl sm:text-4xl font-bold text-on-surface mb-3">Sign in to HostelConnect</h3>
            <p className="text-on-surface-variant text-base">Enter your credentials to access your portal.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-on-surface text-sm font-medium mb-2">Email</label>
              <input
                ref={emailRef}
                type="email"
                placeholder="you@geetauniversity.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-on-surface text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-on-surface-variant hover:text-primary transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm">
                {error}
              </div>
            )}

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-on-surface-variant cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/60 text-black font-semibold py-3 rounded-lg transition duration-200 font-label-md"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-on-surface-variant text-xs">
            Demo: student@geetauniversity.edu.in / student123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;