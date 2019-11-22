import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { MatDialog } from "@angular/material";
import {AddAssetComponent} from './add-asset/add-asset.component'
import {EditAssetComponent} from './edit-asset/edit-asset.component'
@Component({
  selector: 'app-task-assignment',
  templateUrl: './task-assignment.component.html',
  styleUrls: ['./task-assignment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskAssignmentComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit() {
  }
  edit(){
    console.log("clicked");
    const modalRef = this.dialog.open(EditAssetComponent, {
      position: {
          right: '0',
      },
      // minHeight: '96vh',
      width: '400px',
      maxHeight: '100vh',
      panelClass: 'addNewflight',
      data: {
          mode: 'ADD',
      },

  });
  modalRef.afterClosed().subscribe(result => {
      // this.timeline.off('select', function(){});
  });
  }
  add(){
    console.log("clicked");
    const modalRef = this.dialog.open(AddAssetComponent, {
      position: {
          right: '0',
      },
      // minHeight: '96vh',
      width: '400px',
      maxHeight: '100vh',
      panelClass: 'addNewflight',
      data: {
          mode: 'ADD',
      },

  });
  modalRef.afterClosed().subscribe(result => {
      // this.timeline.off('select', function(){});
  });
  }
}
