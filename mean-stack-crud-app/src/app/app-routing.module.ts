import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from "./shared/auth.guard";
import {PracticescheduleComponent} from "./components/practiceschedule/practiceschedule.component";
import { MatchComponent } from './components/match/match.component';


import {TestComponent} from "./components/test/test.component";
import {CoachDashboardComponent} from "./components/coach-dashboard/coach-dashboard.component"
import {CoachMatchComponent} from "./components/coach-match/coach-match.component"
import { AdminComponent } from './components/admin/admin.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { CoachViewComponent } from './components/coach-view/coach-view.component';
import { CoachEditComponent } from './components/coach-edit/coach-edit.component';
import { CoachCreateComponent } from './components/coach-create/coach-create.component';

import {HomepageComponent} from './components/homepage/homepage.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';


const routes: Routes = [

  { path: 'create-employee', component: EmployeeCreateComponent },
  { path: 'edit-employee/:id', component: EmployeeEditComponent },
  { path: 'employees-list', component: EmployeeListComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
  { path: 'dashboard/:id', component: DashboardComponent,canActivate: [AuthGuard]},
  { path: 'practiceschedule', component: PracticescheduleComponent,canActivate: [AuthGuard]},
  { path: 'practiceschedule/:id', component: PracticescheduleComponent,canActivate: [AuthGuard]},
  { path: 'match', component: MatchComponent,canActivate: [AuthGuard]},
  { path: 'match/:id', component: MatchComponent,canActivate: [AuthGuard]},

  { path: 'admin/view/players', component: AdminComponent,canActivate: [AuthGuard]},
  { path: 'admin/view/players/:id', component: AdminComponent,canActivate: [AuthGuard]},
  { path: 'admin/edit/players/:id', component: UserEditComponent,canActivate: [AuthGuard]},
  { path: 'admin/create/players/:id', component: UserCreateComponent,canActivate: [AuthGuard]},
  { path: 'admin/create/players', component: UserCreateComponent,canActivate: [AuthGuard]},
  { path: 'admin/main', component: AdminMainComponent,canActivate: [AuthGuard]},
  { path: 'admin/main/:id', component: AdminMainComponent,canActivate: [AuthGuard]},
  { path: 'admin/view/coaches', component: CoachViewComponent,canActivate: [AuthGuard]},
  { path: 'admin/edit/coaches/:id', component: CoachEditComponent,canActivate: [AuthGuard]},
  { path: 'admin/create/coaches', component: CoachCreateComponent,canActivate: [AuthGuard]},
  { path: 'admin/login', component: LoginAdminComponent},

  { path: 'coach/practiceschedule/:id', component: CoachDashboardComponent},
  { path: 'coach/match/:id', component: CoachMatchComponent},

  { path: 'test', component: TestComponent},
  {path: 'home',component: HomepageComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }