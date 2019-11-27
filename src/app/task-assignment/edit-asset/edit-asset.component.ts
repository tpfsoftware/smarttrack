import { Component, Inject,OnInit } from '@angular/core';
import {  MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import {AppUrlServiceService} from '../../app-url-service.service';
import {AppServiceService} from '../../app-service.service';
import * as _ from 'underscore';
@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.scss']
})
export class EditAssetComponent implements OnInit {
  bayTypes:any=[];
  baggage:any=[];
  catering:any=[];
  ladder:any=[];
  buses:any=[]
  mode:any;
  bays:string;
  bayName:any;
  load:any;
  truck:any;
  equip:any;
  bagSel:boolean=false;
  catSel:boolean=false;
  ladSel:boolean=false;
  busSel:boolean=false;
  editRow:any;
  constructor( private dialogRef: MatDialogRef<EditAssetComponent>,@Inject(MAT_DIALOG_DATA) public details: any,private appUrl:AppUrlServiceService,private services:AppServiceService) {
   this.editRow= this.details.bayDet;
   console.log(this.editRow)
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
       let final_list:any;
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
    console.log(this.baggage,"bags")
  }
  bagSelect(e:any){
    this.bagSel=true;
console.log(e,"event")
this.equip=e;
console.log(this.equip)
  }
  catSelect(e:any){
    this.catSel=true;
console.log(e,"event")
this.equip=e;
console.log(this.equip)
  }
  ladSelect(e:any){
    this.ladSel=true;
console.log(e,"event")
this.equip=e;
console.log(this.equip)
  }
  busSelect(e:any){
    this.busSel=true;
console.log(e,"event")
this.equip=e;
console.log(this.equip)
  }
  cancel(){
    this.dialogRef.close();
  }
  done(){
     this.dialogRef.close('RELOAD');
  console.log(this.mode);
  console.log(this.editRow.bay_id);
  console.log(this.equip)
  let equip_update:any={"name":'',"bay_id":''};
  console.log(equip_update)
  equip_update.name=this.equip;
  equip_update.bay_id=this.editRow.bay_id;
  console.log(equip_update)
  this.services.create(this.appUrl.geturlfunction('BAY_EQUIP_UPDATE'),equip_update).subscribe(res => {
    console.log(res)
  })
    // this.dialogRef.close();
  }

}
