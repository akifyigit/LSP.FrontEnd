import React from 'react';

import SideItem from './SideItem';

const subItems = [
  {
    title: 'All Flights',
    isCustomElement: false,
    customElement: null,
    subItems: [],
    route: '/',
  },
  {
    title: 'Booked Flights',
    isCustomElement: false,
    customElement: null,
    subItems: [],
    route: '/booked-flights',
  },
];

const Sidebar = () => {
  return (
    <div className="sticky z-50 top-0 hidden md:block bottom-0 lg:left-0 p-2 w-60 text-center h-96vh ml-2 bg-primary-lightest rounded-lg">
      <div className="relative mt-6"></div>
      {subItems.map((item) =>
        !item.isCustomElement ? (
          <SideItem
            key={item.route}
            title={item.title}
            route={item.route}
            isCustomElement={item.isCustomElement}
            subItems={item.subItems}
          />
        ) : (
          item.customElement
        )
      )}
    </div>
  );
};

export default Sidebar;
