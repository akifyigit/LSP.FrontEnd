import React, { createElement } from 'react';

import PropTypes from 'prop-types';

const title1 = {
  className: 'text-title1',
  component: 'h1',
};

const title2 = {
  className: 'text-title2',
  component: 'h2',
};

const title3 = {
  className: 'text-title3',
  component: 'h3',
};

const large = {
  className: 'text-large',
  component: 'p',
};

const regular = {
  className: 'text-regular',
  component: 'p',
};

const small = {
  className: 'text-small',
  component: 'p',
};

const tiny = {
  className: 'text-tiny',
  component: 'p',
};

const getColor = (variant) => {
  switch (variant) {
    case 'primary':
      return 'text-primary';
    case 'white':
      return 'text-white';
    case 'sky':
      return 'text-sky-dark';
    case 'dark':
      return 'text-ink-darker';
    case 'light':
      return 'text-ink-lighter';
    case 'error':
      return 'text-red';
    case 'warning':
      return 'text-yellow';
    case 'ink':
    default:
      return 'text-ink';
  }
};

const getWeight = (weight) => {
  switch (weight) {
    case 'bold':
      return 'font-bold';
    case 'semibold':
      return 'font-semibold';
    case 'medium':
      return 'font-medium';
    case 'normal':
    default:
      return 'font-normal';
  }
};

const TextComponent = (props) => {
  const {
    component,
    className = '',
    variant = 'ink',
    weight = 'normal',
    children,
    ...componentProps
  } = props;

  const p = {
    ...componentProps,
    className: `${component.className} ${getColor(variant)} ${getWeight(
      weight
    )} ${className}`,
  };

  return createElement(component.component, p, children);
};

export const Title1 = ({ weight = 'bold', ...props }) => (
  <TextComponent component={title1} weight={weight} {...props} />
);

export const Title2 = (props) => (
  <TextComponent component={title2} {...props} />
);

export const Title3 = ({ weight = 'semibold', ...props }) => (
  <TextComponent component={title3} weight={weight} {...props} />
);

export const Large = (props) => <TextComponent component={large} {...props} />;

export const Text = (props) => <TextComponent component={regular} {...props} />;

export const TextAlt = ({ weight = 'semibold', ...props }) => (
  <TextComponent component={small} weight={weight} {...props} />
);

export const Subtitle = ({ variant = 'light', ...props }) => (
  <TextComponent component={small} variant={variant} {...props} />
);

export const ContentSubtitle = ({ variant = 'light', ...props }) => (
  <TextComponent component={tiny} variant={variant} {...props} />
);

export const Small = (props) => <TextComponent component={small} {...props} />;

export const Tiny = (props) => <TextComponent component={tiny} {...props} />;

TextComponent.propTypes = {
  component: PropTypes.any,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'white',
    'sky',
    'dark',
    'light',
    'error',
    'warning',
    'ink',
    null,
  ]),
  weight: PropTypes.oneOf(['bold', 'semibold', 'medium', 'normal', null]),
  children: PropTypes.any,
};

Tiny.propTypes = {
  component: PropTypes.any,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'white',
    'sky',
    'dark',
    'light',
    'error',
    'warning',
    'ink',
    null,
  ]),
  weight: PropTypes.oneOf(['bold', 'semibold', 'medium', 'normal', null]),
  children: PropTypes.any,
};

Small.propTypes = {
  component: PropTypes.any,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'white',
    'sky',
    'dark',
    'light',
    'error',
    'warning',
    'ink',
    null,
  ]),
  weight: PropTypes.oneOf(['bold', 'semibold', 'medium', 'normal', null]),
  children: PropTypes.any,
};

ContentSubtitle.propTypes = {
  component: PropTypes.any,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'white',
    'sky',
    'dark',
    'light',
    'error',
    'warning',
    'ink',
    null,
  ]),
  weight: PropTypes.oneOf(['bold', 'semibold', 'medium', 'normal', null]),
  children: PropTypes.any,
};

Subtitle.propTypes = {
  component: PropTypes.any,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'white',
    'sky',
    'dark',
    'light',
    'error',
    'warning',
    'ink',
    null,
  ]),
  weight: PropTypes.oneOf(['bold', 'semibold', 'medium', 'normal', null]),
  children: PropTypes.any,
};

Text.propTypes = {
  component: PropTypes.any,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'white',
    'sky',
    'dark',
    'light',
    'error',
    'warning',
    'ink',
    null,
  ]),
  weight: PropTypes.oneOf(['bold', 'semibold', 'medium', 'normal', null]),
  children: PropTypes.any,
};

Large.propTypes = {
  component: PropTypes.any,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'white',
    'sky',
    'dark',
    'light',
    'error',
    'warning',
    'ink',
    null,
  ]),
  weight: PropTypes.oneOf(['bold', 'semibold', 'medium', 'normal', null]),
  children: PropTypes.any,
};

TextAlt.propTypes = {
  component: PropTypes.any,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'white',
    'sky',
    'dark',
    'light',
    'error',
    'warning',
    'ink',
    null,
  ]),
  weight: PropTypes.oneOf(['bold', 'semibold', 'medium', 'normal', null]),
  children: PropTypes.any,
};

Title3.propTypes = {
  component: PropTypes.any,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'white',
    'sky',
    'dark',
    'light',
    'error',
    'warning',
    'ink',
    null,
  ]),
  weight: PropTypes.oneOf(['bold', 'semibold', 'medium', 'normal', null]),
  children: PropTypes.any,
};

Title2.propTypes = {
  component: PropTypes.any,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'white',
    'sky',
    'dark',
    'light',
    'error',
    'warning',
    'ink',
    null,
  ]),
  weight: PropTypes.oneOf(['bold', 'semibold', 'medium', 'normal', null]),
  children: PropTypes.any,
};

Title1.propTypes = {
  component: PropTypes.any,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'white',
    'sky',
    'dark',
    'light',
    'error',
    'warning',
    'ink',
    null,
  ]),
  weight: PropTypes.oneOf(['bold', 'semibold', 'medium', 'normal', null]),
  children: PropTypes.any,
};
