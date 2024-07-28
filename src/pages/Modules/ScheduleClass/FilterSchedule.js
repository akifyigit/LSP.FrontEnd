import React, { useEffect, useState } from 'react';

import {
  Alert,
  Button,
  SearchableSelectBox,
  SelectBox,
  Text,
} from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useGetClassroomCapacityListQuery,
  useGetClassroomTypeListQuery,
} from 'redux/slices/classes/classroomApi';
import {
  filterInfoSelector,
  setFilterInfo,
} from 'redux/slices/schedule/filterSlice';

const FilterFilter = () => {
  const [typeSearch, setTypeSearch] = useState('');

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const DayItems = days.map((day) => ({
    label: day,
    value: day,
  }));
  const { data: classroomType } = useGetClassroomTypeListQuery();
  const { data: classroomCapacity } = useGetClassroomCapacityListQuery();
  const selectBoxItems = classroomCapacity?.data?.map((item) => ({
    label: item.capacity,
    value: item.id,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filterInfo = useSelector(filterInfoSelector);
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    status: '',
    message: '',
  });
  const [dayState, setDayState] = useState('');
  const [classroomCapacityState, setClassroomCapacityState] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    const isValid = Object.values(filterInfo).every((value) => !!value);
    setIsFormValid(isValid);
  }, [filterInfo]);
  const handleDayChange = (selectedDay) => {
    dispatch(
      setFilterInfo({
        field: 'day',
        value: selectedDay.value,
      })
    );
    setDayState(selectedDay);
  };
  const handleTypeSelect = (classroomTypeId) => {
    dispatch(
      setFilterInfo({
        field: 'classroomTypeId',
        value: classroomTypeId.value,
      })
    );
    setTypeSearch(classroomTypeId.label);
  };

  const handleClassroomCapacityChange = (selectedClassroomCapacity) => {
    dispatch(
      setFilterInfo({
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
  const startTimes = Array.from({ length: 13 }, (_, i) => ({
    label: i + 8,
    value: i + 8,
  })); // [{ label: 8, value: 8 }, { label: 9, value: 9 }, ..., { label: 20, value: 20 }]
  const [selectedStartTime, setSelectedStartTime] = useState({
    label: '',
    value: '',
  });
  const [selectedEndTime, setSelectedEndTime] = useState({
    label: '',
    value: '',
  });
  const [endTimes, setEndTimes] = useState([]);

  const handleStartTimeChange = (startHour) => {
    console.log(startHour.value);
    const startTime = parseInt(startHour.value);
    setSelectedStartTime(startHour);
    const newEndTimes = Array.from({ length: 4 }, (_, i) => ({
      label: startTime + i + 1,
      value: startTime + i + 1,
    })).filter((time) => time.value <= 20); // Filter to ensure end times do not exceed 20
    dispatch(
      setFilterInfo({
        field: 'startHour',
        value: startHour.value,
      })
    );
    setEndTimes(newEndTimes);
  };
  const handleEndTimeChange = (endHour) => {
    dispatch(
      setFilterInfo({
        field: 'endHour',
        value: endHour.value,
      })
    );
    setSelectedEndTime(endHour);
  };
  const handleButtonClick = () => {
    navigate('/scheduleClass');
  };
  return (
    <>
      {' '}
      <div className="bg-sky-lighter -mt-5 rounded w-full h-fit">
        <h1 className="text-title3 text-center font-bold">
          Filter for the day you want to do the lesson
        </h1>
      </div>
      <div className=" grid grid-cols-2 overflow-hidden h-full">
        <div className="border-r-2">
          <div className="flex flex-row m-10  ">
            <Text className=" self-center  ">Type Of Class:</Text>
            <SearchableSelectBox
              required
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
              required
              className=" ml-4"
              name="classroomCapacity"
              id="classroomCapacity"
              onChange={handleClassroomCapacityChange}
              items={selectBoxItems}
              value={classroomCapacityState}
              selectBar={classroomCapacityState}
            />
          </div>
          <div className="flex flex-row m-10  ">
            <Text className=" self-center  ">Day Of the Class:</Text>
            <SelectBox
              required
              className=" ml-4"
              name="day"
              id="day"
              onChange={handleDayChange}
              items={DayItems}
              value={dayState}
              selectBar={dayState}
            />
          </div>
        </div>
        <div>
          <div className="flex flex-row m-10  ">
            <Text className=" self-center  ">Starting hour Of the Class:</Text>
            <SelectBox
              required
              className=" ml-4"
              name="startHour"
              id="startHour"
              onChange={handleStartTimeChange}
              items={startTimes}
              value={selectedStartTime}
              selectBar={selectedStartTime}
            />
          </div>
          <div className="flex flex-row m-10  ">
            <Text className=" self-center  ">Ending hour Of the Class:</Text>
            <SelectBox
              required
              className=" ml-4"
              name="endHour"
              id="endHour"
              onChange={handleEndTimeChange}
              items={endTimes}
              value={selectedEndTime}
              selectBar={selectedEndTime}
            />
          </div>

          <Button
            className="bg-primary w-60 float-right mr-10 "
            textVariant="white"
            text="Continue"
            disabled={!isFormValid}
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

export default FilterFilter;
