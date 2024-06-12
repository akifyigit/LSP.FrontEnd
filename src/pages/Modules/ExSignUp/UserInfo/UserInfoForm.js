import React, { useEffect, useState } from 'react';

import { Button, Input } from 'components';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  isUserCompanySelector,
  updateUserInfoField,
  userInfoSelector,
} from 'redux/slices/signUp/signUpSlice';

const UserInfoForm = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfoSelector);
  const isUserCompany = useSelector(isUserCompanySelector);

  const [formErrors, setFormErrors] = useState({});

  const { formState, setValue } = useFormContext();
  const { errors } = formState;

  useEffect(() => setFormErrors({ ...errors }), [errors]);

  useEffect(() => {
    setValue('identityNumber', userInfo?.identityNumber);
    setValue('fullName', userInfo?.fullName);
    setValue('email', userInfo?.email);
    setValue('username', userInfo?.username);
    setValue('password', userInfo?.password);
  }, [
    userInfo.identityNumber,
    userInfo.fullName,
    userInfo.email,
    userInfo.username,
    userInfo.password,
  ]);

  const handleChangeUserInfo = (field, value) => {
    dispatch(updateUserInfoField({ field, value }));
  };

  return (
    <>
      <div className="flex  w-full overflow-y-auto sm:h-full sm:gap-x-4">
        <div className="flex flex-col w-full gap-y-4">
          <Input
            required
            label="Ad Soyad"
            name="fullName"
            id="fullName"
            value={userInfo.fullName}
            onChange={(e) =>
              handleChangeUserInfo(e.target.name, e.target.value)
            }
            errors={formErrors?.fullName?.message}
          />
          {isUserCompany ? null : (
            <Input
              required
              id="identityNumber"
              name="identityNumber"
              label="Kimlik No"
              value={userInfo.identityNumber}
              maxLength={11}
              onChange={(e) =>
                handleChangeUserInfo(e.target.name, e.target.value)
              }
              errors={formErrors?.identityNumber?.message}
            />
          )}
          <Input
            required
            name="email"
            id="email"
            label="E-posta"
            value={userInfo.email}
            onChange={(e) =>
              handleChangeUserInfo(e.target.name, e.target.value)
            }
            errors={formErrors?.email?.message}
          />
          <Input
            required
            name="username"
            id="username"
            label="Kullanıcı Adı"
            value={userInfo.username}
            onChange={(e) =>
              handleChangeUserInfo(e.target.name, e.target.value)
            }
            errors={formErrors?.username?.message}
          />
          <Input
            required
            label="Şifre"
            name="password"
            id="password"
            type="password"
            value={userInfo.password}
            onChange={(e) =>
              handleChangeUserInfo(e.target.name, e.target.value)
            }
            errors={formErrors?.password?.message}
          />
        </div>
      </div>

      <Button
        type="submit"
        text={'İlerle'}
        className="bg-primary p-3 mx-auto"
        textVariant="white"
      />
    </>
  );
};

export default UserInfoForm;
