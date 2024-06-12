import React from 'react';

import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const clientToken = localStorage.getItem('clientToken');
  if (clientToken) {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.any.isRequired,
};
