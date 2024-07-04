import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables, ChartOptions } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'chartjs-adapter-date-fns';
import testDayData from './dayData';
import testHourData from './hourData';
import stackedAreaData from './stackedAreaData';

const testPieData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [300, 50, 100, 40, 120],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      hoverOffset: 4,
    },
  ],
};


Chart.register(...registerables);

interface DataPoint {
  date: string;
  value: number;
}

interface LineGraphProps {
  data: DataPoint[];
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  const [startDate, setStartDate] = useState<Date>(new Date('2024-07-01'));
  const [endDate, setEndDate] = useState<Date>(new Date('2024-07-04'));
  const [filteredData, setFilteredData] = useState<DataPoint[]>([]);

  useEffect(() => {
    // Filter the data based on the selected date range
    const filtered = data.filter(
      item => new Date(item.date) >= startDate && new Date(item.date) <= endDate
    );
    setFilteredData(filtered);
  }, [startDate, endDate, data]);

  const chartData = {
    labels: filteredData.map(item => item.date),
    datasets: [
      {
        label: 'Dataset of July-August 2024',
        data: filteredData.map(item => item.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        // fill: true,
        // pointRadius: 0
      },
    ],
  };

  const lineOptions: ChartOptions<'line'> = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'MMM dd, HH:mm',
          },
        },
      },
    },
  };
  const barOptions: ChartOptions<'bar'> = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'MMM dd, HH:mm',
          },
        },
      },
    },
  };

  const stackedChartData = {
    labels: stackedAreaData.map(item => item.date),
    datasets: [
      {
        label: 'Value 1',
        data: stackedAreaData.map(item => item.value1),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.9)', // Area fill color with reduced opacity
        fill: true, // Enable fill
        stack: 'stack1', // Stack identifier
      },
      {
        label: 'Value 2',
        data: stackedAreaData.map(item => item.value2),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.9)', // Area fill color with reduced opacity
        fill: true, // Enable fill
        stack: 'stack1', // Stack identifier
      },
    ],
  };

  const stackedAreaOptions: ChartOptions<'line'> = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'MMM dd, HH:mm', // Display format with day and hour
          },
        },
        grid: {
          display: false, // Remove x-axis grid lines
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Remove y-axis grid lines
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <div>
        <label>From: </label>
        <DatePicker selected={startDate} onChange={date => setStartDate(date as Date)} />
        <label>To: </label>
        <DatePicker selected={endDate} onChange={date => setEndDate(date as Date)} />
      </div>
      <div style={{ height: '400px', width: '1000px' }}>
      <Line data={chartData} options={lineOptions} />
      </div>
      <div style={{ height: '400px', width: '1000px' }}>
      <Bar data={chartData} options={barOptions} />
      </div>
      <div style={{ height: '400px', width: '1000px' }}>
      <Pie data={testPieData} options={{
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }}/>
      </div>
      <div style={{ height: '400px', width: '1000px' }}>
      <Line data={stackedChartData} options={stackedAreaOptions} />
      </div>
    </div>
  );
};

const Test = () => {
  return <LineGraph data={testHourData} />;
};

export default Test;