import { React } from 'react';

import { PropTypes } from 'prop-types';

import 'assets/styles/global.css';

const RadioButton = ({
  labelside = 'left',
  disabled,
  value,
  label,
  GroupName,
  id,
  onChange = () => {},
  ButtonClassName,
  wrapperClassname,
  inputClassname,
}) => {
  return (
    <>
      <div>
        <div className={`flex items-center mr-4 mb-4 ${wrapperClassname}`}>
          <input
            id={`${id}`}
            type="radio"
            name={`${GroupName}`}
            className={`hidden ${inputClassname}`}
            unchecked
            onChange={onChange}
            value={value}
          />
          <label
            htmlFor={`${id}`}
            className={`  transition:transform hover:scale-110 flex items-center  text-xl ${
              disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
            }`}
          >
            {labelside === 'left' ? (
              <span
                className={`hover:scale-110 w-8 h-8 inline-block mr-2 rounded-full border border-black flex-no-shrink  ${ButtonClassName}`}
              ></span>
            ) : null}
            {label}
            {labelside === 'right' ? (
              <span
                className={`hover:scale-110 w-8 h-8 inline-block ml-2 rounded-full border border-black flex-no-shrink  ${ButtonClassName}`}
              ></span>
            ) : null}
          </label>
        </div>
      </div>
    </>
  );
};
RadioButton.propTypes = {
  ButtonClassName: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
  id: PropTypes.string.isRequired,
  GroupName: PropTypes.string.isRequired,
  wrapperClassname: PropTypes.string,
  inputClassname: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  labelside: PropTypes.string,
};

export default RadioButton;
