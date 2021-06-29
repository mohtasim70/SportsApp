import { Component } from '@angular/core';
import { ApiService } from "./service/api.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-stack-crud-app';
  currentUser: any;

  constructor(public authService: ApiService, private router: Router,) {
    this.authService.getUserProfile2().subscribe(res => {
     
      this.currentUser = res;

      });

   }

  get isAdmin() {
    return this.currentUser && this.currentUser.admin === true;
}

  logout() {
    this.authService.logout()
    this.router.navigate(['/login']);
  }
}
