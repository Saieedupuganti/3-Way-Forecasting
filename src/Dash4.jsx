import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Dash4 = () => {
  const financialData = [
    {
      name: 'Bank Account',
      data: [5000, 5200, 5300, 5100, 4900, 4800, 4700, 4900, 5100, 5300, 5500, 5700]
    },
    {
      name: 'Accounts Receivable',
      data: [12000, 12200, 12400, 12600, 12800, 13000, 13200, 13400, 13600, 13800, 14000, 14200]
    },
    {
        name: 'Inventory',
        data: [4000, 4200, 4300, 4400, 4500, 4600, 4700, 4800, 4900, 5000, 5100, 5200]
    },
    {
        name: 'Buildings',
        data: [30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000]
    },
    {
        name: 'Bank Loan',
        data: [15000, 15200, 15400, 15600, 15800, 16000, 16200, 16400, 16600, 16800, 17000, 17200]
    },
    {
        name: 'Sales A',
        data: [45000, 46000, 47000, 48000, 49000, 50000, 51000, 52000, 53000, 54000, 55000, 56000]
    },
    {
        name: 'Sales B',
        data: [18000, 18200, 18400, 18600, 18800, 19000, 19200, 19400, 19600, 19800, 20000, 20200]
    },
    {
        name: 'Purchases',
        data: [8000, 8200, 8400, 8600, 8800, 9000, 9200, 9400, 9600, 9800, 10000, 10200]
    }
  ];

  const chartOptions = {
    chart: {
      type: 'pie' // Change the chart type to pie
    },
    title: {
      text: 'Financial Breakdown' // Adjust title for pie chart
    },
    tooltip: {
      pointFormat: '{series.name}: {point.y:.1f} ({point.percentage:.1f}%)' // Format tooltip for pie chart
    },
    series: [{
      name: 'Financial Data',
      colorByPoint: true, // Color slices differently
      data: financialData.map(item => ({ // Transform data for pie chart
        name: item.name,
        y: item.data.reduce((acc, val) => acc + val, 0) // Sum data points for pie chart
      }))
    }]
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
    />
  );
};

export default Dash4;
