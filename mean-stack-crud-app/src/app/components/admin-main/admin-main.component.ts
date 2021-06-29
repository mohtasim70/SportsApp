
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';



import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {
  Schedule:any = [];
  Schedule1:any = [];
  Match:any= []
  Employee: any=[];
  Game: any="Game";
  Practice:any="Practice";
  
  MyGames:any=[];
  constructor(private apiService: ApiService,private router: Router) { 
    this.apiService.getAdminUnpermitted().subscribe((data) => {
      this.Schedule = data;

      for(let mat of this.Schedule)
      {
        if(mat.sessionType=="Game")
        {
          this.Game.push(mat);
        }
 
      }
 
     
     })
  
    
 

  }

  ngOnInit() {
    $(document).ready(function(){
      $('[data-toggle="offcanvas"]').click(function(){
          $("#navigation").toggleClass("hidden-xs");
      });
   });
  // this.readMatch();
  }
 


  readUser(){
    this.apiService.getAdminUnpermitted().subscribe((data) => {
     this.Schedule = data;
     //alert();
    })} 
    readMatch(){
      this.apiService.getAdminUnpermittedGame().subscribe((data) => {
       this.Game = data;
       //alert();
      })} 

    Accept(id)
    {
      this.apiService.AdminAccept(id)
      .subscribe(res => {
        this.router.navigateByUrl('/signup', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/admin/main']);
      }); 
        console.log('Content updated successfully!')
      }, (error) => {
        console.log(error)
      })

    }
  
    Decline(id) {
      this.apiService.AdminDecline(id)
      .subscribe(res => {
        this.router.navigateByUrl('/signup', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/admin/main']);
      }); 
        console.log('Content deleted successfully!')
      }, (error) => {
        console.log(error)
      })
      
      
    }

    AcceptMatch(id)
    {
      this.apiService.AdminGameAccept(id)
      .subscribe(res => {
        this.router.navigateByUrl('/signup', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/admin/main']);
      }); 
        console.log('Content updated successfully!')
      }, (error) => {
        console.log(error)
      })

    }
  
    DeclineMatch(id) {
      this.apiService.AdminGameDeclineJugaar(id)
      .subscribe(res => {
        this.router.navigateByUrl('/signup', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/admin/main']);
      }); 
        console.log('Content deleted successfully!')
      }, (error) => {
        console.log(error)
      })
      
      
    }





}
