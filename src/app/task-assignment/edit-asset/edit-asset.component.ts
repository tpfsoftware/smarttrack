import { Component, Inject,OnInit } from '@angular/core';
import {  MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import {AppUrlServiceService} from '../../app-url-service.service';
import {AppServiceService} from '../../app-service.service';
import * as _ from 'underscore';
import { IfStmt } from '@angular/compiler';
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
  equip:any={
    "Baggage":[],
  
    "Catering":[],
    
    "Ladder":[],
    
    "Bus":[]
  }
  bagSel:boolean=false;
  catSel:boolean=false;
  ladSel:boolean=false;
  busSel:boolean=false;
  editRow:any;
  noBag:boolean=false;
  noCat:boolean=false;
  noLad:boolean=false;
  noBus:boolean=false;
  constructor( private dialogRef: MatDialogRef<EditAssetComponent>,@Inject(MAT_DIALOG_DATA) public details: any,private appUrl:AppUrlServiceService,private services:AppServiceService) {
   this.editRow= this.details.bayDet;
   console.log(this.editRow.name)
   this.equipData(this.editRow.name);
   }

  ngOnInit() {
    this.getMaster();
  }
  equipData(data:any){
    console.log(data.Baggage);
    if(data.Baggage.length!=0){
      for(let a=0;a<data.Baggage.length;a++){
        this.equip.Baggage.push(data.Baggage[a].name)
      }
      console.log("Bag",this.equip)
    }
    if(data.Catering.length!=0){
      for(let b=0;b<data.Catering.length;b++){
        this.equip.Catering.push(data.Catering[b].name)
      }
      console.log("cat",this.equip)
    }
    if(data['Step Ladder'].length!=0){
      for(let c=0;c<data['Step Ladder'].length;c++){
        this.equip.Ladder.push(data['Step Ladder'][c].name)
      }
      console.log("lad",this.equip)
    }
    if(data.Bus.length!=0){
      for(let d=0;d<data.Bus.length;d++){
        this.equip.Bus.push(data.Bus[d].name)
      }
      console.log("bus",this.equip)
    }
 
  console.log(this.equip,"initial equip")
}
  getMaster(){
    this.services.getAll(this.appUrl.geturlfunction('BAY_EQUIP_LIST')).subscribe(res => {
      if (res.status === true) {
        // console.log(res.data)
        this.bayTypes=res.data.bay;
        // console.log(res.data.equipment)
        let list=[]
        list=res.data.equipment
        // console.log(list)
       let final_list:any;
       let listAll=[];
      
        final_list=_.each(list,function(obj){
          if(obj.bay_id==null || obj.bay_id ===""){
            // console.log("in",obj)
listAll.push(obj)
          }
        })
        console.log(listAll)
       let truck_bag= _.findWhere(listAll, (({type: "Baggage"})?({type: "Baggage"}):[]));
       console.log(truck_bag)
       if(truck_bag!=undefined){
        this.baggage.push(truck_bag.name)
        console.log(this.baggage)
        this.noBag=true
       }else{
         this.noBag=false
       }
     
       let cat= _.findWhere(listAll, (({type: "Catering"})?({type: "Catering"}):[]));
if(cat!=undefined){
  this.catering.push(cat.name)
  this.noCat=true
  console.log("yes")
}else{
  console.log("no")
  this.noCat=false
}
       
       let step= _.findWhere(listAll, (({type: "Step Ladder"})?({type: "Step Ladder"}):[]));
       if(step!=undefined){
        this.ladder.push(step.name)
        console.log(this.ladder,"yes step")
        this.noLad=true
      }else{
        console.log("no step")
        this.noLad=false
      }
       
       let bu= _.findWhere(listAll, (({type: "Bus"})?({type: "Bus"}):[]));
       if(bu!=undefined){
        this.buses.push(bu.name)
        this.noBus=true
       }else{
         this.noBus=false
       }
       
      }
    })
    // console.log(this.baggage,"bags")
  }
  bagSelect(e:any){
    this.bagSel=true;
// console.log(e,"event")
this.equip.Baggage.push(e);
console.log(this.equip)
  }
  catSelect(e:any){
    this.catSel=true;
console.log(this.equip,"CAT SEL")
this.equip.Catering.push(e);
// console.log(this.equip)
  }
  ladSelect(e:any){
    this.ladSel=true;
// console.log(e,"event")
this.equip.Ladder.push(e);
// console.log(this.equip)
  }
  busSelect(e:any){
    this.busSel=true;
// console.log(e,"event")
this.equip.Bus.push(e);
// console.log(this.equip)
  }
  cancel(){
    this.dialogRef.close();
  }
  done(){
    
  // console.log(this.mode);
  // console.log(this.editRow.bay_id);
  // console.log(this.equip.push(this.editRow.name))
  let equip_update:any={
    "bay_id":'',
    "name":{
      "Baggage":[],
    
      "Catering":[],
      
      "Step Ladder":[],
      
      "Bus":[]
    }
  };
  console.log(this.editRow.name)
  console.log(this.equip,"final equip");
  equip_update.name.Baggage=this.equip.Baggage;
  equip_update.name.Catering=this.equip.Catering;
  equip_update.name['Step Ladder']=this.equip.Ladder;
  equip_update.name.Bus=this.equip.Bus;
  equip_update.bay_id=this.editRow.bay_id;
  console.log(equip_update)
  this.services.create(this.appUrl.geturlfunction('BAY_EQUIP_UPDATE'),equip_update).subscribe(res => {
    this.dialogRef.close('RELOAD');
    console.log(res)
  })
    // this.dialogRef.close();
  }

}
