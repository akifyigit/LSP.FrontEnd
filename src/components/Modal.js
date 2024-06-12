import React from 'react';

import PropTypes from 'prop-types';

export default function Modal({
  children,
  isOpen = false,
  handleModalClose,
  className = '',
  ModalContentClass = '',
  ModalClass = '',
}) {
  return isOpen ? (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } fixed w-full h-full top-0 right-0 z-50 ${className}`}
    >
      <div onClick={handleModalClose} className="fixed w-full h-full"></div>
      <div
        className={`border border-ink w-auto modal p-6 fixed h-auto rounded-2xl bg-white ${ModalClass}`}
      >
        <div className={`${ModalContentClass}`}>{children}</div>
        <i
          onClick={handleModalClose}
          className="fa-solid fa-circle-xmark absolute cursor-pointer top-2 right-0 w-6 h-6 md:w-7 md:h-7"
        />
      </div>
    </div>
  ) : null;
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  className: PropTypes.string,
  ModalContentClass: PropTypes.string,
  ModalClass: PropTypes.string,
  children: PropTypes.any,
  handleModalClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  isOpen: false,
};
