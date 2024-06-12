import React from 'react';

import Header from 'components/Header';
import PropTypes from 'prop-types';

const RadioCheck = (props) => {
  const {
    className = '',
    headerClassName = '',
    checkRowClassName = '',
    id = '',
    name = '',
    value = '',
    type = '',
    checked = false,
    label = '',
    labelPlacement = 'right',
    headerLabel = '',
    headerLabelElement = null,
    errors = '',
    required = false,
    onChange = () => {},
    disabled = false,
  } = props;
  return (
    <div className={`w-full ${className}`}>
      <Header
        className={headerClassName}
        id={id}
        label={headerLabel}
        labelElement={headerLabelElement}
        errors={errors}
        required={required}
      />
      <div
        className={`flex justify-start items-center space-x-2 ${checkRowClassName} ${
          disabled ? 'cursor-not-allowed opacity-60' : ''
        }`}
      >
        {labelPlacement === 'left' ? (
          <label
            className={`${
              disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
            }`}
            htmlFor={id}
          >
            {label}
          </label>
        ) : null}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className={`${
            disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
          }`}
          disabled={disabled}
        />
        {labelPlacement === 'right' ? (
          <label
            className={`${
              disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
            }`}
            htmlFor={id}
          >
            {label}
          </label>
        ) : null}
      </div>
    </div>
  );
};

RadioCheck.propTypes = {
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  checkRowClassName: PropTypes.string,
  headerLabel: PropTypes.string,
  headerLabelElement: PropTypes.any,
  errors: PropTypes.string,
  required: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  checked: PropTypes.bool,
  labelPlacement: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
  ]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default RadioCheck;
