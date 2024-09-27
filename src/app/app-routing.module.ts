
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowComponent } from './show/show.component';
import { AppComponent } from './app.component';
import { Comp1Component } from './comp1/comp1.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { EditcomponentComponent } from './editcomponent/editcomponent.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { EmployeeComponent } from './employee/employee.component';
import { TaskmanagerComponent } from './taskmanager/taskmanager.component';
import { UsertaskComponent } from './usertask/usertask.component';
import { AdminattendanceComponent } from './adminattendance/adminattendance.component';
import { SerService } from './ser.service';
import { PerformanceReviewComponent } from './performance-review/performance-review.component';

import { KeepnotesComponent } from './keepnotes/keepnotes.component';
import { PieChartComponent } from './piechart/piechart.component';


const routes: Routes = [
 
  {path:'comp1', component: Comp1Component},
  {path:'login',component:LoginComponent,canActivate:[SerService]},
    {path:'admin',component:AdminComponent,children:[{
      path:'taskmanager',component:TaskmanagerComponent},
      { path: 'show', component: ShowComponent },
      {path:'adminattendance',component:AdminattendanceComponent},
      {path:'performance-review',component:PerformanceReviewComponent},
      {path:'chart',component:PieChartComponent}
     
    ]},
    {
      path: 'user',
      component: UserComponent,
      children: [
        { path: 'attendance', component: AttendanceComponent },
        { path: 'dashboard', component: DashboardComponent },
        {path:'editcomponent',component:EditcomponentComponent},
        {path:'certification',component:CertificationsComponent},
        {path:'employee',component:EmployeeComponent},
        {path:'usertask',component:UsertaskComponent},
        {path:'notes',component:KeepnotesComponent},
        { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
      ]
    }, 
      
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
