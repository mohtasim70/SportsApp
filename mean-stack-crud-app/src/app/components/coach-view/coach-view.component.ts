
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

import * as $ from 'jquery';
@Component({
  selector: 'app-coach-view',
  templateUrl: './coach-view.component.html',
  styleUrls: ['./coach-view.component.css']
})
export class CoachViewComponent implements OnInit {
 
  User:any = [];
  Employee: any=[];
  Game: any=[];
  
  MyGames:any=[];
  constructor(private apiService: ApiService) { 
     this.readUser();
    

  }

  ngOnInit() {
    $(document).ready(function(){
      $('[data-toggle="offcanvas"]').click(function(){
          $("#navigation").toggleClass("hidden-xs");
      });
   });

  }
 
  readUser(){
    this.apiService.getCoaches().subscribe((data) => {
     this.User = data;
     //alert();
    })} 

  removeUser(user, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteCoach(user._id).subscribe((data) => {
          this.User.splice(index, 1);
        }
      )    
    }
    
  }

}
