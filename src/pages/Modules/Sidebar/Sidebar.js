import React from 'react';

import SearchIcon from 'assets/icons/search.svg';

import SideItem from './SideItem';

const subItems = [
  {
    title: 'Dashboard',
    isCustomElement: false,
    customElement: null,
    subItems: [],
    route: '/dashboard',
  },
  {
    title: 'Create a Classroom',
    isCustomElement: false,
    customElement: null,
    subItems: [],
    route: '/createClassroomForm',
  },
  {
    title: 'Create a Lecture',
    isCustomElement: false,
    customElement: null,
    subItems: [],
    route: '/lecture-create',
  },
  {
    title: 'Schedule a new Class',
    isCustomElement: false,
    customElement: null,
    subItems: [],
    route: '/filterSchedule',
  },

  {
    title: 'All Scheduled Classes',
    isCustomElement: false,
    customElement: null,
    subItems: [],
    route: '/scheduledClasses',
  },
];

const Sidebar = () => {
  return (
    <div className="sticky z-50 top-0 hidden md:block bottom-0 lg:left-0 p-2 w-60 text-center h-80vh ml-2 bg-sky-lighter rounded-lg">
      <div className="relative mt-6">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <img src={SearchIcon} alt="" />
        </span>

        {/* <input
          type="text"
          className="w-full py-2 pl-10 pr-4 text-ink-dark bg-white border rounded-md dark:bg-inktext-ink-darkest  focus:border-primary focus:ring-primary-lightest focus:ring-opacity-40 focus:outline-none focus:ring"
          placeholder="Search"
        /> */}
      </div>
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
