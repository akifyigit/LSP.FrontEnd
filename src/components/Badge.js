import React from 'react';

import PropTypes from 'prop-types';

const Badge = (props) => {
  const { className, leftIcon, rightIcon, text } = props;
  return (
    <span
      className={`flex w-fit justify-start items-center gap-x-2 p-1 rounded-full ${className}`}
    >
      {leftIcon}
      {text}
      {rightIcon}
    </span>
  );
};

Badge.propTypes = {
  className: PropTypes.string,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  text: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

export default Badge;
