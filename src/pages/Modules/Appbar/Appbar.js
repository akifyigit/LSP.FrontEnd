import React, { useState } from 'react';

import { Dropdown, IconButton, Input } from 'components';
import { useNavigate } from 'react-router-dom';

const Appbar = () => {
  const navigate = useNavigate();
  const [searchBarState, setSearchBarState] = useState('');
  const [mobileMenuState, setMobileMenuState] = useState(false);

  const dropdownItems = [
    {
      leftIcon: <i className="fa-solid fa-building-user"></i>,
      label: 'Çıkış Yap',
      onClick: () => {
        localStorage.clear();
        navigate('/');
      },
    },
  ];
  return (
    <div className={`w-full bg-sky-lighter`}>
      <nav className=" relative flex justify-end px-5 lg:px-1 h-20 max-h-20 items-center border-b-2 border-default-border">
        <div className="hidden py-5 px-1 lg:px-5 md:flex h-full items-center gap-x-1 lg:gap-x-5 border-r border-default-border">
          {/* <IconButton
            className="inline-flex items-center p-1.5 lg:p-3 rounded-full hover:bg-sky-lightest"
            icon={<i className="fa-solid fa-grip fa-lg"></i>}
            onClick={() => {
              console.log('Icon Button Clicked.');
            }}
          /> */}
          {/* <IconButton
            className="inline-flex items-center p-1.5 lg:p-3 rounded-full hover:bg-sky-lightest"
            icon={<i className="fa-solid fa-file-lines fa-lg"></i>}
            onClick={() => {
              console.log('Icon Button Clicked.');
            }}
          /> */}
          <IconButton
            className="inline-flex items-center p-1.5 lg:p-3 rounded-full hover:bg-sky-lightest"
            icon={<i className="fa-solid fa-home fa-lg"></i>}
            onClick={() => {
              navigate('/dashboard');
            }}
          />
          <IconButton
            className="inline-flex items-center p-1.5 lg:p-3 rounded-full hover:bg-sky-lightest"
            icon={<i className="fa-solid fa-calendar-days fa-lg"></i>}
            onClick={() => {
              navigate('/scheduledClasses');
            }}
          />
        </div>
        <div className="hidden md:flex items-center justify-between w-full py-5 px-1 lg:px-5 border-r border-default-border">
          {/* <Input
            value={searchBarState}
            placeholder="Search"
            onChange={(e) => setSearchBarState(e.target.value)}
            className=" px-3 rounded-full items-center w-auto"
            inputClassName="border-none rounded-full"
            inlineElement={
              <span>
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            }
          />
          <IconButton
            className="inline-flex items-center p-3 rounded-full hover:bg-sky-lightest"
            icon={<i className="fa-solid fa-bell fa-lg" />}
            onClick={() => {
              console.log('Icon Button Clicked.');
            }}
          /> */}
        </div>
        <Dropdown
          className="z-20 hidden md:block w-60 shrink-0 float-right"
          dropdownBarClassName="border-none"
          items={dropdownItems}
          dropdownBarLeftIcon={
            <div className="w-10 h-10 rounded-full bg-ink-lighter" />
          }
          dropdownBarText="Mehmet Akif Yiğit"
        />
        <IconButton
          className="inline-flex md:hidden items-center p-3 rounded-full hover:bg-sky-lightest"
          icon={
            mobileMenuState ? (
              <i className="fa-solid fa-xmark fa-lg" />
            ) : (
              <i className="fa-solid fa-bars fa-lg" />
            )
          }
          onClick={() => {
            setMobileMenuState(!mobileMenuState);
          }}
        />
      </nav>
      <div
        className={`${
          mobileMenuState ? 'flex' : 'hidden'
        } z-10 flex-col gap-y-2 bg-white absolute py-2 px-5 mt-2 h-96 overflow-y-auto border rounded border-default-border w-full`}
      >
        <div className="flex py-5 px-1 justify-around items-center gap-x-1">
          <IconButton
            className="inline-flex items-center p-1.5 lg:p-3 rounded-full hover:bg-sky-lightest"
            icon={<i className="fa-solid fa-grip fa-lg"></i>}
            onClick={() => {
              console.log('Icon Button Clicked.');
            }}
          />
          <IconButton
            className="inline-flex items-center p-1.5 lg:p-3 rounded-full hover:bg-sky-lightest"
            icon={<i className="fa-solid fa-file-lines fa-lg"></i>}
            onClick={() => {
              console.log('Icon Button Clicked.');
            }}
          />
          <IconButton
            className="inline-flex items-center p-1.5 lg:p-3 rounded-full hover:bg-sky-lightest"
            icon={<i className="fa-solid fa-envelopes-bulk fa-lg"></i>}
            onClick={() => {
              console.log('Icon Button Clicked.');
            }}
          />
          <IconButton
            className="inline-flex items-center p-3 rounded-full hover:bg-sky-lightest"
            icon={<i className="fa-solid fa-bell fa-lg" />}
            onClick={() => {
              console.log('Icon Button Clicked.');
            }}
          />
        </div>
        <Input
          value={searchBarState}
          placeholder="Search"
          onChange={(e) => setSearchBarState(e.target.value)}
          className="bg-default-background px-3 rounded-xl items-center w-full"
          inputClassName="border-none bg-default-background"
          inlineElement={
            <span>
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
          }
        />
        <Dropdown
          className="z-20 lg:px-2 w-full shrink-0"
          dropdownBarClassName="border-none"
          items={dropdownItems}
          dropdownBarLeftIcon={
            <div className="w-10 h-10 rounded-full bg-ink-lighter" />
          }
          dropdownBarText="Mehmet Akif Yiğit"
        />
      </div>
    </div>
  );
};

export default Appbar;
