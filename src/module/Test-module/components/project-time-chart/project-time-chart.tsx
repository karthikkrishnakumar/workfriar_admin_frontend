"use client"
import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/charts';
import axios from 'axios';
import styles from './project-time-chart.module.scss';

interface ChartData {
  project: string; // Project names for the x-axis (bottom)
  hours: number;   // Hours spent for the y-axis (vertical)
}

const DynamicChart: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/dashboard/project-time-chart');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Column chart configuration
  const config = {
    data,
    xField: 'project',  
    yField: 'hours',    
    columnWidthRatio: 0.5,
    xAxis: {
      title: {
        text: 'Projects',
        style: { fontSize: 12, color: 'var(--secondary-font-color-dark)' },
      },
      label: {
        className: styles.axisLabel,
        autoHide: false, // Ensure all project names are visible
      },
      line: {
        className: styles.axisLine,
      },
    },
    yAxis: {
      title: {
        text: 'Time Spent (hours)',
        style: { fontSize: 12, color: 'var(--secondary-font-color-dark)' },
      },
      label: {
        className: styles.axisLabel,
        formatter: (value: number) => `${value} hr`, // Append "hr" to hours
      },
      line: {
        className: styles.axisLine,
      },
    },
    legend: false,
    interactions: [{ type: 'active-region' }],
    animation: {
      appear: {
        animation: 'scale-in-y', // Grow bars from bottom to top
        duration: 800,
      },
    },
    columnStyle: {
      fill: '#FFD700',
      radius: [4, 4, 0, 0], // Rounded top edges of the columns
    },
  };

  if (loading) {
    return <div className={styles.loader}>Loading chart data...</div>;
  }

  if (data.length === 0) {
    return <div className={styles.noData}>No data available to display</div>;
  }

  return (
    <div className={styles.chartContainer}>
      <Column {...config} className={styles.column}/>
    </div>
  );
};

export default DynamicChart;