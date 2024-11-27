import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children, onLogout }) => {
  const [user, setUser] = useState(null); // Store the authenticated user

  // Initialize user from sessionStorage on app load
  useEffect(() => {
    const email = sessionStorage.getItem('email');
    if (email) {
      setUser({ email }); // Set user if email exists
    }
  }, []);

  // Login function
  const login = (email) => {
    sessionStorage.setItem('email', email); // Store email in sessionStorage
    setUser({ email }); // Set user in context
  };

  // Logout function
  const logout = () => {
    sessionStorage.removeItem('email'); // Remove email from sessionStorage
    setUser(null); // Clear user in context

    // Execute any passed logout callback (e.g., navigate to main page)
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
