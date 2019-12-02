import { Component, OnInit } from '@angular/core';
import { MapStyleJson } from '../map-style';
import { AppUrlServiceService } from '../app-url-service.service';
import { AppServiceService } from '../app-service.service';
import * as _ from 'underscore';

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

  assetMarkers: any = [];
  showEquip: boolean = false;
  markers: any = [];
  dupMarkers: any = [];
  value: any;
  selectedBay: any;
  counter: number = 10000;



  constructor(private mapStyle: MapStyleJson, private services: AppServiceService, private AppUrl: AppUrlServiceService) {
    this.mstyles = this.mapStyle.styles;
  }


  ngOnInit() {
    this.initMap('init');

    
    setInterval(() => {
      this.initMap('refresh');
      console.log(this.counter)
    }, this.counter);
  }






  initMap(value) {
    this.services.getAll(this.AppUrl.geturlfunction('BAY_EQUIP_LIST')).subscribe(res => {
      var bays = [], assets = [];
      if (res.status == true) {
        var resTotal = res.data;
        this.counter = resTotal.counter;
        bays = resTotal.bay;
        assets = resTotal.equipment;
        for (let index = 0; index < bays.length; index++) {
          const element = bays[index];
          element.icons = { url: 'assets/dashboard/bay.svg', scaledSize: { height: 30, width: 30 } }
        }

        for (let index = 0; index < assets.length; index++) {
          const element = assets[index];
          element.icons = { url: 'assets/dashboard/' + element.icon + '.svg', scaledSize: { height: 20, width: 20 } }
        }

        if (value == 'init') {
          this.markers = bays;
          this.assetMarkers = assets;
          this.dupMarkers = assets;
        }
        else if (value == 'refresh' && this.showEquip == false) {
          this.assetMarkers = assets;
          this.dupMarkers = assets;
        }
        else if (value == 'refresh' && this.showEquip == true) {
          this.dupMarkers = assets;
          console.log("inside bay  refresh")
          var selectedEquips = [];
          selectedEquips = _.where(this.dupMarkers, { bay_id: this.selectedBay });
          for (let index = 0; index < selectedEquips.length; index++) {
            const element = selectedEquips[index];
            element.icons = { url: 'assets/dashboard/' + element.icon + '-icon.svg', scaledSize: { height: 30, width: 30 } }
          }
          if (selectedEquips.length) {
            this.assetMarkers = selectedEquips;
          }
        }


      }
    })
  }



  closeModal() {
    this.initMap('init');
    this.showEquip = false;
  }


  clickedMarker(value, index) {
    var selectedEquips = [];
    var selectedBays = [];
    this.selectedBay = value;
    selectedEquips = _.where(this.dupMarkers, { bay_id: value });
    for (let index = 0; index < selectedEquips.length; index++) {
      const element = selectedEquips[index];
      element.icons = { url: 'assets/dashboard/' + element.icon + '-icon.svg', scaledSize: { height: 30, width: 30 } }
    }
    selectedBays = _.where(this.markers, { name: value });
    if (selectedEquips.length) {
      this.showEquip = true;
      this.assetMarkers = selectedEquips;
      this.value = selectedBays[0];
    }
    else {
      this.initMap('init');
      this.showEquip = false;
    }

  }
}
