import React from 'react';

import { ContentSubtitle } from 'components/Text';
import PropTypes from 'prop-types';

const getStepStyle = (step, active) => {
  if (step < active) {
    return ' border-primary bg-primary text-white';
  }
  if (step === active) {
    return ' transform scale-125 border-primary bg-white';
  }

  return ' border-default-border';
};

const Stepper = ({ steps = [], activeStep = 0, className = '' }) => (
  <div className={`flex items-center mb-5 w-full ${className}`}>
    {steps.map((step, idx) => (
      <div
        className={`${
          idx + 1 < steps.length ? 'w-full' : 'w-auto'
        } flex flex-col gap-y-1 relative`}
        key={step.title}
      >
        <div className="w-full flex  items-center">
          <div
            className={`rounded-full transition-all duration-500 ease-in-out border-2 h-9 w-9 flex items-center justify-center ${getStepStyle(
              idx + 1,
              activeStep
            )}`}
          >
            {idx + 1 < activeStep ? (
              <i className="fa-solid fa-circle-check"></i>
            ) : (
              step.icon
            )}
          </div>

          {idx + 1 < steps.length ? (
            <div
              className={`flex-auto border-t-2 transition-all duration-500 ease-in-out ${
                idx + 1 < activeStep
                  ? 'border-primary'
                  : 'border-default-border'
              }`}
            />
          ) : null}
        </div>
        <ContentSubtitle
          className={`absolute -bottom-5 ${
            idx === steps.length - 1
              ? '-left-12'
              : idx === 0
              ? 'left-0'
              : '-left-6'
          }
           `}
          weight="semibold"
        >
          {step.title}
        </ContentSubtitle>
      </div>
    ))}
  </div>
);

export default Stepper;

Stepper.propTypes = {
  totalSteps: PropTypes.number,
  activeStep: PropTypes.number,
  className: PropTypes.string,
  steps: PropTypes.array.isRequired,
};
