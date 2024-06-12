import React, { useState } from 'react';

import Header from 'components/Header';
import PropTypes from 'prop-types';

const Input = (props) => {
  const {
    label,
    labelElement = null,
    id,
    value,
    onChange = () => {},
    onFocus = () => {},
    onClick = () => {},
    onKeyDown = () => {},
    onRemove = null,
    removeHolder = false,
    placeholder = '',
    type = 'text',
    isTextVisible = true,
    errors = '',
    required = false,
    className = '',
    inputClassName = '',
    autoComplete = false,
    maxLength = 60,
    disabled = false,
    name = '',
    inputWrapperClassName = '',
    inlineElement = null,
    inputRef,
    asElement = false,
    eyeClassName,
    labelClassName,
    ...componentProps
  } = props;

  const [textVisible, setTextVisible] = useState(false);
  const handleTextVisible = () => {
    setTextVisible(!textVisible);
  };

  return (
    <div className={`w-full ${className}`}>
      <Header
        id={id}
        label={label}
        labelElement={labelElement}
        errors={errors}
        required={required}
        labelClassName={labelClassName}
      />
      <div
        className={`relative flex gap-x-2 items-center ${inputWrapperClassName}`}
      >
        <input
          ref={inputRef}
          type={textVisible ? 'text' : type}
          placeholder={placeholder}
          id={id}
          name={name}
          className={`max-h-10 ${
            errors ? 'border-red' : 'border-default-border'
          }  outline-none border rounded w-full text-small ${
            disabled ? 'cursor-not-allowed opacity-60' : ''
          } ${asElement ? '' : 'px-4 py-3'} ${inputClassName}`}
          value={value || ''}
          onChange={onChange}
          autoComplete={autoComplete ? 'on' : 'off'}
          disabled={disabled}
          maxLength={maxLength}
          onFocus={onFocus}
          onClick={onClick}
          onKeyDown={onKeyDown}
          required={required}
          {...componentProps}
        />
        {inlineElement}
        {onRemove && (
          <i
            className="icon-error text-red w-5"
            aria-label="Remove item"
            onClick={() => onRemove(id)}
            onKeyPress={() => onRemove(id)}
            role="button"
            tabIndex={0}
          />
        )}
        {removeHolder && <i className="w-5" aria-label="Holder item" />}
        {!isTextVisible && (
          <i
            className={`absolute right-1 cursor-pointer fa-solid fa-eye ${eyeClassName}`}
            onClick={() => handleTextVisible()}
          ></i>
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  labelElement: PropTypes.any,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onRemove: PropTypes.func,
  id: PropTypes.string,
  removeHolder: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  errors: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  autoComplete: PropTypes.bool,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  inputWrapperClassName: PropTypes.string,
  inlineElement: PropTypes.any,
  inputRef: PropTypes.any,
  asElement: PropTypes.bool,
  isTextVisible: PropTypes.bool,
  eyeClassName: PropTypes.string,
  labelClassName: PropTypes.string,
};

export default Input;
