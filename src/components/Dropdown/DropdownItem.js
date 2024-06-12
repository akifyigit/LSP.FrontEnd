import React from 'react';

import PropTypes from 'prop-types';

const DropdownItem = (props) => {
  const {
    leftIcon = <span />,
    label = 'Dropdown Item',
    onClick = () => {},
    className = '',
  } = props;
  return (
    <li
      className={`flex justify-between align-center px-4 py-3 max-h-10 hover:bg-sky-light cursor-pointer w-full ${className}`}
      onClick={onClick}
    >
      {leftIcon}
      {label}
      <span />
    </li>
  );
};

DropdownItem.propTypes = {
  leftIcon: PropTypes.any,
  label: PropTypes.any,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default DropdownItem;
