import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AppUrlServiceService } from '../app-url-service.service';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnInit {
  totalEquip: any;
  equipDetails: any = [];
  equipChart: any = [];
  constructor(private services: AppServiceService, private AppUrl: AppUrlServiceService) { }
  equipUsage: any = [];
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
          labelString: 'HOURS',
          fontColor: '#606060'
        },
        ticks: {
          beginAtZero: true,
          fontColor: '#50e3c2',
          suggestedMax:20
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
          fontColor: '#4285f4',
          suggestedMax:30
        },
        position: 'right'
      }
      ]
    }
  }, this.lineChartOptions);

  public lineChartData = [
    { data: [], label: 'Hours', lineTension: 0, yAxisID: 'yAxes1' },
    { data: [], label: 'Session', lineTension: 0, yAxisID: 'yAxes2' }
  ];
  public lineChartsLabels: Label[] = [];

  ngOnInit() {
    this.getAsset();
  }

  getAsset() {
    this.services.getAll(this.AppUrl.geturlfunction('INSIGHTS')).subscribe(res => {
      if (res.status == true) {
        var data = [], labels = [], data1 = [];
        this.totalEquip = res.totalEquipment;
        this.equipDetails = res.total;
        this.equipUsage = res.usage;
        this.equipChart = res.session[0];

        for (let index = 0; index < this.equipDetails.length; index++) {
          const element = this.equipDetails[index];
          element.icon = 'assets/insights/' + element.name + '.svg'
        }

        for (let index = 0; index < this.equipUsage.length; index++) {
          const element = this.equipUsage[index];
          var value = element.used / element.total * 100;
          console.log(value)
          element.value = value.toFixed(0);
          element.icon = 'assets/insights/pro-' + element.name + '.svg'
        }

        for (let index = 0; index < this.equipChart.length; index++) {
          const element = this.equipChart[index];
          labels.push(element.name)
          data.push(element.hour)
          data1.push(element.count)

        }
        this.lineChartsLabels = labels;
        this.lineChartData[0].data = data1;
        this.lineChartData[1].data = data;
      }
    })
  }


}

