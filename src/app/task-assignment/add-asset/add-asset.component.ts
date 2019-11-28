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
  bays:string;
  bayName:any;
  load:any;
  truck:any;
  equip:any;
  bagSel:boolean=false;
  catSel:boolean=false;
  ladSel:boolean=false;
  busSel:boolean=false;
  noBag:boolean=false;
  noCat:boolean=false;
  noLad:boolean=false;
  noBus:boolean=false;

  constructor( private dialogRef: MatDialogRef<AddAssetComponent>,@Inject(MAT_DIALOG_DATA) public details: any,private appUrl:AppUrlServiceService,private services:AppServiceService) {
    // console.log(details)
    this.mode=this.details.mode;
   }

  ngOnInit() {
    this.getMaster();
  }
  getMaster(){
    this.services.getAll(this.appUrl.geturlfunction('BAY_EQUIP_LIST')).subscribe(res => {
      if (res.status === true) {
        // console.log(res.data)
        let b_id=res.data.bay;
        
        // console.log(res.data.equipment)
        let list=[]
        list=res.data.equipment
        // console.log(list)
       let final_list:any;
       let listAll=[];
      
        final_list=_.each(list,function(obj){
          if(obj.bay_id==null){
            // console.log("in",obj)
listAll.push(obj)
          }
        })
        let equi_list = list.filter(li => li.bay_id != null)
        // console.log(equi_list)
        let result1=b_id;
        let result2=equi_list;
        var result = result1.filter(function(o1){
          // console.log(o1)
          // filter out (!) items in result2
          return !result2.some(function(o2){
            // console.log(o2)
              return o1.name === o2.bay_id;          // assumes unique id
          });
      })
        // console.log(result)
        this.bayTypes=result;
       let truck_bag= _.findWhere(listAll, (({name: "Baggage"})?({name: "Baggage"}):[]));
       if(truck_bag!=undefined){
        this.baggage.push(truck_bag.name)
        // console.log(this.baggage);
        this.noBag=true;
       }else{
        this.noBag=false;
       }
    //  let fil_bay=
       let cat= _.findWhere(listAll, (({name: "Catering"})?({name: "Catering"}):[]));
if(cat!=undefined){
  this.catering.push(cat.name)
  // console.log(this.catering)
  this.noCat=true;
}else{
this.noCat=false
}
       
       let step= _.findWhere(listAll, (({name: "Step Ladder"})?({name: "Step Ladder"}):[]));
       if(step!=undefined){
        this.ladder.push(step.name)
        // console.log(this.ladder)
        this.noLad=true;
      }else{
        this.noLad=false;
      }
       
       let bu= _.findWhere(listAll, (({name: "Bus"})?({name: "Bus"}):[]));
       if(bu!=undefined){
        this.buses.push(bu.name)
        // console.log(this.buses)
        this.noBus=true;
       }else{
        this.noBus=false;
       }
       
      }
    })
  }
  bagSelect(e:any){
    this.bagSel=true;
// console.log(e,"event")
this.equip.push(e);
// console.log(this.equip)
  }
  catSelect(e:any){
    this.catSel=true;
// console.log(e,"event")
this.equip.push(e);
// console.log(this.equip)
  }
  ladSelect(e:any){
    this.ladSel=true;
// console.log(e,"event")
this.equip.push(e);
// console.log(this.equip)
  }
  busSelect(e:any){
    this.busSel=true;
// console.log(e,"event")
this.equip.push(e);
// console.log(this.equip)
  }
  cancel(){
    this.dialogRef.close();
  }
  modList(data:any){
// console.log(data)
this.bayName=data
  }
  add(){
    this.dialogRef.close('RELOAD');
    // console.log(this.mode);
    // console.log(this.bayName);
    // console.log(this.equip)
    let equip_update:any={"name":[],"bay_id":''};
    // console.log(equip_update)
    equip_update.name=this.equip;
    equip_update.bay_id=this.bayName;
    // console.log(equip_update)
    let clear_det=equip_update.bay_id;
    this.services.create(this.appUrl.geturlfunction('CLEAR_DATA'),clear_det).subscribe(res => {
      // console.log(res)
      if(res.status==true){
         this.services.create(this.appUrl.geturlfunction('BAY_EQUIP_UPDATE'),equip_update).subscribe(res => {
    // console.log(res)
  })
      }
    })
  }
  
}
