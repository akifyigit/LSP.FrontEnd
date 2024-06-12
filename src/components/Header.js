import React from 'react';

import { Tiny } from 'components';
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
      <Tiny className={labelClassName} weight="semibold">
        {/* label area */}
        {labelElement || (
          <label htmlFor={id}>
            {label}
            {required ? <> *</> : null}
          </label>
        )}
        {/* error area */}
      </Tiny>
      {errors ? (
        <Tiny variant="error" className="ml-2">
          {errors}
        </Tiny>
      ) : null}
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
