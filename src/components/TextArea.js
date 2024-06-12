import React from 'react';

import PropTypes from 'prop-types';

import Header from './Header';
import { Tiny } from './Text';

function TextArea({
  id,
  label,
  labelElement,
  errors,
  required,
  value,
  onChange,
  placeholder,
  className,
  maxLength,
  disabled = false,
  inputRef,
  name,
}) {
  return (
    <div>
      <Header
        id={id}
        label={label}
        labelElement={labelElement}
        errors={errors}
        required={required}
      />
      <textarea
        maxLength={maxLength}
        value={value}
        disabled={disabled}
        onChange={onChange}
        required={required}
        name={name}
        ref={inputRef}
        className={`w-full border border-default-border rounded px-4 py-3 h-32 outline-none  resize-none ${
          disabled ? 'cursor-not-allowed opacity-60' : ''
        } ${className}`}
        placeholder={placeholder}
        spellCheck="false"
      />
      {maxLength ? (
        <Tiny className="text-right">
          {value?.length ?? 0} / {maxLength}
        </Tiny>
      ) : null}
    </div>
  );
}

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  labelElement: PropTypes.any,
  id: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  errors: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  inputRef: PropTypes.any,
};

export default TextArea;
