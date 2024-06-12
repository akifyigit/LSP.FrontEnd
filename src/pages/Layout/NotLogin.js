import React from 'react';

import PropTypes from 'prop-types';

const LoginLayout = ({ children }) => {
  return (
    <div className="main-wrapper">
      <img className="main-bg" alt="" />
      <div className="main-content-login w-screen p-8 flex justify-center items-center  ">
        {children}
      </div>
    </div>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default LoginLayout;
