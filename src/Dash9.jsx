import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Venn from 'highcharts/modules/venn';
Venn(Highcharts);

const Dash9 = () => {
  const chartOptions = {
    tooltip: {
      headerFormat: '',
      pointFormat: '' +
          '{#if (eq 1 point.sets.length)}' +
              'Item:<br><b>{point.sets.0}</b>' +
          '{else}' +
              'Items:<br>' +
              '{#each point.sets}' +
                  '<b>{this}</b>{#unless @last} and {/unless}' +
              '{/each}<br><br>' +
              'Shared components:<br>' +
              '<b>{point.name}</b><br>' +
          '{/if}'
    },
    series: [{
      type: 'venn',
      colors: [
          'rgb(180, 210, 255)',
          'rgb(180, 255, 210)',
          'rgb(180, 235, 235)',
          'rgb(200, 200, 200)',
          'rgb(170, 230, 250)',
          'rgb(170, 250, 230)',
          'rgb(170, 240, 240)',
          'rgb(190, 190, 190)',
          'rgb(160, 220, 245)',
          'rgb(160, 245, 220)'
      ],
      data: [{
          sets: ['Bank Account'],
          value: 12,
          name: 'Bank Account'
      }, {
          sets: ['Accounts Receivable'],
          value: 24,
          name: 'Accounts Receivable'
      }, {
          sets: ['Inventory'],
          value: 10,
          name: 'Inventory'
      }, {
          sets: ['Buildings'],
          value: 20,
          name: 'Buildings'
      }, {
          sets: ['Bank Loan'],
          value: 15,
          name: 'Bank Loan'
      }, {
          sets: ['Sales A'],
          value: 22,
          name: 'Sales A'
      }, {
          sets: ['Sales B'],
          value: 14,
          name: 'Sales B'
      }, {
          sets: ['Purchases'],
          value: 8,
          name: 'Purchases'
      }, {
          sets: ['Bank Account', 'Accounts Receivable'],
          value: 6,
          name: 'Shared components'
      }, {
          sets: ['Inventory', 'Bank Loan'],
          value: 4,
          name: 'Shared components'
      }, {
          sets: ['Buildings', 'Sales A'],
          value: 5,
          name: 'Shared components'
      }, {
          sets: ['Sales B', 'Purchases'],
          value: 3,
          name: 'Shared components'
      }]
    }],
    title: {
      text: 'Financial Data Relationships'
    },
    subtitle: {
      text: 'Venn Diagram showing the relationships between financial items'
    },
    accessibility: {
      point: {
          valueDescriptionFormat: '' +
              '{#if (eq 1 point.sets.length)}' +
                  'Item: {point.sets.0}' +
              '{else}' +
                  'Items: ' +
                  '{#each point.sets}' +
                      '{this}{#unless @last} and {/unless}' +
                  '{/each}' +
                  ', Shared components: ' +
                  '{point.name}' +
              '{/if}'
      },
      series: {
          describeSingleSeries: true,
          descriptionFormat: 'Venn diagram with ' +
              '{series.points.length} relations.'
      }
    }
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
    />
  );
};

export default Dash9;
