import React from 'react';

import PropTypes from 'prop-types';

const Collapse = (props) => {
  const { className = '', children = null } = props;

  return <div className={`flex flex-col w-full ${className}`}>{children}</div>;
};

Collapse.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default Collapse;
