import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import DropdownBar from './DropdownBar';
import DropdownList from './DropdownList';

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    className = '',
    dropdownBarClassName = '',
    dropdownListClassName = '',
    itemClassName = '',
    items = null,
    dropdownBarLeftIcon = <span />,
    dropdownBarText = 'Dropdown Bar Text',
  } = props;
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`w-full relative ${className}`}>
      <DropdownBar
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        isOpen={isOpen}
        className={dropdownBarClassName}
        leftIcon={dropdownBarLeftIcon}
        text={dropdownBarText}
      />
      <DropdownList
        className={`${dropdownListClassName} ${isOpen ? 'block' : 'hidden'}`}
        items={items}
        itemClassName={itemClassName}
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

Dropdown.propTypes = {
  className: PropTypes.string,
  dropdownBarClassName: PropTypes.string,
  dropdownListClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  items: PropTypes.array,
  dropdownBarLeftIcon: PropTypes.element,
  dropdownBarText: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.node,
  ]),
};

export default Dropdown;
