import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../auth.service';

import { ApiService } from './../../service/api.service';

import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coach-login',
  templateUrl: './coach-login.component.html',
  styleUrls: ['./coach-login.component.css']
})
export class CoachLoginComponent implements OnInit {

  public username: string;
  public password: string;
 

  constructor(private auth: ApiService, private router: Router) { }
  ngOnInit(): void {
   
  }

  public submit() {
    this.auth.getCoach1(this.username).subscribe(data => {
   
    //  this.AllUsers=data;
      
    });
  }

}
