import React from 'react';

import PropTypes from 'prop-types';

const Card = (props) => {
  const { children, className = '', onClick = () => {} } = props;

  return (
    <div
      className={`flex flex-col border rounded border-default-border w-full p-3 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Card;
