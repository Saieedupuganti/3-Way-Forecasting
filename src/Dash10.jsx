import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Dash10 = () => {
  const colors = Highcharts.getOptions().colors;

  // Data for the pie chart
  const financialData = [
    {
      name: 'Bank Account',
      y: 57000,
      drilldown: {
        name: 'Bank Account',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [5000, 5200, 5300, 5100, 4900, 4800, 4700, 4900, 5100, 5300, 5500, 5700]
      }
    },
    {
      name: 'Accounts Receivable',
      y: 156200,
      drilldown: {
        name: 'Accounts Receivable',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [12000, 12200, 12400, 12600, 12800, 13000, 13200, 13400, 13600, 13800, 14000, 14200]
      }
    },
    {
      name: 'Inventory',
      y: 52200,
      drilldown: {
        name: 'Inventory',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [4000, 4200, 4300, 4400, 4500, 4600, 4700, 4800, 4900, 5000, 5100, 5200]
      }
    },
    {
      name: 'Buildings',
      y: 360000,
      drilldown: {
        name: 'Buildings',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000]
      }
    },
    {
      name: 'Bank Loan',
      y: 186200,
      drilldown: {
        name: 'Bank Loan',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [15000, 15200, 15400, 15600, 15800, 16000, 16200, 16400, 16600, 16800, 17000, 17200]
      }
    },
    {
      name: 'Sales A',
      y: 606000,
      drilldown: {
        name: 'Sales A',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [45000, 46000, 47000, 48000, 49000, 50000, 51000, 52000, 53000, 54000, 55000, 56000]
      }
    },
    {
      name: 'Sales B',
      y: 222400,
      drilldown: {
        name: 'Sales B',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [18000, 18200, 18400, 18600, 18800, 19000, 19200, 19400, 19600, 19800, 20000, 20200]
      }
    },
    {
      name: 'Purchases',
      y: 98700,
      drilldown: {
        name: 'Purchases',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [8000, 8200, 8400, 8600, 8800, 9000, 9200, 9400, 9600, 9800, 10000, 10200]
      }
    }
  ];

  // Prepare data for drilldowns
  const drilldownSeries = financialData.map(item => ({
    name: item.name,
    id: item.name,
    data: item.drilldown.data.map((value, index) => ({
      name: item.drilldown.categories[index],
      y: value
    }))
  }));

  // Highcharts configuration options
  const chartOptions = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Financial Data Breakdown',
      align: 'left'
    },
    subtitle: {
      text: 'Source: Internal Financial Records',
      align: 'left'
    },
    tooltip: {
      pointFormat: '${point.y:.2f}'
    },
    plotOptions: {
      pie: {
        shadow: false,
        center: ['50%', '50%'],
        showInLegend: true
      }
    },
    series: [{
      name: 'Financial Data',
      colorByPoint: true,
      data: financialData.map(item => ({
        name: item.name,
        y: item.y,
        drilldown: item.name
      }))
    }],
    drilldown: {
      series: drilldownSeries
    }
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
    />
  );
};

export default Dash10;
