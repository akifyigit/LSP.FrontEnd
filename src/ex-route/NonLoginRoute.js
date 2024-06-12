import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const NonLoginRoute = ({ children }) => {
  const navigate = useNavigate();
  const clientToken = localStorage.getItem('clientToken');

  useEffect(() => {
    if (clientToken) {
      navigate('/dashboard');
    }
  }, [clientToken, navigate]);

  return <React.Fragment>{children}</React.Fragment>;
};

NonLoginRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NonLoginRoute;
