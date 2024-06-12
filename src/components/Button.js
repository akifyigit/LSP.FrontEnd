import React from 'react';

import PropTypes from 'prop-types';

import { Text } from './Text';

const Button = (props) => {
  const {
    leftIcon = null,
    rightIcon = null,
    text,
    onClick = () => {},
    className = '',
    buttonTextClass = '',
    type = 'button',
    disabled = false,
    textVariant = 'ink',
  } = props;

  const handleOnClick = () => {
    if (!disabled) {
      onClick();
    }
    return;
  };

  return (
    <button
      className={`flex p-2 w-full items-center text-center  border rounded-md outline-none border-sky ${className} ${
        disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
      }`}
      onClick={handleOnClick}
      type={type}
    >
      {leftIcon ? <span>{leftIcon}</span> : null}
      {React.isValidElement(text) ? (
        text
      ) : (
        <Text
          className={`mx-auto ${buttonTextClass}`}
          variant={disabled ? 'sky' : textVariant}
          weight="semibold"
        >
          {text}
        </Text>
      )}
      {rightIcon ? <span>{rightIcon}</span> : null}
    </button>
  );
};

Button.propTypes = {
  leftIcon: PropTypes.any,
  rightIcon: PropTypes.any,
  text: PropTypes.string,
  className: PropTypes.string,
  buttonTextClass: PropTypes.string,
  type: PropTypes.string,
  textVariant: PropTypes.oneOf([
    'primary',
    'white',
    'sky',
    'dark',
    'light',
    'error',
    'warning',
    'ink',
    null,
  ]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
