import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Dash8 = () => {
  useEffect(() => {
    if (!Highcharts.Point.prototype.addLabelOnClick) {
      Highcharts.Point.prototype.addLabelOnClick = function () {
        const point = this;
        const chart = point.series.chart;

        if (point.series.options.className.indexOf('popup-on-click') !== -1) {
          const date = Highcharts.dateFormat('%A, %b %e, %Y', point.x);
          const text = `<b>${date}</b><br/>${point.y} ${point.series.name}`;

          const anchorX = point.plotX + point.series.xAxis.pos;
          const anchorY = point.plotY + point.series.yAxis.pos;
          const align = anchorX < chart.chartWidth - 200 ? 'left' : 'right';
          const x = align === 'left' ? anchorX + 10 : anchorX - 10;
          const y = anchorY - 30;

          if (!chart.stickyLabel) {
            chart.stickyLabel = chart.renderer
              .label(text, x, y, 'callout', anchorX, anchorY)
              .attr({
                align,
                fill: 'rgba(0, 0, 0, 0.75)',
                padding: 10,
                zIndex: 7 // Above series, below tooltip
              })
              .css({
                color: 'white'
              })
              .on('click', function () {
                chart.stickyLabel = chart.stickyLabel.destroy();
              })
              .add();
          } else {
            chart.stickyLabel
              .attr({ align, text })
              .animate({ anchorX, anchorY, x, y }, { duration: 250 });
          }
        }
      };
    }

    // Cleanup function
    return () => {
      if (Highcharts.Point.prototype.addLabelOnClick) {
        delete Highcharts.Point.prototype.addLabelOnClick;
      }
    };
  }, []);

  const options = {
    chart: {
      type: 'line',
      scrollablePlotArea: {
        minWidth: 700
      },
      events: {
        click: function () {
          if (this.stickyLabel) {
            this.stickyLabel = this.stickyLabel.destroy();
          }
        }
      }
    },
    title: {
      text: 'Daily sessions at www.highcharts.com',
      align: 'left'
    },
    subtitle: {
      text: 'Source: Google Analytics',
      align: 'left'
    },
    xAxis: {
      type: 'datetime',
      tickInterval: 7 * 24 * 3600 * 1000, // one week
      tickWidth: 0,
      gridLineWidth: 1,
      labels: {
        align: 'left',
        x: 3,
        y: -3
      }
    },
    yAxis: [{ // left y axis
      title: {
        text: null
      },
      labels: {
        align: 'left',
        x: 3,
        y: 16,
        format: '{value:.,0f}'
      },
      showFirstLabel: false
    }, { // right y axis
      linkedTo: 0,
      gridLineWidth: 0,
      opposite: true,
      title: {
        text: null
      },
      labels: {
        align: 'right',
        x: -3,
        y: 16,
        format: '{value:.,0f}'
      },
      showFirstLabel: false
    }],
    legend: {
      align: 'left',
      verticalAlign: 'top',
      borderWidth: 0
    },
    tooltip: {
      shared: true,
      crosshairs: true
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        className: 'popup-on-click',
        marker: {
          lineWidth: 1
        },
        point: {
          events: {
            click: function () {
              this.addLabelOnClick();
            }
          }
        }
      }
    },
    series: [{
      name: 'All sessions',
      data: [
        [Date.UTC(2024, 0, 1), 100],
        [Date.UTC(2024, 0, 2), 150],
        [Date.UTC(2024, 0, 3), 200],
        [Date.UTC(2024, 0, 4), 250],
        [Date.UTC(2024, 0, 5), 300]
        // Add more data points as needed
      ],
      lineWidth: 4,
      marker: {
        radius: 4
      }
    }, {
      name: 'New users',
      data: [
        [Date.UTC(2024, 0, 1), 50],
        [Date.UTC(2024, 0, 2), 70],
        [Date.UTC(2024, 0, 3), 90],
        [Date.UTC(2024, 0, 4), 110],
        [Date.UTC(2024, 0, 5), 130]
        // Add more data points as needed
      ]
    }]
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default Dash8;
