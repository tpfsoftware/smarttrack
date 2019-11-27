import { Component, Inject,OnInit,ViewEncapsulation, ɵConsole } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import {AppUrlServiceService} from '../../app-url-service.service';
import {AppServiceService} from '../../app-service.service';
import * as _ from 'underscore';
@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddAssetComponent implements OnInit {
  bayTypes:any=[];
  baggage:any=[];
  catering:any=[];
  ladder:any=[];
  buses:any=[]
  mode:any;
  constructor( private dialogRef: MatDialogRef<AddAssetComponent>,@Inject(MAT_DIALOG_DATA) public details: any,private appUrl:AppUrlServiceService,private services:AppServiceService) {
    console.log(details)
    this.mode=this.details.mode;
   }

  ngOnInit() {
    this.getMaster();
  }
  getMaster(){
    this.services.getAll(this.appUrl.geturlfunction('BAY_EQUIP_LIST')).subscribe(res => {
      if (res.status === true) {
        console.log(res.data)
        this.bayTypes=res.data.bay;
        console.log(res.data.equipment)
        let list=[]
        list=res.data.equipment
        console.log(list)
       let final_list=[]
       let listAll=[];
      
        final_list=_.each(list,function(obj){
          if(obj.bay_id==null){
            console.log("in",obj)
listAll.push(obj)
          }
        })
        console.log(listAll)
       let truck_bag= _.findWhere(listAll, (({name: "Baggage"})?({name: "Baggage"}):[]));
       if(truck_bag!=undefined){
        this.baggage.push(truck_bag.name)
       }
     
       let cat= _.findWhere(listAll, (({name: "Catering"})?({name: "Catering"}):[]));
if(cat!=undefined){
  this.catering.push(cat.name)
}
       
       let step= _.findWhere(listAll, (({name: "Step Ladder"})?({name: "Step Ladder"}):[]));
       if(step!=undefined){
        this.ladder.push(step.name)
      }
       
       let bu= _.findWhere(listAll, (({name: "Bus"})?({name: "Bus"}):[]));
       if(bu!=undefined){
        this.buses.push(bu.name)
       }
       
      }
    })
  }
  cancel(){
    this.dialogRef.close();
  }
  add(){
    console.log(this.mode);
    // if(this.mode=="ADD"){
      console.log(this.details)
    // }
    // this.dialogRef.close();
  }
  click(){
    console.log("yes")
  }

}
