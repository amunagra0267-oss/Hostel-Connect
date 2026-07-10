import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => setUser(null);

  return (
    <div className="min-h-screen bg-[#09090b] text-gray-100 font-sans antialiased">
      {!user ? (
        <Login onLoginSuccess={setUser} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}