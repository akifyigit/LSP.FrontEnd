import React from 'react';

const Header = () => {
  return (
    <header className="bg-primary-lightest p-4 flex justify-center items-center border m-2 rounded-xl">
      <div className="items-center font-bold text-title2 flex">
        <div className="flex justify-center items-center bg-primary h-14 w-14 rounded-full">
          <i
            className="fa fa-plane text-primary-lightest fa-lg text-2xl"
            aria-hidden="true"
          ></i>
        </div>
        <span className="ml-4">PLANE SCAPE</span>
      </div>
    </header>
  );
};

export default Header;
