import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnInit {
  constructor() { }
  equipUsage: any;
  public lineChartColors = [
    { 
      backgroundColor: '#e8f7fb',
      borderColor: '#50e3c2',
      pointBackgroundColor: '#e8f7fb',
      pointBorderColor: '#50e3c2',
      pointHoverBackgroundColor: '#50e3c2',
      pointHoverBorderColor: '#50e3c2'
    },
    { 
      backgroundColor: '#e4f2fc',
      borderColor: '#4285f4',
      pointBackgroundColor: '#e4f2fc',
      pointBorderColor: '#4285f4',
      pointHoverBackgroundColor: '#4285f4',
      pointHoverBorderColor: '#4285f4'
    }
  ];

  lineChartOptions = {
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    cutoutPercentage: 70,
    legend: {
      display: false,
      position: 'bottom'
    }
  };

  public lineChartLegend = false;
  public lineChartType = 'line';
  departmentChartOptions: any = Object.assign({
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          color: '#fff',
          zeroLineColor: '#fff'
        },
        barPercentage: 0.5,
        scaleLabel: {
          display: true,
          labelString: 'EQUIPMENTS',
          fontColor: '#606060'
        },
        ticks: {
          fontColor: '#606060'
        }
      }],
      yAxes: [{ 
        id: 'yAxes1',
        gridLines: {
          color: '#fff',
          zeroLineColor: '#fff'
        },
        scaleLabel: {
          display: true,
          labelString: 'HOUR',
          fontColor: '#606060'
        },
        ticks: {
          beginAtZero: true,
          fontColor: '#50e3c2',
        },
        position: 'left'
      },
      {
        id: 'yAxes2',
        gridLines: {
          color: '#fff',
          zeroLineColor: '#fff'
        },
        scaleLabel: {
          display: true,
          labelString: 'SESSION',
          fontColor: '#606060'
        },
        ticks: {
          beginAtZero: true,
          fontColor: '#4285f4'
        },
        position: 'right'
      }
      ]
    }
  }, this.lineChartOptions);

  public lineChartData: ChartDataSets[] = [
    { data: [16, 29, 38, 58], label: 'Hours',lineTension: 0, yAxisID: 'yAxes1' },
    { data: [3, 7, 6, 9], label: 'Session' ,lineTension: 0, yAxisID: 'yAxes2'}
  ];
  public lineChartsLabels: Label[] = ['Baggage truck','Catering','Bus','Step Ladder'];

  ngOnInit() {
    this.equipUsage = [{ icon: 'assets/insights/chart1.svg', value: 23 }, { icon: 'assets/insights/chart2.svg', value: 32 }, { icon: 'assets/insights/chart3.svg', value: 83 }, { icon: 'assets/insights/chart4.svg', value: 43 }]
  }

}
