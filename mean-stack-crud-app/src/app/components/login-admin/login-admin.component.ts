
import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../auth.service';

import { ApiService } from './../../service/api.service';

import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  public username: string;
  public password: string;
  public error: string;

  constructor(private auth: ApiService, private router: Router) { }

  public submit() {
    this.auth.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['admin/main']),
        err => this.error = 'Could not authenticate'
      );
  }
}

