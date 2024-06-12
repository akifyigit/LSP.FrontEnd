import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { i18n } from 'constant/String';
import { REGEX_PASSWORD } from 'constant/Validation';
import PropTypes from 'prop-types';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { isUserCompanySelector } from 'redux/slices/signUp/signUpSlice';
import * as yup from 'yup';

import UserInfoForm from './UserInfoForm';

const UserInfo = ({ onNext, onPrev }) => {
  const isUserCompany = useSelector(isUserCompanySelector);

  const individualSchema = yup
    .object({
      fullName: yup.string().required(i18n.errors.required),
      identityNumber: yup
        .string()
        .required(i18n.errors.required)
        .min(11, i18n.errors.tcMin)
        .max(11, i18n.errors.tcMax),
      email: yup
        .string()
        .required(i18n.errors.required)
        .email(i18n.errors.email),
      username: yup.string().required(i18n.errors.required),
      password: yup
        .string()
        .min(8)
        .max(50)
        .matches(REGEX_PASSWORD, i18n.errors.password)
        .required(i18n.errors.required),
    })
    .required(i18n.errors.required);

  const companySchema = yup
    .object({
      fullName: yup.string().required(i18n.errors.required),
      email: yup
        .string()
        .required(i18n.errors.required)
        .email(i18n.errors.email),
      username: yup.string().required(i18n.errors.required),
      password: yup
        .string()
        .min(8)
        .max(50)
        .matches(REGEX_PASSWORD, i18n.errors.password)
        .required(i18n.errors.required),
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
        className="flex flex-col w-full gap-y-4 md:mt-10 items-center justify-center  h-full"
      >
        <UserInfoForm onNext={onSubmit} onPrev={onPrev} />
      </form>
    </FormProvider>
  );
};

UserInfo.propTypes = { onNext: PropTypes.func, onPrev: PropTypes.func };

export default UserInfo;
