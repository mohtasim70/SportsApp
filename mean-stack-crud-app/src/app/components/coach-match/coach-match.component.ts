import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// import { Employee } from './../../model/Employee';
import { ActivatedRoute } from "@angular/router";

import {formatDate } from '@angular/common';
import * as $ from 'jquery';
@Component({
  selector: 'app-coach-match',
  templateUrl: './coach-match.component.html',
  styleUrls: ['./coach-match.component.css']
})
export class CoachMatchComponent implements OnInit {
  currentUser: any = {};

  Coach:any=[];
  MyGames:any=[];
  Practice:any=[];
  id:any=[];
  result:any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private authService: ApiService
  ) { 

      this.id = this.actRoute.snapshot.paramMap.get('id');  
    
    // this.authService.getCoach(this.id).subscribe(res => {
    //   this.currentUser = res.msg;
    // })
     
    
     //  this.getSchedule(this.id)
    
    // //   this.router.navigate(['practiceschedule/'+this.id]);
     

   
    //  })
  
    
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
      this.authService.getCoachSchedule(id).subscribe(data => {
      //  alert(data);
        for(let gam of data)
        {
          
        //  alert(gam.court.name);
        }
        this.Practice=data;
        
      });
    }
    getMatch(id){
      this.authService.getCoachMatch(id).subscribe(data => {
     //   alert(data[0].sessionType);
     this.Practice=data;
      
        
      });
    }

    updateWinner(e) {
      this.result=e;
    //  alert(this.result)
   
      // this.result.setValue(e, {
       
      //   onlySelf: true
      // })
    
    }

    updateResult(id)
    {
    //  alert(this.result)
    //alert(this.result);
    this.authService.CoachResult(id,this.result).subscribe(
      (res) => {
     
        this.ngZone.run(() => this.router.navigateByUrl('/coach/practiceschedule/'+this.id))
      }, (error) => {
        // this.router.navigateByUrl('/login')
        alert(error);
        console.log(error);
        console.exception("ss");
      });
    }

  


  ngOnInit(): void {
   
    $(document).ready(function(){
      $('[data-toggle="offcanvas"]').click(function(){
          $("#navigation").toggleClass("hidden-xs");
      });
   });
  
   //this.create(this.id);
  //  this.getSchedule(this.id)
    this.getMatch(this.id)
   //this.All();
    
    
  }



}
