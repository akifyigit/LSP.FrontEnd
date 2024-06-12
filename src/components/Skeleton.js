import React from 'react';

import PropTypes from 'prop-types';

const SkeletonLine = (props) => {
  const { className = '' } = props;
  return (
    <div
      className={`animate-pulse w-full h-4 bg-sky-lighter rounded-full dark:bg-sky-light mb-2.5 ${className}`}
    ></div>
  );
};

const SkeletonCircle = (props) => {
  const { className = '' } = props;
  return (
    <div
      className={`animate-pulse  bg-sky-lighter rounded-full dark:bg-sky-light mb-2.5 ${className}`}
    ></div>
  );
};

const SkeletonSquare = (props) => {
  const { className = '' } = props;
  return (
    <div
      className={`animate-pulse  bg-sky-lighter  dark:bg-sky-light mb-2.5 ${className}`}
    ></div>
  );
};
SkeletonLine.propTypes = {
  className: PropTypes.string,
};
SkeletonSquare.propTypes = {
  className: PropTypes.string,
};
SkeletonCircle.propTypes = {
  className: PropTypes.string,
};

export default { SkeletonLine, SkeletonCircle, SkeletonSquare };
