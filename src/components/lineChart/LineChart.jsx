import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({ HistoricalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];
    if (HistoricalData?.prices) {
      HistoricalData.prices.forEach((item) => {
        dataCopy.push([
          `${new Date(item[0]).toLocaleDateString()}`,
          item[1],
        ]);
      });
      setData(dataCopy);
    }
  }, [HistoricalData]); // Correctly wrap the dependency array

  return (
    <Chart
      chartType="LineChart"
      data={data}
      width="100%"
      height="400px" // Set height to a reasonable value
      legendToggle
    />
  );
};

export default LineChart;
