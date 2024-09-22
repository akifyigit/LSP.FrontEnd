import React from 'react';

import PropTypes from 'prop-types';

import Header from './Header';
import Sidebar from './Sidebar/Sidebar';

const Main = ({ children }) => {
  return (
    <div className="flex flex-col h-screen container mx-auto ">
      <Header />
      <div className="flex h-auto pt-5">
        <Sidebar />
        <section className="p-4 w-full h-full overflow-y-auto overflow-x-hidden ">
          {children}
        </section>
      </div>
    </div>
  );
};

export default Main;

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
