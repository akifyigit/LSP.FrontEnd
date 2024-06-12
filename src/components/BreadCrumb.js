import React from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Tiny } from './Text';

const BreadCrumb = ({
  items,
  wrapperClassName = '',
  tinyClassName = '',
  tinyVariantParent = 'ink',
  tinyWeightParent = 'bold',
  tinyVariantChild = 'ink',
  tinyWeightChild = 'semibold',
  tinyVariantGrandChild = 'ink',
  tinyWeightGrandChild = 'semibold',
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`w-fit cursor-pointer flex  font-primary justify-start border-2 border-primary-lighter rounded-xl ${wrapperClassName}`}
    >
      <div
        className={` p-4 hover:font-primary ${tinyClassName}`}
        onClick={() => navigate(items?.route)}
      >
        <Tiny variant={`${tinyVariantParent}`} weight={`${tinyWeightParent}`}>
          {items.label}
        </Tiny>
      </div>

      {items?.children?.route ? (
        <>
          <i className="fa-solid fa-greater-than items-start  text-start m-auto " />

          <div
            className={` p-4   ${tinyClassName}`}
            onClick={() => navigate(items?.children?.route)}
          >
            <Tiny variant={`${tinyVariantChild}`} weight={`${tinyWeightChild}`}>
              {items.children?.label}
            </Tiny>
          </div>
        </>
      ) : null}

      {items?.children?.children?.route ? (
        <>
          <i className="fa-solid fa-greater-than items-start  text-start m-auto " />

          <div
            className={` p-4 text-title2 ${tinyClassName}`}
            onClick={() => navigate(items?.children?.children?.route)}
          >
            <Tiny
              variant={`${tinyVariantGrandChild}`}
              weight={`${tinyWeightGrandChild}`}
            >
              {items.children?.children?.label}
            </Tiny>
          </div>
        </>
      ) : null}
    </div>
  );
};

BreadCrumb.propTypes = {
  items: PropTypes.shape({
    label: PropTypes.string,
    route: PropTypes.string,
    children: PropTypes.any,
  }),
  wrapperClassName: PropTypes.string,
  tinyClassName: PropTypes.string,
  tinyVariantParent: PropTypes.string,
  tinyWeightParent: PropTypes.string,
  tinyVariantChild: PropTypes.string,
  tinyWeightChild: PropTypes.string,
  tinyVariantGrandChild: PropTypes.string,
  tinyWeightGrandChild: PropTypes.string,
};

export default BreadCrumb;
