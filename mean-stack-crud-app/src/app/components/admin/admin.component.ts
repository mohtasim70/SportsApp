
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

import * as $ from 'jquery';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  
  User:any = [];
  Employee: any=[];
  Game: any=[];
  
  MyGames:any=[];
  constructor(private apiService: ApiService) { 
     this.readUser();
    // this.readGames();
    
    //   for(let gam of this.User.Game)
    //   {
        
    //     this.getGamer(gam);
    //   }

  }

  ngOnInit() {
    $(document).ready(function(){
      $('[data-toggle="offcanvas"]').click(function(){
          $("#navigation").toggleClass("hidden-xs");
      });
   });

  }
  getGamer(id) {
    
    this.apiService.getGame1(id).subscribe(data => {
     
      this.MyGames.push(data);
      
    });
  }

  readEmployee(){
    this.apiService.getEmployees().subscribe((data) => {
     this.Employee = data;
    })    
  }
  readGames(){
    this.apiService.getGames().subscribe((data) => {
     this.Game = data;
    })} 
  readUser(){
    this.apiService.getUsers().subscribe((data) => {
     this.User = data;
     //alert();
    })} 

  removeUser(user, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteUser(user._id).subscribe((data) => {
          this.User.splice(index, 1);
        }
      )    
    }
    
  }

}
