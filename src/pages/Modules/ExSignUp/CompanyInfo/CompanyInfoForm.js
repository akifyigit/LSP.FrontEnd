import React, { useEffect, useState } from 'react';

import { Button, Input } from 'components';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  isUserCompanySelector,
  updateUserInfoField,
  userInfoSelector,
} from 'redux/slices/signUp/signUpSlice';

const CompanyInfoForm = ({ onPrev }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfoSelector);
  const isUserCompany = useSelector(isUserCompanySelector);

  const [formErrors, setFormErrors] = useState({});

  const { formState, setValue } = useFormContext();
  const { errors } = formState;

  useEffect(() => setFormErrors({ ...errors }), [errors]);

  useEffect(() => {
    setValue('companyName', userInfo?.companyName);
    setValue('telephone', userInfo?.telephone);
    setValue('mobile', userInfo?.mobile);
    setValue('taxOffice', userInfo?.taxOffice);
    setValue('taxNumber', userInfo?.taxNumber);
  }, [
    userInfo.companyName,
    userInfo.telephone,
    userInfo.mobile,
    userInfo.taxOffice,
    userInfo.taxNumber,
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
            label="Firma Adı"
            name="companyName"
            id="companyName"
            value={userInfo.companyName}
            onChange={(e) =>
              handleChangeUserInfo(e.target.name, e.target.value)
            }
            errors={formErrors?.companyName?.message}
          />
          <Input
            required
            label="İrtibat Numarası"
            name="telephone"
            id="telephone"
            value={userInfo.telephone}
            maxLength={10}
            onChange={(e) =>
              handleChangeUserInfo(e.target.name, e.target.value)
            }
            errors={formErrors?.telephone?.message}
          />
          <Input
            label="Cep Telefonu"
            name="mobile"
            id="mobile"
            maxLength={10}
            value={userInfo.mobile}
            onChange={(e) =>
              handleChangeUserInfo(e.target.name, e.target.value)
            }
            errors={formErrors?.mobile?.message}
          />
          {isUserCompany ? (
            <>
              <Input
                required
                label="Vergi Dairesi"
                name="taxOffice"
                id="taxOffice"
                value={userInfo.taxOffice}
                onChange={(e) =>
                  handleChangeUserInfo(e.target.name, e.target.value)
                }
                errors={formErrors?.taxOffice?.message}
              />
              <Input
                required
                label="Vergi Numarası"
                name="taxNumber"
                id="taxNumber"
                value={userInfo.taxNumber}
                onChange={(e) =>
                  handleChangeUserInfo(e.target.name, e.target.value)
                }
                errors={formErrors?.taxNumber?.message}
              />
            </>
          ) : null}
        </div>
      </div>
      <div className="flex w-full">
        <Button
          text="Geri"
          className="bg-ink p-3 mx-auto w-1/3"
          textVariant="white"
          onClick={onPrev}
        />
        <Button
          type="submit"
          text={'İlerle'}
          className="bg-primary p-3 mx-auto w-2/3"
          textVariant="white"
        />
      </div>
    </>
  );
};

CompanyInfoForm.propTypes = { onPrev: PropTypes.func };

export default CompanyInfoForm;
