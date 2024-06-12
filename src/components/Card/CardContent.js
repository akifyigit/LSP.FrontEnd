import React from 'react';

import PropTypes from 'prop-types';

const CardContent = (props) => {
  const { className = '', children } = props;

  return <div className={`flex py-2 ${className}`}>{children}</div>;
};

CardContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default CardContent;
