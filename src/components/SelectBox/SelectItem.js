import React from 'react';

import PropTypes from 'prop-types';

const SelectItem = (props) => {
  const {
    item = {
      value: -1,
      leftIcon: <span />,
      label: 'Select Item',
      rightIcon: <span />,
    },
    className = '',
    isSelected = false,
    onClick = () => {},
    isLastItem = 0,
  } = props;
  return (
    <li
      className={`flex items-center justify-between align-center px-4 py-3 max-h-10 ${
        isLastItem === false ? 'border-b border-sky' : null
      } hover:bg-sky-light cursor-pointer w-full ${
        isSelected ? `bg-primary-lighter rounded` : ``
      } ${className}`}
      onClick={() => onClick(item)}
    >
      {item.leftIcon ? item.leftIcon : <span />}
      {item.label}
      {isSelected ? (
        <i className="fa-solid fa-check" />
      ) : item.rightIcon ? (
        item.rightIcon
      ) : (
        <span />
      )}
    </li>
  );
};

SelectItem.propTypes = {
  item: PropTypes.shape({
    value: PropTypes.number.isRequired,
    leftIcon: PropTypes.any,
    label: PropTypes.any.isRequired,
    rightIcon: PropTypes.any,
  }),
  className: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  isLastItem: PropTypes.any,
};

export default SelectItem;
