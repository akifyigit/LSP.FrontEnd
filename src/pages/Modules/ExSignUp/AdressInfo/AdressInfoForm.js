import React, { useEffect, useState } from 'react';

import { Button, Input, SearchableSelectBox } from 'components';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetCityListQuery,
  useGetCountryListQuery,
  useGetDistrictsListQuery,
  useGetPostalCodeQuery,
} from 'redux/slices/signUp/SignUpApi';
import {
  updateUserInfoField,
  userInfoSelector,
} from 'redux/slices/signUp/signUpSlice';

const AdressInfoForn = ({ onPrev, isLoading = false }) => {
  const dispatch = useDispatch();

  const [selectedCountry, setSelectedCountry] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [districtsSearch, setDistrictsSearch] = useState('');
  const [postalCodeSearch, setPostalCodeSearch] = useState('');

  const userInfo = useSelector(userInfoSelector);

  const [formErrors, setFormErrors] = useState({});
  const { formState, setValue } = useFormContext();
  const { errors } = formState;

  const { data = [], isFetching: i1 } = useGetCountryListQuery({
    country: countrySearch,
  });
  const { data: cities, isFetching: i2 } = useGetCityListQuery(
    { country: selectedCountry, city: citySearch },
    { skip: !selectedCountry || citySearch.length < 2 }
  );
  const { data: disctricts, isFetching: i3 } = useGetDistrictsListQuery(
    { country: selectedCountry, districts: districtsSearch },
    { skip: !selectedCountry }
  );
  const { data: postalCodes, isFetching: i4 } = useGetPostalCodeQuery(
    { country: userInfo.countryCode, code: postalCodeSearch },
    { skip: !selectedCountry }
  );

  useEffect(() => setFormErrors({ ...errors }), [errors]);

  useEffect(() => {
    setValue('countryName', userInfo?.countryName);
    setValue('countryCode', userInfo?.countryCode);
    setValue('cityCode', userInfo?.cityCode);
    setValue('cityName', userInfo?.cityName);
    setValue('districtName', userInfo?.districtName);
    setValue('zipCode', userInfo?.zipCode);
    setValue('address', userInfo.address);
  }, [
    userInfo.countryName,
    userInfo.countryCode,
    userInfo.cityCode,
    userInfo.cityName,
    userInfo.districtName,
    userInfo.zipCode,
    userInfo.address,
  ]);

  const handleChangeUserInfo = (field, value) => {
    dispatch(updateUserInfoField({ field, value }));
  };

  const handleCountrySelect = (country) => {
    dispatch(
      updateUserInfoField({ field: 'countryCode', value: country.code })
    );
    dispatch(
      updateUserInfoField({ field: 'countryName', value: country.name })
    );
    setSelectedCountry(country.objectId);
    setCountrySearch(country.name);
  };

  const handleCitySelect = (city) => {
    dispatch(
      updateUserInfoField({ field: 'cityCode', value: city.subdivision_Code })
    );
    dispatch(
      updateUserInfoField({ field: 'cityName', value: city.subdivision_Name })
    );
    setCitySearch(city.subdivision_Name);
  };

  const handleDistrictSelect = (district) => {
    dispatch(
      updateUserInfoField({ field: 'districtName', value: district.name })
    );
    setDistrictsSearch(district.name);
  };

  const handlePostalCodeSelect = (zipcode) => {
    dispatch(
      updateUserInfoField({ field: 'zipCode', value: zipcode.postalCode })
    );
    setPostalCodeSearch(zipcode.postalCode);
  };

  return (
    <>
      <div className="flex  w-full overflow-y-auto sm:h-full sm:gap-x-4">
        <div className="flex flex-col w-full gap-y-4">
          <SearchableSelectBox
            required
            inputValue={countrySearch}
            placeholder="Ülke"
            onChange={setCountrySearch}
            onSelect={handleCountrySelect}
            label="Ülke"
            inputName="countryCode"
            items={data?.data?.map((country) => {
              return { ...country, label: country.name, value: country.code };
            })}
            inputErrors={formErrors?.countryName?.message}
            isLoading={i1}
          />
          <SearchableSelectBox
            required
            inputValue={citySearch}
            placeholder="Şehir"
            isInputDisabled={!selectedCountry}
            onChange={setCitySearch}
            onSelect={handleCitySelect}
            label="Şehir"
            inputName="cityName"
            items={cities?.data?.map((city) => {
              return {
                ...city,
                label: city.subdivision_Name,
                value: city.subdivision_Code,
              };
            })}
            inputErrors={formErrors?.cityName?.message}
            isLoading={i2}
          />
          <SearchableSelectBox
            required
            inputValue={districtsSearch}
            placeholder="İlçe"
            isInputDisabled={!(userInfo.cityCode && userInfo.cityName)}
            onChange={setDistrictsSearch}
            onSelect={handleDistrictSelect}
            label="İlçe"
            inputName="districtName"
            items={disctricts?.data?.map((city) => {
              return { ...city, label: city.name, value: city.cityId };
            })}
            inputErrors={formErrors?.districtName?.message}
            isLoading={i3}
          />
          <SearchableSelectBox
            required
            inputValue={postalCodeSearch}
            isInputDisabled={!userInfo.districtName}
            placeholder="Posta Kodu"
            onChange={setPostalCodeSearch}
            onSelect={handlePostalCodeSelect}
            label="Posta Kodu"
            inputName="zipCode"
            items={postalCodes?.data?.map((postalCode) => {
              return {
                ...postalCode,
                label: postalCode.postalCode + ' / ' + postalCode.placeName,
                value: postalCode.postalCode,
              };
            })}
            inputErrors={formErrors?.zipCode?.message}
            isLoading={i4}
          />
          <Input
            required
            label="Açık adres"
            name="address"
            autoComplete
            id="address"
            value={userInfo.address}
            onChange={(e) =>
              handleChangeUserInfo(e.target.name, e.target.value)
            }
            errors={formErrors?.address?.message}
          />
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
          text={'Tamamala'}
          className="bg-primary p-3 mx-auto w-2/3"
          textVariant="white"
          disabled={isLoading}
        />
      </div>
    </>
  );
};

AdressInfoForn.propTypes = {
  onPrev: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default AdressInfoForn;
