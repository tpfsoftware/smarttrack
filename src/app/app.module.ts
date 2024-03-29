import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatNativeDateModule} from '@angular/material/core';
import {DemoMaterialModule} from './master/master.module';
import {AppServiceService} from './app-service.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskAssignmentComponent } from './task-assignment/task-assignment.component';
import { InsightsComponent } from './insights/insights.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatTabsModule} from '@angular/material/tabs';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { LayoutComponent } from './layout/layout.component';
import { AgmCoreModule } from '@agm/core';
import { MapStyleJson } from './map-style';
import { RouterModule } from '@angular/router';
import { AddAssetComponent } from './task-assignment/add-asset/add-asset.component';
import { EditAssetComponent } from './task-assignment/edit-asset/edit-asset.component';
import * as _ from 'underscore';
import { HttpClientModule } from '@angular/common/http'; 
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TaskAssignmentComponent,
    InsightsComponent,
    LoginComponent,
    LayoutComponent,
    AddAssetComponent,
    EditAssetComponent,
  ], 
  entryComponents: [
    AddAssetComponent,
    EditAssetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
    MatNativeDateModule,
    MatMenuModule,
    MatIconModule,
    DemoMaterialModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBtQQhZG8m6EA5qNPeg3rGZflQNwuI_kag',
      libraries: ["places", "geometry"]
    }),
    RouterModule
  ],
  providers: [AppServiceService,AppServiceService,MapStyleJson],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
