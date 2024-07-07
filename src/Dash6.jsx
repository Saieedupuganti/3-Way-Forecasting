import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Dash6 = () => {
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
        zooming: {
            type: 'xy'
        }
    },
    title: {
        text: 'Financial Data Dashboard',
        align: 'left'
    },
    subtitle: {
        text: 'Source: Internal Financial Data',
        align: 'left'
    },
    xAxis: [{
        categories: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'Amount',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        }
    }, { // Secondary yAxis
        title: {
            text: 'Sales & Purchases',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 60,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || // theme
            'rgba(255,255,255,0.25)'
    },
    series: financialData.map((item, index) => ({
      name: item.name,
      type: (item.name.includes('Sales') || item.name === 'Purchases') ? 'spline' : 'column',
      yAxis: (item.name.includes('Sales') || item.name === 'Purchases') ? 1 : 0,
      data: item.data,
      tooltip: {
          valueSuffix: item.name.includes('Sales') || item.name === 'Purchases' ? ' units' : ' $'
      }
    }))
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
    />
  );
};

export default Dash6;
