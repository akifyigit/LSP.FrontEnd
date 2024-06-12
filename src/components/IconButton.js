import React from 'react';

import PropTypes from 'prop-types';

const IconButton = (props) => {
  const { className = '', icon, onClick, type = 'button' } = props;
  return (
    <button className={`${className}`} onClick={onClick} type={type}>
      {icon}
    </button>
  );
};

IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default IconButton;
