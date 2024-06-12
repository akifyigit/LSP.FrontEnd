import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { i18n } from 'constant/String';
import PropTypes from 'prop-types';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { isUserCompanySelector } from 'redux/slices/signUp/signUpSlice';
import * as yup from 'yup';

import CompanyInfoForm from './CompanyInfoForm';

const CompanyInfo = ({ onNext, onPrev }) => {
  const isUserCompany = useSelector(isUserCompanySelector);

  const companySchema = yup
    .object({
      companyName: yup.string().required(i18n.errors.required),
      telephone: yup
        .number()
        .min(10, i18n.errors.phone)
        .required(i18n.errors.required),
      mobile: yup.string(),
      taxOffice: yup.string().required(i18n.errors.required),
      taxNumber: yup.string().required(i18n.errors.required),
    })
    .required(i18n.errors.required);

  const individualSchema = yup
    .object({
      companyName: yup.string().required(i18n.errors.required),
      telephone: yup.string().required(i18n.errors.required),
      mobile: yup.string().required(i18n.errors.required),
    })
    .required(i18n.errors.required);

  const methods = useForm({
    resolver: yupResolver(isUserCompany ? companySchema : individualSchema),
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
        <CompanyInfoForm onNext={onSubmit} onPrev={onPrev} />
      </form>
    </FormProvider>
  );
};

CompanyInfo.propTypes = { onNext: PropTypes.func, onPrev: PropTypes.func };

export default CompanyInfo;
