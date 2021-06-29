import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// import { Employee } from './../../model/Employee';
import { ActivatedRoute } from "@angular/router";

import {formatDate } from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'app-practiceschedule',
  templateUrl: './practiceschedule.component.html',
  styleUrls: ['./practiceschedule.component.css']
})
export class PracticescheduleComponent implements OnInit {
  currentUser: any = {};

  Coach:any=[];
  MyGames:any=[];
  Practice:any=[];
  id:any=[];
  Ranking:any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private authService: ApiService
  ) { 

     this.id = this.actRoute.snapshot.paramMap.get('id');  
 //alert(this.id)
 this.authService.getUserProfile(this.id).subscribe(res => {
  this.currentUser = res;
 this. id=this.currentUser._id;
// alert("ddd")
 
//  for(let gam of this.currentUser.games)
//  {
   
//    this.getGamer(gam);
//  }
this.authService.getUserSchedule(this.id).subscribe(data => {
 // alert(data);
  this.Practice=data;
  
});

  // this.router.navigate(['practiceschedule/'+this.id]);
 


})
    
  
    
  }
  readCoach(){
   
    this.authService.getCoaches().subscribe((data) => {
     // alert(data)
     this.Coach = data;
    })}   
    getGamer(id) {
    
      this.authService.getGame1(id).subscribe(data => {
      //  alert(data)
        this.MyGames.push(data);
        
      });
    }
    All(){
      this.authService.getAllSchedule().subscribe(data => {
     //   alert(data[0].sessionType);
      
        
      });
    }
    create(id){
      // this.authService.CreateSchedule(id).subscribe(data => {
        
      // alert("comeon");
        
      // });
    
    }

    getSchedule(id){
      this.authService.getUserSchedule(id).subscribe(data => {
      //  alert(data);
        this.Practice=data;
        
      });
    }

    getRanking(id)
    {
      this.authService.getUserRanking(id).subscribe(data => {
       
        this.Ranking=data;
        
      });

    }

  ngOnInit(): void {
   
    $(document).ready(function(){
      $('[data-toggle="offcanvas"]').click(function(){
          $("#navigation").toggleClass("hidden-xs");
      });
   });
  
  
   //this.create(this.id);
   this.getRanking(this.id);
    this.getSchedule(this.id);
   
  // this.All();
    
    
  }



}
