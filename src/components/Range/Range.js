import React, { useState } from 'react';

import './Range.css';
import Badge from 'components/Badge';
import Header from 'components/Header';
import { Tiny } from 'components/Text';
import PropTypes from 'prop-types';

const RangeSlider = ({
  minimumvalue,
  maximumvalue,
  step,
  HeaderOfRange,
  className,
}) => {
  const [rangeValue, setRangeValue] = useState(
    (minimumvalue + maximumvalue) / 2
  );

  return (
    <div
      className={`bg-block h-24 flex w-96 flex-col justify-center ${className}`}
    >
      <Header
        labelElement={`${HeaderOfRange}`}
        id={'123'}
        label={'hello'}
        required={false}
        className="font-bold relative left-40 p-1 top-2 w-16 text-title3 "
        labelClassName="font-primary text-primary "
      >
        {' '}
      </Header>
      <div className="flex flex-col w-96 bg-white shadow-xl rounded-xl px-6 pt-10 py-4 h-24 drop-shadow-xl">
        <div className="mb-4">
          <div className="slider relative h-1 rounded-md bg-primary-lighter -top-3">
            <div className="progress absolute h-1 bg-primary-lightest rounded "></div>
          </div>

          <div className="range-input flex justify-center  ">
            <Badge
              className="bg-primary-lighter absolute p-2 justify-center "
              text={
                <Tiny className="text-white font-primary">{rangeValue}</Tiny>
              }
            />
            <input
              type="range"
              onChange={(e) => setRangeValue(e.target.value)}
              min={minimumvalue}
              max={maximumvalue}
              step={step}
              className="range-min relative w-full  -top-4  h-1   bg-transparent  appearance-none pointer-events-none "
            />
          </div>
        </div>
      </div>
    </div>
  );
};
RangeSlider.propTypes = {
  minimumvalue: PropTypes.number,
  maximumvalue: PropTypes.number.isRequired,
  step: PropTypes.number,
  HeaderOfRange: PropTypes.string,
  className: PropTypes.string,
};

export default RangeSlider;
