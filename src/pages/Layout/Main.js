import React from 'react';

import Appbar from 'pages/Modules/Appbar/Appbar';
import Sidebar from 'pages/Modules/Sidebar/Sidebar';
import PropTypes from 'prop-types';

const Main = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Appbar />
      <div className="flex h-auto pt-5">
        <Sidebar />
        <section className="p-4 w-full h-full overflow-y-auto overflow-x-hidden">
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
