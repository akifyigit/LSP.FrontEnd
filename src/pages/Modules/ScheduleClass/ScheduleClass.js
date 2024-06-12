import React from 'react';

import { Card } from 'components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetClassroomsQuery } from 'redux/slices/classes/classroomApi';
import { filterInfoSelector } from 'redux/slices/schedule/filterSlice';

const scheduleClass = () => {
  const navigate = useNavigate();
  const filterInfo = useSelector(filterInfoSelector);
  const { data: classrooms = [] } = useGetClassroomsQuery({
    TypeId: filterInfo.classroomTypeId,
    CapacityId: filterInfo.classroomCapacityId,
    Day: filterInfo.day,
    Start: filterInfo.startHour,
    End: filterInfo.endHour,
  });

  console.log(classrooms);
  const handleOnClick = (id) => {
    navigate(`/ScheduleClassById/${id}`);
  };
  return (
    <div className="">
      {' '}
      <div className="bg-sky-lighter -mt-5 rounded w-full h-fit">
        <h1 className="text-title2 text-center font-bold">Classrooms </h1>
      </div>
      <h1 className="text-title3  text-center mb-4 mt-10">
        Select one to continue Scheduling process.
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classrooms.data?.map((classroom) => (
          <Card
            onClick={() => handleOnClick(classroom.id)}
            key={classroom.id}
            className="border border-gray-300 rounded-lg shadow-md p-4 bg-white cursor-pointer"
          >
            <p className="text-xl font-semibold">{classroom.name}</p>
            <p>Type: {classroom.classroomType}</p>
            <p>Capacity: {classroom.classroomCapacity}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default scheduleClass;
