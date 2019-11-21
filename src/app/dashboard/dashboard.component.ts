import { Component, OnInit } from '@angular/core';
import { MapStyleJson } from '../map-style';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mpaths: any = [];
  mstyles: any = [];
  zoom: number = 15.25;
  lng: number = 80.1667154;
  lat: number = 12.991957;
  roadmap = 'roadmap';
  center = { lng: 80.1667154, lat: 12.991957 };
  markers = [{
    lat: 12.99049,
    lng: 80.17648,
    label: 'Bay 1',
    iconUrl: '/assets/dashboard/bay.svg'
  },
  {
    lat: 12.99086,
    lng: 80.17708,
    label: 'Bay 2',
    iconUrl: '/assets/dashboard/bay.svg'

  },
  {
    lat: 12.99127,
    lng: 80.17756,
    label: 'Bay 3',
    iconUrl: '/assets/dashboard/bay.svg'
  }];
  assetMarkers: any = [];



  constructor(private mapStyle: MapStyleJson) {
    this.mstyles = this.mapStyle.styles;
  }

  ngOnInit() {
    this.assetMarkers = [{
      lat: 12.99599,
      lng: 80.16639,
      label: 'Bay 1',
      iconUrl: '/assets/dashboard/bus.svg'
    },
    {
      lat: 12.99816,
      lng: 80.16741,
      label: 'Bay 2',
      iconUrl: '/assets/dashboard/baggage.svg'

    },
    {
      lat: 12.99746,
      lng: 80.16877,
      label: 'Bay 3',
      iconUrl: '/assets/dashboard/catering.svg'
    },
    {
      lat: 12.99646,
      lng: 80.16477,
      label: 'Bay 4',
      iconUrl: '/assets/dashboard/stepladder.svg'
    }];


  }

}
