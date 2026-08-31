import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext';

export default function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check current session from backend
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/auth/me', {
        credentials: 'include'
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.admin) {
          setAdmin(json.admin);
          return json.admin;
        }
      }
      setAdmin(null);
      return null;
    } catch {
      setAdmin(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Login handler
  const login = async (email, password) => {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
      throw new Error(json.message || 'Login failed. Please check your credentials.');
    }

    setAdmin(json.admin);
    return json.admin;
  };

  // Logout handler
  const logout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch {
      // Clean up local state regardless of network status
    } finally {
      setAdmin(null);
    }
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
