import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material';
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
  bus:any=["BU101"]
  constructor( private dialogRef: MatDialogRef<AddAssetComponent>) { }

  ngOnInit() {
  }
  cancel(){
    this.dialogRef.close();
  }
  add(){
    this.dialogRef.close();
  }

}
