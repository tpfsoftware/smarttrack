import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskAssignmentComponent } from './task-assignment/task-assignment.component';
import { InsightsComponent } from './insights/insights.component';


const routes: Routes = [
  { path: 'dashboard', component:  DashboardComponent},
  { path: 'task-assignment', component:  TaskAssignmentComponent},
  { path: 'insights', component: InsightsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
