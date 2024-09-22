import React from 'react';

import PropTypes from 'prop-types';

import SelectItem from './SelectItem';

const SelectList = (props) => {
  const {
    items = [
      {
        value: -1,
        leftIcon: <span />,
        label: 'Select Item',
        rightIcon: <span />,
      },
    ],
    className = '',
    itemClassName = '',
    selectedItem = null,
    onClick = () => {},
    isLoading = false,
  } = props;
  return (
    <ul
      className={`absolute bg-white p-2 mt-2 border rounded border-sky max-h-40 overflow-y-auto w-full z-10 ${className}`}
    >
      {isLoading ? (
        <div className="flex justify-center align-center px-4 py-3 max-h-10">
          <i className="animate-spin fa-solid fa-spinner"></i>
        </div>
      ) : (
        items.map((item, index) => (
          <SelectItem
            key={item.value}
            className={itemClassName}
            item={item}
            isSelected={selectedItem && item.value === selectedItem.value}
            onClick={onClick}
            isLastItem={items.length === index + 1 ? true : false}
          />
        ))
      )}
    </ul>
  );
};

SelectList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      leftIcon: PropTypes.any,
      label: PropTypes.any.isRequired,
      rightIcon: PropTypes.any,
    })
  ),
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  selectedItem: PropTypes.object,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default SelectList;
