import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {AppUrlServiceService} from '../../app-url-service.service';
import {AppServiceService} from '../../app-service.service'
@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddAssetComponent implements OnInit {
  bayTypes :any=[21,22,24,26];
  baggage:any=["BT101","BT102","BT103","BT104"];
  catering:any=["CT101","CT102","CT103"];
  ladder:any=["ST101","ST102"];
  buses:any=["BU101"]
  constructor( private dialogRef: MatDialogRef<AddAssetComponent>,private appUrl:AppUrlServiceService,private services:AppServiceService) { }

  ngOnInit() {
    this.getMaster();
  }
  getMaster(){
    this.services.getAll(this.appUrl.geturlfunction('BAY_MASTER')).subscribe(res => {
      if (res.status === true) {
        console.log(res.data)
      }
    })
  }
  cancel(){
    this.dialogRef.close();
  }
  add(){
    this.dialogRef.close();
  }
  click(){
    console.log("yes")
  }

}
