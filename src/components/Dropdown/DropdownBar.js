import React from 'react';

import PropTypes from 'prop-types';

const DropdownBar = (props) => {
  const {
    className = '',
    leftIcon = null,
    text = '',
    isOpen = false,
    onClick = () => {},
  } = props;
  return (
    <div
      className={`flex justify-between items-center cursor-pointer h-20 max-h-20 py-3 px-4 w-full text-small border rounded border-default-border ${className}`}
      onClick={onClick}
    >
      {leftIcon ? leftIcon : null}
      {text ? text : null}
      <i
        className={`fa-solid fa-chevron-down ${
          isOpen
            ? 'transition-all rotate-180 duration-700'
            : 'transition-all rotate-0 duration-700'
        }`}
      ></i>
    </div>
  );
};

DropdownBar.propTypes = {
  className: PropTypes.string,
  leftIcon: PropTypes.element,
  text: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.node,
  ]),
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
};

export default DropdownBar;
