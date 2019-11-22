import { Component, OnInit } from '@angular/core';
import {  MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.scss']
})
export class EditAssetComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<EditAssetComponent>) { }

  ngOnInit() {
  }
  cancel(){
    this.dialogRef.close();
  }
  done(){
    this.dialogRef.close();
  }

}
