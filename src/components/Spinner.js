import React from 'react';

import PropTypes from 'prop-types';

const Spinner = ({
  spinnerClassname = '',
  className = '',
  isPending = false,
}) => {
  return (
    <div className={`${isPending ? 'block' : 'hidden'}`}>
      <div
        className={`flex z-50 justify-center align-center p-auto fixed left-1/2 top-1/2 max-h-10 w-fit h-auto bg-transparent ${className}`}
      >
        <i
          className={`animate-spin z-50 fa-solid fa-spinner fixed bg-transparent ${spinnerClassname}`}
        />
      </div>
      <div
        className={` bg-sky-lighter z-40 dd-overlay opacity-50 w-full h-full fixed top-0 left-0  backdrop-blur-md backdrop-contrast-125`}
      ></div>
    </div>
  );
};

Spinner.propTypes = {
  spinnerClassname: PropTypes.string,
  className: PropTypes.string,
  isPending: PropTypes.bool,
};

export default Spinner;
