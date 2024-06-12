import React from 'react';

import PropTypes from 'prop-types';

const SelectBar = (props) => {
  const {
    className = '',
    leftIcon = null,
    text = '',
    isOpen = false,
    onClick = () => {},
    isError = false,
  } = props;
  return (
    <div
      className={`flex justify-between items-center cursor-pointer max-h-10 py-3 px-4 w-full text-small border rounded ${
        isError ? 'border-red' : 'border-default-border'
      }  ${className}`}
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

SelectBar.propTypes = {
  className: PropTypes.string,
  leftIcon: PropTypes.element,
  text: PropTypes.any,
  isOpen: PropTypes.bool,
  isError: PropTypes.bool,
  onClick: PropTypes.func,
};

export default SelectBar;
