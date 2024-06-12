import React from 'react';

import { Text } from 'components/Text';
import PropTypes from 'prop-types';

const Toggle = ({
  value,
  checkedLabel = '',
  notCheckedLabel,
  onClick = () => {},
  className,
}) => {
  return (
    <label
      aria-hidden
      onChange={onClick}
      className={`${className} inline-flex relative items-center cursor-pointer`}
    >
      <input
        type="checkbox"
        value={value}
        checked={value}
        id="checked-toggle"
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-sky rounded-full  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-primary"></div>
      <Text weight="semibold" className="ml-3">
        {value ? checkedLabel : notCheckedLabel}
      </Text>
    </label>
  );
};

Toggle.propTypes = {
  value: PropTypes.bool,
  checkedLabel: PropTypes.string,
  notCheckedLabel: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Toggle;
