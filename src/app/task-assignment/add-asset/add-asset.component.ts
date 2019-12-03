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
  noBag:boolean=false;
  noCat:boolean=false;
  noLad:boolean=false;
  noBus:boolean=false;
  apiDatas:any;
  count:number=0;

  constructor( private dialogRef: MatDialogRef<AddAssetComponent>,@Inject(MAT_DIALOG_DATA) public details: any,private appUrl:AppUrlServiceService,private services:AppServiceService) {
    //(details)
    this.mode=this.details.mode;
    this.apiDatas=this.details.apiData;
    //("api data",this.apiDatas)
   }

  ngOnInit() {
    this.getMaster();
  }
  getMaster(){       
        let b_id=this.apiDatas.bay;
        let list=[]
        list=this.apiDatas.equipment
       let final_list:any;
       let listAll=[];
      
        final_list=_.each(list,function(obj){
          if(obj.bay_id==null || obj.bay_id ==""){
listAll.push(obj)
          }
        })
        let equi_list = list.filter(li => (li.bay_id != null || li.bay_id !=""))
        let result1=b_id;
        let result2=equi_list;
        var result = result1.filter(function(o1){
          return !result2.some(function(o2){
              return o1.name === o2.bay_id;          // assumes unique id
          });
      })
        this.bayTypes=result;
       let truck_bag= _.findWhere(listAll, (({type: "Baggage"})?({type: "Baggage"}):[]));
       if(truck_bag!=undefined){
        this.baggage.push(truck_bag.name)
        this.noBag=true;
       }else{
        this.noBag=false;
       }
       let cat= _.findWhere(listAll, (({type: "Catering"})?({type: "Catering"}):[]));
if(cat!=undefined){
  this.catering.push(cat.name)
  this.noCat=true;
}else{
this.noCat=false
}
       
       let step= _.findWhere(listAll, (({type: "Step Ladder"})?({type: "Step Ladder"}):[]));
       if(step!=undefined){
        this.ladder.push(step.name)
        this.noLad=true;
      }else{
        this.noLad=false;
      }
       
       let bu= _.findWhere(listAll, (({type: "Bus"})?({type: "Bus"}):[]));
       if(bu!=undefined){
        this.buses.push(bu.name)
        this.noBus=true;
       }else{
        this.noBus=false;
       }
         }
  bagSelect(e:any){
    this.bagSel=true;
    // this.count=+1;
    // console.log(this.count)
this.equip.Baggage.push(e);
  }
  catSelect(e:any){
    this.catSel=true;
this.equip.Catering.push(e);
  }
  ladSelect(e:any){
    this.ladSel=true;
this.equip.Ladder.push(e);
 }
  busSelect(e:any){
    this.busSel=true;
this.equip.Bus.push(e);
  }
  cancel(){
    this.dialogRef.close();
  }
  modList(data:any){
this.bayName=data
  }
  add(){
    let equip_update:any={
      "bay_id":'',
      "name":{
        "Baggage":[],
      
        "Catering":[],
        
        "Step Ladder":[],
        
        "Bus":[]
      }
    };
    equip_update.name.Baggage=this.equip.Baggage;
  equip_update.name.Catering=this.equip.Catering;
  equip_update.name['Step Ladder']=this.equip.Ladder;
  equip_update.name.Bus=this.equip.Bus;
    equip_update.bay_id=this.bayName;
   (equip_update)
         this.services.create(this.appUrl.geturlfunction('BAY_EQUIP_UPDATE'),equip_update).subscribe(res => {
           if(res.status==true){
            this.dialogRef.close('RELOAD');
           }
    })
  }
  
}
