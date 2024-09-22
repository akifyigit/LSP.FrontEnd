import React, { useEffect, useRef, useState } from 'react';

import Input from 'antd/lib/input/Input';
import PropTypes from 'prop-types';

import SelectList from './SelectList';

const SearchableSelectBox = (props) => {
  const {
    className = '',
    label = '',
    labelElement = null,
    id = '',
    inputValue = null,
    onChange = () => {},
    placeholder = '',
    type = 'text',
    inputErrors = '',
    inputWrapperClassName = '',
    inputClassName = '',
    maxLength = 60,
    isInputDisabled = false,
    inputName = '',
    inputInlineElement = null,
    items = [],
    selectListClassName = '',
    itemClassName = '',
    selectedItem = null,
    onSelect = () => {},
    isLoading = false,
    required = false,
    showDefault = false,
    autoComplete = false,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const selectWrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!selectWrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    onChange(e.target.value);
    setIsOpen(!!e.target.value.length);
  };

  const handleOnClick = (e) => {
    if (e.target.value.length || showDefault) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div ref={selectWrapperRef} className={`w-full relative ${className}`}>
      <Input
        label={label}
        labelElement={labelElement}
        placeholder={!inputValue ? ' ' : placeholder} // Allow for icon rendering
        type={type}
        errors={inputErrors}
        inputWrapperClassName={inputWrapperClassName}
        inputClassName={`flex items-center ${inputClassName}`} // Ensure input can hold icon
        maxLength={maxLength}
        required={required}
        disabled={isInputDisabled}
        name={inputName}
        inlineElement={inputInlineElement}
        id={id}
        value={inputValue}
        onClick={handleOnClick}
        onChange={handleInputChange}
        autoComplete={autoComplete}
      />
      {inputValue === '' && (
        <span className="absolute left-2 top-2">{placeholder}</span>
      )}
      <SelectList
        className={`${isOpen ? 'block' : 'hidden'} ${selectListClassName}`}
        itemClassName={itemClassName}
        items={items}
        selectedItem={selectedItem}
        onClick={(item) => {
          setIsOpen(!isOpen);
          onSelect(item);
        }}
        isLoading={isLoading}
      />
    </div>
  );
};

SearchableSelectBox.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  inputValue: PropTypes.any.isRequired,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  items: PropTypes.array,
  selectListClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  selectedItem: PropTypes.object,
  isLoading: PropTypes.bool,
  labelElement: PropTypes.any,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  inputErrors: PropTypes.string,
  inputHeaderWrapperClassName: PropTypes.string,
  inputWrapperClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  maxLength: PropTypes.number,
  isInputDisabled: PropTypes.bool,
  required: PropTypes.bool,
  inputName: PropTypes.string,
  inputInlineElement: PropTypes.any,
  showDefault: PropTypes.bool,
  autoComplete: PropTypes.bool,
};

export default SearchableSelectBox;
