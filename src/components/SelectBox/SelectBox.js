import React, { useEffect, useRef, useState } from 'react';

import Header from 'components/Header';
import PropTypes from 'prop-types';

import SelectBar from './SelectBar';
import SelectList from './SelectList';

const SelectBox = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectBar, setSelectBar] = useState(props.selectBar);

  const {
    className = '',
    headerClassName = '',
    selectBarClassName = '',
    selectListClassName = '',
    id = '',
    label = '',
    labelElement = null,
    errors = '',
    required = false,
    items = null,
    value = {},
    onChange = () => {},
    labelClassName = '',
  } = props;

  useEffect(() => {
    if (Object.keys(value).length === 0) {
      setSelectBar({
        leftIcon: props.selectBar?.leftIcon,
        text: props.selectBar?.text,
      });
    } else {
      setSelectBar({
        leftIcon: value.leftIcon ? value.leftIcon : <span />,
        text: value.label,
      });
    }
  }, [value]);

  const selectWrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!selectWrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectWrapperRef} className={`w-full relative ${className}`}>
      <Header
        className={headerClassName}
        id={id}
        label={label}
        labelElement={labelElement}
        errors={errors}
        required={required}
        labelClassName={labelClassName}
      />
      <SelectBar
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        isOpen={isOpen}
        className={selectBarClassName}
        leftIcon={selectBar?.leftIcon ?? null}
        text={selectBar?.text}
        isError={!!errors}
      />
      <SelectList
        className={`${selectListClassName} ${isOpen ? 'block' : 'hidden'}`}
        items={items}
        selectedItem={value}
        onClick={(item) => {
          onChange(item);
          setIsOpen(!isOpen);
        }}
      />
    </div>
  );
};

SelectBox.propTypes = {
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  selectListClassName: PropTypes.string,
  selectBarClassName: PropTypes.string,
  labelElement: PropTypes.any,
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  errors: PropTypes.string,
  selectBar: PropTypes.shape({
    leftIcon: PropTypes.element,
    text: PropTypes.any,
    rightIcon: PropTypes.element,
  }),
  items: PropTypes.array,
  value: PropTypes.object,
  onChange: PropTypes.func,
  labelClassName: PropTypes.string,
};

export default SelectBox;
