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
  apiDatas:any;
  bagCount:number=1;
  catCount:number=1;
  ladCount:number=1;
  busCount:number=1;
  baCount:number=1;
  cCount:number=1;
  lCount:number=1;
  buCount:number=1;
  constructor( private dialogRef: MatDialogRef<EditAssetComponent>,@Inject(MAT_DIALOG_DATA) public details: any,private appUrl:AppUrlServiceService,private services:AppServiceService) {
   this.editRow= this.details.bayDet;
   this.apiDatas=this.details.apiData;
   this.equipData(this.editRow.name);
   }

  ngOnInit() {
    this.getMaster();
  }
  equipData(data:any){
    if(data.Baggage.length!=0){
      for(let a=0;a<data.Baggage.length;a++){
        this.equip.Baggage.push(data.Baggage[a].name)
      }

    }
    if(data.Catering.length!=0){
      for(let b=0;b<data.Catering.length;b++){
        this.equip.Catering.push(data.Catering[b].name)
      }  
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
    // this.services.getAll(this.appUrl.geturlfunction('BAY_EQUIP_LIST')).subscribe(res => {
    //   if (res.status === true) {
        // console.log(res.data)
        this.bayTypes=this.apiDatas.bay;
        // console.log(res.data.equipment)
        let list=[]
        list=this.apiDatas.equipment
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
  bagSelect(e:any,c:any){
    console.log(c,"count")
    if(c%2==0){//odd
      console.log("even");
      this.bagSel=false;
      this.equip.Baggage=[]
      console.log(this.equip)
    }else{//even
      console.log("odd")
      this.bagSel=true;
      this.equip.Baggage.push(e);
      console.log(this.equip)
    }
    return this.bagCount= this.bagCount+1;
  }
  catSelect(e:any,c:any){
    if(c%2==0){//odd
      console.log("even",c);
      this.catSel=false;
      this.equip.Catering=[]
      console.log(this.equip)
    }else{//even
      console.log("odd",c)
      this.catSel=true;
      this.equip.Catering.push(e);
      console.log(this.equip)
    }
    return this.catCount= this.catCount+1;
  }
  ladSelect(e:any,c:any){
    if(c%2==0){//odd
      console.log("even");
      this.ladSel=false;
      this.equip.Ladder=[]
      console.log(this.equip)
    }else{//even
      console.log("odd")
      this.ladSel=true;
      this.equip.Ladder.push(e);
      console.log(this.equip)
    }
    return this.ladCount= this.ladCount+1;
  }
  busSelect(e:any,c:any){
    if(c%2==0){//odd
      console.log("even");
      this.busSel=false;
      this.equip.Bus=[]
      console.log(this.equip)
    }else{//even
      console.log("odd")
      this.busSel=true;
      this.equip.Bus.push(e);
      console.log(this.equip)
    }
    return this.busCount= this.busCount+1;
  }
  cancel(){
    this.dialogRef.close();
  }
  bagRemove(val:any,c:any){
    console.log(val,"remove",c)
    if(val.type=="Baggage"){
      console.log(val,"bus",c)
      if(c%2==0){
        console.log("even")
        this.equip.Baggage.push(val.name)
        this.bagSel=false
        console.log(this.equip)
        return this.baCount= this.baCount+1;
       
      }else{
        console.log("odd")
        this.equip.Baggage=[]
        this.bagSel=true;
        console.log(this.equip)
        return this.baCount= this.baCount+1;
      }
     
    }
  }
  catRemove(val:any,c:any){
    if(val.type=="Catering"){
      console.log(val,"bus",c)
      if(c%2==0){
        console.log("even")
        this.equip.Catering.push(val.name)
        this.catSel=false
        console.log(this.equip)
        return this.cCount= this.cCount+1;
       
      }else{
        console.log("odd")
        this.equip.Catering=[]
        this.catSel=true;
        console.log(this.equip)
        return this.cCount= this.cCount+1;
      }
    }
  }
  ladRemove(val:any,c:any){
    if(val.type=="Step Ladder"){
      console.log(val,"bus",c)
      if(c%2==0){
        console.log("even")
        this.equip.Ladder.push(val.name)
        this.ladSel=false
        console.log(this.equip)
        return this.lCount= this.lCount+1;
       
      }else{
        console.log("odd")
        this.equip.Ladder=[]
        this.ladSel=true;
        console.log(this.equip)
        return this.lCount= this.lCount+1;
      }
    }
  }
  busRemove(val:any,c:any){
    if(val.type=="Bus"){
      console.log(val,"bus",c)
      if(c%2==0){
        console.log("even")
        this.equip.Bus.push(val.name)
        this.busSel=false
        console.log(this.equip)
        return this.buCount= this.buCount+1;
       
      }else{
        console.log("odd")
        
        this.equip.Bus=[]
        this.busSel=true;
        console.log(this.equip)
        return this.buCount= this.buCount+1;
      }
     
    }
    // return this.count= this.count+1;
  }

  done(){
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
