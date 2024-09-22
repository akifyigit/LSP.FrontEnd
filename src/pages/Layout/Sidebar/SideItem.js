import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const SideItem = ({ title, route, subItems }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState();
  const sideItemRef = useRef(null);

  const handleNavigate = (route) => {
    navigate(route);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (!sideItemRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={sideItemRef}>
      <button
        onClick={subItems.length > 0 ? handleOpen : () => handleNavigate(route)}
        className={` border bg-sky-lighter flex flex-row items-center px-4 py-2 mt-5 text-ink-light w-full transition-colors duration-200 transform  rounded-md dark:text-ink-light hover:bg-sky ${
          window.location.pathname === route
            ? 'bg-sky-dark'
            : subItems.find((si) => si.route === window.location.pathname)
            ? 'bg-sky'
            : ''
        }`}
      >
        <text className=" text-center">{title}</text>
      </button>
      {subItems.length > 0 && (
        <div
          onClick={handleOpen}
          className={`z-50 absolute right-0 translate-x-full top-2/4 -translate-y-1/2 bg-primary p-2 ${
            isOpen ? 'block' : 'hidden'
          } flex flex-col shadow-design-md rounded-md mt-1`}
        >
          <div className="triangle absolute -left-3 top-2/4 -translate-y-1/2"></div>
          {subItems.map((item) => {
            return (
              <button
                key={item.title}
                onClick={() => handleNavigate(item.route)}
                className={`items-center p-4 text-ink-darkest w-full transition-colors duration-200 transform  rounded-md dark:text-ink-light hover:bg-sky ${
                  window.location.pathname === item.route ? 'bg-sky' : ''
                }`}
              >
                <text className="ml-2">{item.title}</text>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SideItem;

SideItem.propTypes = {
  title: PropTypes.string,
  route: PropTypes.string,
  icon: PropTypes.any,
  subItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      route: PropTypes.string,
    })
  ),
};
