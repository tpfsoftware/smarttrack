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
  upDateData:any[];
  constructor(private dialog:MatDialog,private appUrl:AppUrlServiceService,private services:AppServiceService) { }

  ngOnInit() {
    this.getMaster();
  }
  getMaster(){
    this.services.getAll(this.appUrl.geturlfunction('BAY_EQUIP_MAPPING')).subscribe(res => {
      if(res.status==1){
        this.upDateData=res;
        console.log("task assign",res)
        let list=res.result;
       let listAll= list.filter(li => li.name != null)
        console.log(listAll)
        this.fullList=listAll; 
        console.log(this.fullList) 
      }    
    })
  }
  edit(datas:any){
    const modalRef = this.dialog.open(EditAssetComponent, {
      position: {
          right: '15px',
      },
      minHeight: '60vh',
      width: '400px',
      maxHeight: '100vh',
      panelClass: 'editFlight',
      data: {
          mode: 'EDIT',
          bayDet:datas,
          apiData:this.upDateData
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
          right: '15px',
      },
      minHeight: '60vh',
      width: '400px',
      maxHeight: '100vh',
      panelClass: 'addNewflight',
      data: {
          mode: 'ADD',
          apiData:this.upDateData
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
