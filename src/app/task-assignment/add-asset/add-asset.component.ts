import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddAssetComponent implements OnInit {

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
