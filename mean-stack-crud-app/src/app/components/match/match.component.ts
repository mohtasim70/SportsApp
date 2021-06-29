import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// import { Employee } from './../../model/Employee';
import { ActivatedRoute } from "@angular/router";

import {formatDate } from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  currentUser: any = {};

  Coach:any=[];
  MyGames:any=[];
  Match:any=[];
  id:any=[];
  Practice:any=[];
  Ranking:any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private authService: ApiService
  ) { 

     this.id = this.actRoute.snapshot.paramMap.get('id');  
    
    this.authService.getUserProfile(this.id).subscribe(res => {
      this.currentUser = res;
     this. id=this.currentUser._id;
     
  
    //  this.getSchedule(this.id)
    
    

   
    })
  
    
  }
  readCoach(){
   
    this.authService.getCoaches().subscribe((data) => {
   //   alert(data)
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
      this.authService.getUserMatch(id).subscribe(data => {
        this.Practice=data;
   
        for(let sch of data)
        {
          
          if(sch.sessionType=="Game" && sch.permit==true)
          {
               this.Match.push(sch);
          }
        }
      });
    }
    getRanking(id)
    {
  
      this.authService.getUserRanking(id).subscribe(data => {
     //   alert("ss")
      // alert(data);
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
    this.getSchedule(this.id)
 //  this.All();
    
    
  }

}
