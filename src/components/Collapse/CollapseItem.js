import React, { useState } from 'react';

import { Transition } from '@tailwindui/react';
import PropTypes from 'prop-types';

import CollapseBar from './CollapseBar';
import CollapseContent from './CollapseContent';

const CollapseItem = (props) => {
  const {
    className = '',
    collapseBarClassName = '',
    collapseContentClassName = '',
    collapseBar = null,
    collapseContent = null,
    isIconOnClick = false,
    collapsable = false,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex border border-default-border flex-col w-full ${className}`}
    >
      <CollapseBar
        isOpen={isOpen}
        isIconOnClick={isIconOnClick}
        onClick={handleClick}
        className={collapseBarClassName}
        collapsable={collapsable}
      >
        {collapseBar}{' '}
      </CollapseBar>
      <Transition
        show={isOpen}
        enter="transition-opacity duration-700"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-700"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <CollapseContent className={`${collapseContentClassName}`}>
          {collapseContent}
        </CollapseContent>
      </Transition>
    </div>
  );
};

CollapseItem.propTypes = {
  className: PropTypes.string,
  collapseBarClassName: PropTypes.string,
  collapseContentClassName: PropTypes.string,
  collapseBar: PropTypes.any,
  collapseContent: PropTypes.any,
  isIconOnClick: PropTypes.bool,
  collapsable: PropTypes.bool,
};

export default CollapseItem;
