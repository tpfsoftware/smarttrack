import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { MatDialog } from "@angular/material";
import {AddAssetComponent} from './add-asset/add-asset.component'
import {EditAssetComponent} from './edit-asset/edit-asset.component';
import {AppUrlServiceService} from '../app-url-service.service';
import {AppServiceService} from '../app-service.service';
import * as _ from 'underscore';
@Component({
  selector: 'app-task-assignment',
  templateUrl: './task-assignment.component.html',
  styleUrls: ['./task-assignment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskAssignmentComponent implements OnInit {
  bayTypes:any=[];
  baggage:any=[];
  catering:any=[];
  ladder:any=[];
  buses:any=[];
  fullList:any[]=[];
  constructor(private dialog:MatDialog,private appUrl:AppUrlServiceService,private services:AppServiceService) { }

  ngOnInit() {
    this.getMaster();
  }
  getMaster(){
    this.services.getAll(this.appUrl.geturlfunction('BAY_EQUIP_LIST')).subscribe(res => {
      if (res.status === true) {
        console.log("task assign",res.data)
        this.fullList=res.data.equipment_new;      
      }
    })
  }
  edit(datas:any){
    const modalRef = this.dialog.open(EditAssetComponent, {
      position: {
          right: '0',
      },
      minHeight: '60vh',
      width: '400px',
      maxHeight: '100vh',
      panelClass: 'editFlight',
      data: {
          mode: 'EDIT',
          bayDet:datas
      },

  });
  modalRef.afterClosed().subscribe(result => {
    if (result !== undefined) {
      this.getMaster();
    }
});
  }
  add(){
    const modalRef = this.dialog.open(AddAssetComponent, {
      position: {
          right: '0',
      },
      minHeight: '60vh',
      width: '400px',
      maxHeight: '100vh',
      panelClass: 'addNewflight',
      data: {
          mode: 'ADD',
      },

  });
  modalRef.afterClosed().subscribe(result => {
    console.log("after closed",result)
      if (result !== undefined) {
        this.getMaster();
      }
  });
  }
}
