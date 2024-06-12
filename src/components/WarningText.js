import React from 'react';

import PropTypes from 'prop-types';

const WarningText = ({ text, textType = 'info', className = '' }) => {
  const handletextType = () => {
    switch (textType) {
      case 'info':
        return 'fa-solid fa-circle-info';
      case 'warning':
        return 'fa-solid fa-triangle-exclamation text-yellow';
      case 'success':
        return 'fa-regular fa-circle-check text-green';
      case 'error':
      default:
        return 'fa-solid fa-circle-xmark text-red';
    }
  };

  return (
    <div className={`flex items-center gap-x-2 ${className}`}>
      <i className={`${handletextType()}`}></i>
      <p>{text}</p>
    </div>
  );
};

WarningText.propTypes = {
  textType: PropTypes.oneOf(['info', 'error', 'success']),
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};
export default WarningText;
