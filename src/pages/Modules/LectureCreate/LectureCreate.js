import React, { useState } from 'react';

import { Alert, Button, Input, SearchableSelectBox, Text } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useCreateLectureMutation,
  useGetDepartmentsQuery,
} from 'redux/slices/lecture/lectureApi';
import {
  lectureInfoSelector,
  setLectureInfo,
} from 'redux/slices/lecture/lectureSlice';
import { apiResHandler } from 'utils/axiosBaseQuery';

const LectureCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createLecture] = useCreateLectureMutation();
  const { data: departmentType } = useGetDepartmentsQuery('');

  const lectureInfo = useSelector(lectureInfoSelector);
  // Define the state variables and their setters
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    status: '',
    message: '',
  });

  const [departmentSearch, setDepartmentSearch] = useState();
  const handleChangeClassesInfo = (field, value) => {
    dispatch(setLectureInfo({ field, value }));
  };
  const handleDepartmentSelect = (departmentId) => {
    dispatch(
      setLectureInfo({
        field: 'departmentId',
        value: departmentId.value,
      })
    );
    setDepartmentSearch(departmentId.label);
  };

  const filterSearch = (typeSearch, filterType) => {
    return typeSearch
      ? filterType
          ?.filter((type) =>
            type?.name
              ?.toLocaleUpperCase('TR')
              ?.includes(typeSearch?.toLocaleUpperCase('TR'))
          )
          ?.map((type) => ({
            value: type.id,
            label: type.name,
          }))
      : filterType?.map((type) => ({
          value: type.id,
          label: type.name,
        }));
  };
  const handleButtonClick = () => {
    apiResHandler(
      createLecture({ data: lectureInfo }),
      () => {
        setAlertInfo({
          show: true,
          status: 'success',
          message: 'Lecture has been created.',
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      },
      (error) => {
        // Handle error
        console.error(' Failed to Create:', error);
        setAlertInfo({
          show: true,
          status: 'error',
          message: 'Lecture Create failed. Please try again.',
        });
      }
    );
  };
  return (
    <>
      {' '}
      <div className="bg-sky-lighter -mt-5 rounded w-full h-fit">
        <h1 className="text-title2 text-center font-bold">Create a Lecture</h1>
      </div>
      <div className=" grid grid-cols-2 overflow-hidden h-full">
        <div className="border-r-2">
          <div className="flex flex-row m-10  items-center">
            <Text className=" self-center  ">Name of the lecture:</Text>
            <Input
              className=" ml-4"
              name="name"
              id="name"
              onChange={(e) => {
                handleChangeClassesInfo(e.target.name, e.target.value);
              }}
              value={lectureInfo?.name}
            />
          </div>
        </div>
        <div>
          <div className="flex flex-row m-10  ">
            <Text className=" self-center  ">Department:</Text>
            <SearchableSelectBox
              className=" ml-4"
              showDefault={true}
              name="departmentId"
              id="departmentId"
              onSelect={handleDepartmentSelect}
              inputValue={departmentSearch}
              onChange={setDepartmentSearch}
              items={filterSearch(departmentSearch, departmentType?.data)}
            />
          </div>

          <Button
            className="bg-primary w-60 float-right mr-10 "
            textVariant="white"
            text="Create Lecture"
            onClick={() => {
              handleButtonClick();
            }}
          />
        </div>
      </div>
      <Alert
        message={alertInfo.message}
        position=""
        status={alertInfo.status}
        showAlert={alertInfo.show}
        handleOnClose={() => setAlertInfo({ show: false })}
      />
    </>
  );
};
LectureCreate.propTypes = {};
export default LectureCreate;
