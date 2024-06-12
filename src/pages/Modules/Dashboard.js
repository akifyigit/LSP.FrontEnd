import React, { useEffect, useState } from 'react';

import { SelectBox, Text } from 'components';
import BarChart from 'components/BarChart';
import PieChart from 'components/PieChart';
import {
  useGetAvaliableClassesQuery,
  useGetEntitiesQuery,
} from 'redux/slices/dashboard/dashboardApi';

const Dashboard = () => {
  const [dayState, setDayState] = useState({
    label: 'Monday',
    value: 'Monday',
  });
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
  const [selectedStartTime, setSelectedStartTime] = useState({
    label: 8,
    value: 8,
  });
  const [selectedEndTime, setSelectedEndTime] = useState({
    label: 12,
    value: 12,
  });
  const [endTimes, setEndTimes] = useState([]);
  const startTimes = Array.from({ length: 13 }, (_, i) => ({
    label: i + 8,
    value: i + 8,
  }));

  const handleStartTimeChange = (startHour) => {
    setSelectedStartTime(startHour);

    const startTime = parseInt(startHour.value);
    const newEndTimes = Array.from({ length: 20 - startTime }, (_, i) => ({
      label: startTime + i + 1,
      value: startTime + i + 1,
    }));

    setEndTimes(newEndTimes);
  };

  const handleEndTimeChange = (endHour) => {
    setSelectedEndTime(endHour);
  };

  const { data: PieChartData, refetch } = useGetAvaliableClassesQuery({
    day: dayState.value || 'Monday',
    start: selectedStartTime.value || 8,
    end: selectedEndTime.value || 12,
  });

  useEffect(() => {
    refetch();
  }, [dayState, selectedStartTime, selectedEndTime]);

  const handleDayChange = (selectedDay) => {
    setDayState(selectedDay);
  };

  const { data: BarChartData } = useGetEntitiesQuery();
  const barChartLabels = BarChartData?.data?.map((item) => item.name) || [];
  const barChartData = BarChartData?.data?.map((item) => item.number) || [];

  return (
    <>
      <div className="bg-sky-lighter -mt-5 rounded w-full h-fit">
        <h1 className="text-title2 text-center font-bold mb-6">Dashboard </h1>
      </div>
      <div className="flex  ">
        <div className="mr-10">
          <div>
            <PieChart
              data={[
                PieChartData?.data?.numberOfAvailables,
                PieChartData?.data?.numberOfUnavailables,
              ]}
              labels={[
                'Number of Available Classes',
                'Number of Unavailable Classes',
              ]}
            />
          </div>
          <div>
            <div className="flex flex-row m-10">
              <Text className="self-center">Day Of the Class:</Text>
              <SelectBox
                className="ml-4"
                name="day"
                id="day"
                onChange={handleDayChange}
                items={DayItems}
                value={dayState}
                selectBar={dayState}
              />
            </div>
            <div className="flex flex-row m-10">
              <Text className="self-center">Starting hour Of the Class:</Text>
              <SelectBox
                className="ml-4"
                name="startHour"
                id="startHour"
                onChange={handleStartTimeChange}
                items={startTimes}
                value={selectedStartTime}
                selectBar={selectedStartTime}
              />
            </div>
            <div className="flex flex-row m-10">
              <Text className="self-center">Ending hour Of the Class:</Text>
              <SelectBox
                className="ml-4"
                name="endHour"
                id="endHour"
                onChange={handleEndTimeChange}
                items={endTimes}
                value={selectedEndTime}
                selectBar={selectedEndTime}
              />
            </div>
          </div>
        </div>
        <BarChart data={barChartData} labels={barChartLabels} />
      </div>
    </>
  );
};

export default Dashboard;
