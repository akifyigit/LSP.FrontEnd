import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { i18n } from 'constant/String';
import PropTypes from 'prop-types';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import AdressInfoForm from './AdressInfoForm';

const SignUpForm = ({ onNext, onPrev, isLoading }) => {
  const schema = yup
    .object({
      countryName: yup.string().required(i18n.errors.required),
      cityName: yup.string().required(i18n.errors.required),
      districtName: yup.string().required(i18n.errors.required),
      zipCode: yup.string().required(i18n.errors.required),
      address: yup.string().required(i18n.errors.required),
    })
    .required(i18n.errors.required);

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    onNext();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-y-4 md:mt-10 items-center justify-center h-full"
      >
        <AdressInfoForm
          onNext={onSubmit}
          onPrev={onPrev}
          isLoading={isLoading}
        />
      </form>
    </FormProvider>
  );
};

SignUpForm.propTypes = {
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default SignUpForm;
