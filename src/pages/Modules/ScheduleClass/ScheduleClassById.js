import React, { useEffect, useState } from 'react';

import {
  Alert,
  Button,
  Input,
  SearchableSelectBox,
  SelectBox,
  Text,
} from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetClassroomsByIdQuery } from 'redux/slices/classes/classroomApi';
import {
  useCreateScheduleMutation,
  useGetlectureListQuery,
} from 'redux/slices/schedule/scheduleApi';
import {
  scheduleInfoSelector,
  setScheduleInfo,
} from 'redux/slices/schedule/scheduleSlice';
import { apiResHandler } from 'utils/axiosBaseQuery';
// import { apiResHandler } from 'utils/axiosBaseQuery';

const ScheduleClassById = () => {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const selectBoxItems = days.map((day) => ({
    label: day,
    value: day,
  }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useParams();
  const { data: classroomName } = useGetClassroomsByIdQuery(id);
  const { data: lecture } = useGetlectureListQuery();
  const [createSchedule] = useCreateScheduleMutation();
  const scheduleInfo = useSelector(scheduleInfoSelector);
  console.log(scheduleInfo);
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    status: '',
    message: '',
  });
  useEffect(() => {
    if (id) {
      dispatch(
        setScheduleInfo({
          field: 'classroomId',
          value: parseInt(id?.id),
        })
      );
    }
  }, [dispatch, id]);
  const [dayState, setDayState] = useState('');

  const handleDayChange = (selectedDay) => {
    dispatch(
      setScheduleInfo({
        field: 'day',
        value: selectedDay.value,
      })
    );
    setDayState(selectedDay);
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
  const [lectureSearch, setLectureSearch] = useState('');

  const handleStartTimeChange = (startHour) => {
    const startTime = parseInt(startHour.value);
    setSelectedStartTime(startHour);
    const newEndTimes = Array.from({ length: 4 }, (_, i) => ({
      label: startTime + i + 1,
      value: startTime + i + 1,
    })).filter((time) => time.value <= 20); // Filter to ensure end times do not exceed 20
    dispatch(
      setScheduleInfo({
        field: 'startHour',
        value: startHour.value,
      })
    );
    setEndTimes(newEndTimes);
  };
  const handleEndTimeChange = (endHour) => {
    dispatch(
      setScheduleInfo({
        field: 'endHour',
        value: endHour.value,
      })
    );
    setSelectedEndTime(endHour);
  };
  const handleButtonClick = () => {
    apiResHandler(
      createSchedule({ data: scheduleInfo }),
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
        console.error('Login failed:', error);
        setAlertInfo({
          show: true,
          status: 'error',
          message: 'Classroom Create failed. Please try again.',
        });
      }
    );
  };
  const handleLectureSelect = (lectureId) => {
    dispatch(
      setScheduleInfo({
        field: 'lectureId',
        value: lectureId.value,
      })
    );
    setLectureSearch(lectureId.label);
  };
  return (
    <>
      <div className=" grid grid-cols-2 overflow-hidden h-full">
        <div className="border-r-2">
          <div className="flex flex-row m-10  items-center">
            <Text className=" self-center  ">Name of the Class:</Text>
            <Input
              disabled
              className=" ml-4"
              name="name"
              id="name"
              value={classroomName?.data?.name}
            />
          </div>

          <div className="flex flex-row m-10  ">
            <Text className=" self-center  ">Name Of the Lecture:</Text>
            <SearchableSelectBox
              className=" ml-4"
              showDefault={true}
              name="lectureId"
              id="lectureId"
              onSelect={handleLectureSelect}
              inputValue={lectureSearch}
              onChange={setLectureSearch}
              items={filterSearch(lectureSearch, lecture?.data)}
            />
          </div>
        </div>
        <div>
          {' '}
          <div className="flex flex-row m-10  ">
            <Text className=" self-center  ">Day Of the Class:</Text>
            <SelectBox
              className=" ml-4"
              name="day"
              id="day"
              onChange={handleDayChange}
              items={selectBoxItems}
              value={dayState}
              selectBar={dayState}
            />
          </div>
          <div className="flex flex-row m-10  ">
            <Text className=" self-center  ">Starting hour Of the Class:</Text>
            <SelectBox
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
ScheduleClassById.propdays = {};
export default ScheduleClassById;
