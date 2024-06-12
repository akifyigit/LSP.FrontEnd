import React from 'react';

import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = (props) => {
  const { labels, data } = props;

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return (
    <div className="w-fit h-fit m-8">
      <Pie data={chartData} />
    </div>
  );
};
PieChart.propTypes = {
  labels: PropTypes.string,
  data: PropTypes.any,
};
export default PieChart;
