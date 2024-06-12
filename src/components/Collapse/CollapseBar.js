import React from 'react';

import PropTypes from 'prop-types';

const CollapseBar = (props) => {
  const {
    className = '',
    children = null,
    isOpen = true,
    onClick = () => {},
    isIconOnClick = false,
    collapsable = false,
  } = props;
  return (
    <>
      {isIconOnClick ? (
        <div
          className={`flex justify-between p-3 border-b border-default-border w-full ${className}`}
        >
          {children}
          {collapsable && (
            <i
              onClick={onClick}
              className={`fa-solid fa-chevron-down cursor-pointer ${
                isOpen
                  ? 'transition-all rotate-180 duration-700'
                  : 'transition-all rotate-0 duration-700'
              }`}
            />
          )}
        </div>
      ) : (
        <div
          onClick={onClick}
          className={`flex justify-between p-3 border-b border-default-border w-full ${className}`}
        >
          {children}
          {collapsable && (
            <i
              className={`fa-solid fa-chevron-down ${
                isOpen
                  ? 'transition-all rotate-180 duration-700'
                  : 'transition-all rotate-0 duration-700'
              }`}
            />
          )}
        </div>
      )}
    </>
  );
};

CollapseBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
  isIconOnClick: PropTypes.bool,
  collapsable: PropTypes.bool,
};
export default CollapseBar;
