import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/" />;
  }

  // Render the protected component if the user is authenticated
  return children;
};

export default ProtectedRoute;
