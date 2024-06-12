import React from 'react';

import { useGetScheduleListQuery } from 'redux/slices/schedule/scheduleApi';

const ScheduleList = () => {
  const { data: schedulesList, isLoading } = useGetScheduleListQuery();

  // Check if schedulesList is not an array
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      {schedulesList.data.map((schedule) => (
        <>
          <div className="bg-sky-lightest hover:bg-sky-light  m-2 border-2 border-sky rounded-lg  p-4">
            <div
              key={schedule.id}
              className=" rounded-lg p-4  shadow-md mb-4 w-fit"
            >
              <h2 className="text-lg font-bold mb-2">
                {schedule.classroomName}
              </h2>
              <p className="font-medium mb-1">{schedule.lectureName}</p>
              <p className="font-medium mb-1">{schedule.day}</p>
              <p className="font-medium">
                Time: {schedule.startHour} - {schedule.endHour}
              </p>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default ScheduleList;
