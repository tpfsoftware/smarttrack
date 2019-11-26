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
        console.log(res.data)
        // this.bayTypes=res.data.bay;
        // console.log(this.bayTypes)
        let list=[]
        list=res.data.equipment;
        console.log(list)
       let final_list=[];  
       let filtered: any[] = [];
        final_list=_.each(list,function(obj){
          if(obj.bay_id!=null){
            console.log("in",obj)
            filtered.push(obj); 
            }
        })
        
        let arr=res.data.bay;
        let final_arr: any[] = []; 
        for(let i=0;i<arr.length;i++){
          for(let j=0;j<filtered.length;j++){
            if(arr[i].name===filtered[j].bay_id){
              console.log("ind",arr[i])
              filtered[j].org=arr[i].origin;
              filtered[j].a_flt=arr[i].arrival_flight_no;
              filtered[j].des=arr[i].destination;
              filtered[j].d_flt=arr[i].departure_flight_no;
              // filtered.push({"org":arr[i].origin,"a_flt":arr[i].arrival_flight_no,"des":arr[i].destination,"d_flt":arr[i].departure_flight_no})
            }
          }
        }
        console.log(filtered)
        this.fullList=filtered;

//        let truck_bag= _.findWhere(listAll, (({name: "Baggage"})?({name: "Baggage"}):[]));
//        if(truck_bag!=undefined){
//         this.baggage.push(truck_bag.name)
//        }
     
//        let cat= _.findWhere(listAll, (({name: "Catering"})?({name: "Catering"}):[]));
// if(cat!=undefined){
//   this.catering.push(cat.name)
// }
       
//        let step= _.findWhere(listAll, (({name: "Step Ladder"})?({name: "Step Ladder"}):[]));
//        if(step!=undefined){
//         this.ladder.push(step.name)
//       }
       
//        let bu= _.findWhere(listAll, (({name: "Bus"})?({name: "Bus"}):[]));
//        if(bu!=undefined){
//         this.buses.push(bu.name)
//        }
       
      }
    })
  }
  edit(){
    console.log("clicked");
    const modalRef = this.dialog.open(EditAssetComponent, {
      position: {
          right: '0',
      },
      // minHeight: '96vh',
      width: '400px',
      maxHeight: '100vh',
      panelClass: 'addNewflight',
      data: {
          mode: 'ADD',
      },

  });
  modalRef.afterClosed().subscribe(result => {
      // this.timeline.off('select', function(){});
  });
  }
  add(){
    console.log("clicked");
    const modalRef = this.dialog.open(AddAssetComponent, {
      position: {
          right: '0',
      },
      // minHeight: '96vh',
      width: '400px',
      maxHeight: '100vh',
      panelClass: 'addNewflight',
      data: {
          mode: 'ADD',
      },

  });
  modalRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result !== undefined) {
        this.getMaster();
      }
  });
  }
}
