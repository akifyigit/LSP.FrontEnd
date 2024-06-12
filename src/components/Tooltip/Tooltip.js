import React, { useState } from 'react';

import PropTypes from 'prop-types';

import './tooltip.css';

const Tooltip = ({
  tooltipWrapperClassName = '',
  tooltipChildrenWrapperClassName = '',
  tooltipClassname,
  textForTip,
  location = 'right',
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLocation = () => {
    switch (location) {
      case 'left':
        return 'tooltip-left';
      case 'top':
        return 'tooltip-top';
      case 'bottom':
        return 'tooltip-bottom';
      case 'right':
      default:
        return 'tooltip-right';
    }
  };

  return (
    <>
      <div className={`relative ${tooltipWrapperClassName}`}>
        <div
          className={`w-full h-full ${tooltipChildrenWrapperClassName}`}
          onMouseEnter={() => {
            setIsOpen(true);
          }}
          onMouseLeave={() => {
            setIsOpen(false);
          }}
        >
          {children}
        </div>
        <div
          className={`text-sm bg-gray-700 text-gray-100  h-8  p-1 absolute rounded bg-opacity-50 transition-shadow 
          ${isOpen ? 'tooltip-animationfadein' : 'tooltip-animationfadeout'}
          ${handleLocation()}	 
          ${tooltipClassname}
          `}
        >
          {textForTip}
        </div>
      </div>
    </>
  );
};

Tooltip.propTypes = {
  tooltipWrapperClassName: PropTypes.string,
  tooltipChildrenWrapperClassName: PropTypes.string,
  tooltipClassname: PropTypes.string,
  location: PropTypes.string,
  children: PropTypes.node,
  textForTip: PropTypes.string.isRequired,
};

export default Tooltip;
