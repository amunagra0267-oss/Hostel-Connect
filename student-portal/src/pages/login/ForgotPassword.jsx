import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    if (email.trim() === "") {
      setLoading(false);
      setError("Please enter your email.");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setLoading(false);
      setError("Please enter a valid email.");
      return;
    }

    setTimeout(() => {
      setSuccess(
        "Password reset link has been sent to your email."
      );

      setLoading(false);
      setEmail("");
    }, 1200);
  };

  return (
    <div>

      <h1>Forgot Password</h1>

      <form onSubmit={handleSubmit}>

        <div>

          <label>Email</label>

          <br />

          <input
            ref={emailRef}
            type="email"
            value={email}
            placeholder="Enter Registered Email"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        <br />

        {error && (
          <p>{error}</p>
        )}

        {success && (
          <p>{success}</p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Sending..."
            : "Send Reset Link"}
        </button>

      </form>

      <br />

      <Link to="/">
        Back to Login
      </Link>

    </div>
  );
};

export default ForgotPassword;