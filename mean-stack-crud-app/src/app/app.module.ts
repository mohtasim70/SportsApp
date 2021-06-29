import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';  
import { JwtModule } from '@auth0/angular-jwt';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 

import { MatListModule } from '@angular/material/list';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { NgSelectModule } from '@ng-select/ng-select';

import { ApiService } from './service/api.service';
import { ApiDashService } from './service/apiDash.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule  } from "@angular/forms";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { PracticescheduleComponent } from './components/practiceschedule/practiceschedule.component';
import { TestComponent } from './components/test/test.component';
import { CoachDashboardComponent } from './components/coach-dashboard/coach-dashboard.component';
import { MatchComponent } from './components/match/match.component';
import { CoachMatchComponent } from './components/coach-match/coach-match.component';
import { CoachLoginComponent } from './components/coach-login/coach-login.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { CoachViewComponent } from './components/coach-view/coach-view.component';
import { CoachEditComponent } from './components/coach-edit/coach-edit.component';
import { CoachCreateComponent } from './components/coach-create/coach-create.component';
import {HomepageComponent} from './components/homepage/homepage.component';

import { LoginAdminComponent } from './components/login-admin/login-admin.component';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EmployeeListComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    PracticescheduleComponent,
    TestComponent,
    CoachDashboardComponent,
    MatchComponent,
    CoachMatchComponent,
    CoachLoginComponent,
    AdminComponent,
    UserEditComponent,
    UserCreateComponent,
    AdminMainComponent,
    CoachViewComponent,
    CoachEditComponent,
    CoachCreateComponent,
    HomepageComponent,
    LoginAdminComponent

   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCheckboxModule,
    NgSelectModule,
    
    
   
 
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4000'],
        blacklistedRoutes: ['localhost:4000/users/login']
      }
    }),
    
   
 
    BrowserAnimationsModule
  ],
  providers: [ApiService,ApiDashService, {provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
