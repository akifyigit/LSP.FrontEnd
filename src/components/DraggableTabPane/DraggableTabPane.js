import React, { isValidElement, useCallback, useEffect, useState } from 'react';

import update from 'immutability-helper';
import PropTypes from 'prop-types';

import Tab from './Tab';

const DraggableTabPane = (props) => {
  const {
    onChange = () => {},
    tabPaneList,
    defaultActiveTabPaneIndex,
    className = '',
    handleClose = () => {},
  } = props;
  const [tabs, setTabs] = useState(tabPaneList);

  const moveTab = useCallback((dragIndex, hoverIndex) => {
    setTabs((prevTabs) =>
      update(prevTabs, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevTabs[dragIndex]],
        ],
      })
    );
  }, []);

  const [activeTabPane, setActiveTabPane] = useState(
    defaultActiveTabPaneIndex || 0
  );

  useEffect(() => {
    if (
      defaultActiveTabPaneIndex !== undefined ||
      defaultActiveTabPaneIndex !== null
    ) {
      setActiveTabPane(defaultActiveTabPaneIndex);
    }
  }, [defaultActiveTabPaneIndex]);

  const handleTabPaneChange = (tabPaneIndex) => {
    setActiveTabPane(tabPaneIndex);
    onChange(tabPaneIndex);
  };

  const renderTab = (tab, idx) => {
    return (
      <Tab
        id={idx}
        index={idx}
        key={tab.key}
        text={tab.title}
        onClick={(e) => {
          e.preventDefault();
          handleTabPaneChange(tab.key);
        }}
        moveTab={moveTab}
        onClose={() => handleClose(tab.key)}
        className={`flex w-72 min-w-fit border-b-2 hover:border-primary px-2 ${className} ${
          activeTabPane === tab.key
            ? 'border-primary border-b-4 rounded-md text-primary font-semibold'
            : 'rounded-none'
        }`}
      />
    );
  };

  return (
    <>
      <div className="flex w-full space-x-2 overflow-x-auto pb-3">
        {tabs?.map((tab, i) => renderTab(tab, i))}
      </div>
      <div className="h-auto bg-white p-2">
        {tabs?.find((tab) => tab.key === activeTabPane) &&
          isValidElement(
            tabs?.find((tab) => tab.key === activeTabPane).tabPaneComponent
          ) &&
          tabs?.find((tab) => tab.key === activeTabPane).tabPaneComponent}
      </div>
    </>
  );
};

export default DraggableTabPane;

DraggableTabPane.propTypes = {
  onChange: PropTypes.func,
  tabPaneList: PropTypes.array,
  defaultActiveTabPaneIndex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  className: PropTypes.string,
  handleClose: PropTypes.func,
};

DraggableTabPane.defaultProps = {
  defaultActiveTabPaneIndex: 0,
};
