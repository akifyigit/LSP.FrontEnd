import React, { isValidElement, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import IconButton from './IconButton';
import { Text } from './Text';

const Tab = (props) => {
  const {
    onChange = () => {},
    tabList,
    defaultActiveTabIndex,
    className = '',
    handleClose = () => {},
  } = props;

  const [activeTab, setActiveTab] = useState(defaultActiveTabIndex || 0);

  useEffect(() => {
    if (defaultActiveTabIndex !== undefined || defaultActiveTabIndex !== null) {
      setActiveTab(defaultActiveTabIndex);
    }
  }, [defaultActiveTabIndex]);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
    onChange(tabIndex);
  };

  return (
    <>
      <div className="flex w-full space-x-2 overflow-x-auto pb-3">
        {tabList.map((tabElement, idx) => (
          <div
            aria-hidden
            key={`tab-${tabElement.key}`}
            onClick={(e) => {
              e.preventDefault();
              handleTabChange(idx);
            }}
            className={`flex w-72 min-w-fit border-b-2 hover:border-primary px-2 ${
              activeTab === idx
                ? 'border-primary border-b-4 rounded-md text-primary font-semibold'
                : ''
            }`}
          >
            <Text
              weight="semibold"
              className={` p-2 h-full cursor-pointer w-full text-center ${className}`}
            >
              {tabElement?.title}
            </Text>
            <IconButton
              icon={<i className="fa-solid fa-circle-xmark"></i>}
              onClick={() => handleClose(idx)}
            />
          </div>
        ))}
      </div>
      <div className="h-auto bg-white p-2">
        {tabList[activeTab] &&
          isValidElement(tabList[activeTab].tabComponent) &&
          tabList[activeTab].tabComponent}
      </div>
    </>
  );
};

export default Tab;

Tab.propTypes = {
  onChange: PropTypes.func,
  tabList: PropTypes.array,
  defaultActiveTabIndex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  className: PropTypes.string,
  handleClose: PropTypes.func,
};

Tab.defaultProps = {
  defaultActiveTabIndex: 0,
};
