import React from 'react';

import PropTypes from 'prop-types';

import DropdownItem from './DropdownItem';

const DropdownList = (props) => {
  const {
    items = [],
    className = '',
    itemClassName = '',
    onClick = () => {},
  } = props;
  return (
    <ul
      className={`absolute bg-white p-2 mt-2 border rounded border-sky max-h-40 overflow-y-auto w-full ${className}`}
    >
      {items.map((item, index) => (
        <DropdownItem
          key={index}
          className={itemClassName}
          leftIcon={item.leftIcon}
          label={item.label}
          onClick={() => {
            onClick();
            item.onClick();
          }}
        />
      ))}
    </ul>
  );
};

DropdownList.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  onClick: PropTypes.func,
};

export default DropdownList;
