import React from 'react';

import PropTypes from 'prop-types';

const Header = (props) => {
  const {
    labelElement,
    id,
    label,
    required,
    errors,
    className = '',
    labelClassName = '',
  } = props;
  return (
    <div className={`flex mb-1 items-end ${className}`}>
      <div className={labelClassName}>
        {/* label area */}
        {labelElement || (
          <label htmlFor={id}>
            {label}
            {required ? <> *</> : null}
          </label>
        )}
        {/* error area */}
      </div>
      {errors ? <div className="ml-2">{errors}</div> : null}
    </div>
  );
};

export default Header;

Header.propTypes = {
  labelElement: PropTypes.any,
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  errors: PropTypes.string,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
};
