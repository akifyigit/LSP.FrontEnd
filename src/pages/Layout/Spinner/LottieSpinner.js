import React from 'react';

import { Lottie } from 'components';
import PropTypes from 'prop-types';

import SpinAnimation from './Spinner.json';

const LottieSpinner = ({ isPending = true }) => {
  return (
    isPending && (
      <Lottie
        animation={SpinAnimation}
        containerClass="w-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    )
  );
};

LottieSpinner.propTypes = {
  isPending: PropTypes.bool,
};

export default LottieSpinner;
