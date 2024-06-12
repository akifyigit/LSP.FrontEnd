import React, { useState } from 'react';

import {
  Alert,
  Button,
  Input,
  SearchableSelectBox,
  SelectBox,
  Text,
} from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  classesInfoSelector,
  setClassesInfo,
} from 'redux/slices/classes/classesSlice';
import {
  useCreateClassroomMutation,
  useGetClassroomCapacityListQuery,
  useGetClassroomTypeListQuery,
} from 'redux/slices/classes/classroomApi';
import { apiResHandler } from 'utils/axiosBaseQuery';

const ApplyClassForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createClassroom] = useCreateClassroomMutation();
  const { data: classroomType } = useGetClassroomTypeListQuery();
  const { data: classroomCapacity } = useGetClassroomCapacityListQuery();
  const selectBoxItems = classroomCapacity?.data?.map((item) => ({
    label: item.capacity,
    value: item.id,
  }));
  const classesInfo = useSelector(classesInfoSelector);
  // Define the state variables and their setters
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    status: '',
    message: '',
  });
  const [typeSearch, setTypeSearch] = useState('');

  const [classroomCapacityState, setClassroomCapacityState] = useState('');

  const handleChangeClassesInfo = (field, value) => {
    dispatch(setClassesInfo({ field, value }));
  };
  const handleTypeSelect = (classroomTypeId) => {
    dispatch(
      setClassesInfo({
        field: 'classroomTypeId',
        value: classroomTypeId.value,
      })
    );
    setTypeSearch(classroomTypeId.label);
  };

  const handleClassroomCapacityChange = (selectedClassroomCapacity) => {
    dispatch(
      setClassesInfo({
        field: 'classroomCapacityId',
        value: selectedClassroomCapacity.value,
      })
    );
    setClassroomCapacityState(selectedClassroomCapacity);
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
      createClassroom({ data: classesInfo }),
      () => {
        setAlertInfo({
          show: true,
          status: 'success',
          message: 'Classroom has been created.',
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
          message: 'Classroom Create failed. Please try again.',
        });
      }
    );
  };
  return (
    <>
      <div className="bg-sky-lighter -mt-5 rounded w-full h-fit">
        <h1 className="text-title2 text-center font-bold">
          Create a Classroom
        </h1>
      </div>
      <div className=" grid grid-cols-2 overflow-hidden h-full">
        <div className="border-r-2">
          <div className="flex flex-row m-10  items-center">
            <Text className=" self-center  ">Name:</Text>
            <Input
              className=" ml-4"
              name="name"
              id="name"
              onChange={(e) => {
                handleChangeClassesInfo(e.target.name, e.target.value);
              }}
              value={classesInfo?.name}
            />
          </div>
        </div>
        <div>
          <div className="flex flex-row m-10  ">
            <Text className=" self-center  ">Type Of Class:</Text>
            <SearchableSelectBox
              className=" ml-4"
              showDefault={true}
              name="classroomTypeId"
              id="classroomTypeId"
              onSelect={handleTypeSelect}
              inputValue={typeSearch}
              onChange={setTypeSearch}
              items={filterSearch(typeSearch, classroomType?.data)}
            />
          </div>
          <div className="flex flex-row m-10  ">
            <Text className=" self-center  ">Capacity Of the Class:</Text>
            <SelectBox
              className=" ml-4"
              name="classroomCapacity"
              id="classroomCapacity"
              onChange={handleClassroomCapacityChange}
              items={selectBoxItems}
              value={classroomCapacityState}
              selectBar={classroomCapacityState}
            />
          </div>

          <Button
            className="bg-primary w-60 float-right mr-10 "
            textVariant="white"
            text="Devam Et"
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
ApplyClassForm.propTypes = {};
export default ApplyClassForm;
