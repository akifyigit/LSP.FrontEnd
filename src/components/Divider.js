import React from 'react';

import PropTypes from 'prop-types';

const Divider = (props) => {
  const {
    orientation = 'horizontal',
    text = '',
    align = 'center',
    className = '',
  } = props;
  return (
    <>
      {orientation === 'horizontal' ? (
        <div className={`relative flex py-5 items-center ${className}`}>
          <div
            className={`flex-grow border-t border-default-border ${
              align === 'left' ? 'w-1/6' : align === 'right' ? 'w-4/6' : ''
            }`}
          ></div>
          <span className="flex-shrink mx-4 text-gray-400">{text}</span>
          <div
            className={`flex-grow border-t border-default-border ${
              align === 'left' ? 'w-4/6' : align === 'right' ? 'w-1/6' : ''
            }`}
          ></div>
        </div>
      ) : (
        <div
          className={`relative flex flex-col justify-around py-5 items-center h-full ${className} `}
        >
          <div className="border-r border-default-border h-1/3"></div>
          <span className="flex-shrink mx-4 text-gray-400">{text}</span>
          <div className="border-r border-default-border h-1/3"></div>
        </div>
      )}
    </>
  );
};

Divider.propTypes = {
  orientation: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  align: PropTypes.string,
};

export default Divider;
