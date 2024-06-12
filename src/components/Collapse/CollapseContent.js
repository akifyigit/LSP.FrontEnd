import React from 'react';

import PropTypes from 'prop-types';

const CollapseContent = (props) => {
  const { className = '', children = null } = props;
  return <div className={`flex p-3 w-full ${className}`}>{children}</div>;
};

CollapseContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default CollapseContent;
