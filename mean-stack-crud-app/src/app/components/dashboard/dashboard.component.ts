// import { Employee } from './../../model/Employee';
import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {formatDate } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';


import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  today= new Date();
  jstoday = '';

  currentUser: any = {};
  submitted = false;
  checked: Boolean;
  firsttime2: Boolean;
  editForm: FormGroup;
  attendanceForm:FormGroup;
  selected: [];
  Game:any = [];

  MyGames:any=[];
  AllUsers:any=[];
  Opponents:any=[];
  Opponent:any;
  oppGames:any=[];

  Dup:any=[];
ids:any;
  Ranks: any = ['Beginner', 'Medium', 'Advance'];
  constructor(
   
 
    public fb: FormBuilder,
    private ngZone: NgZone,
    public authService: ApiService,
    private actRoute: ActivatedRoute,
    private router: Router
  ){
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');

// this.readGame();

    let id = this.actRoute.snapshot.paramMap.get('id');  
    this.authService.getUserProfile2().subscribe(res => {
     
      this.currentUser = res;
    //  alert(this.currentUser.admin)
      if(this.currentUser.admin==true)
      {
        
        this.ngZone.run(() => this.router.navigateByUrl('/admin/view/players'));//Changeeeee

      }
      
      id=this.currentUser._id;
     this.ids=id;
     
      this.firsttime2=this.currentUser.firsttime;

      for(let gam of this.currentUser.games)
      {
       
        this.getGamer(gam);
      }
      this.authService.getUsers().subscribe(data => {
   
        this.AllUsers=data;
        for(let user of this.AllUsers)
        { 
         // alert("hello")
     console.log("User ranking: "+user.ranking)
     console.log(this.currentUser.rankingOpponent)
          if(user.ranking==this.currentUser.rankingOpponent)
          {
            //alert(user.firstname)
           
            for(let gam of this.currentUser.games)
            {
              for(let gms of user.games)
              {
              
                if(gam.name==gms.name)
                {
             if(user.username!=this.currentUser.username)
             {
               this.oppGames.push(gms);
                  this.Dup.push(user);
             }
                }
              }
              
            }
    
          }
    
        }
        this.Opponents=this.Dup.filter((item, i, ar) => ar.indexOf(item) === i);
        
      });

     


      this.router.navigate(['dashboard/'+id]);
    })

  

  }
  

  ngOnInit(): void {
    $(document).ready(function(){
      $('[data-toggle="offcanvas"]').click(function(){
          $("#navigation").toggleClass("hidden-xs");
      });
   });
   
   this.updateUser();
   this.getUsers();
  // this.getOpponents();
   let id = this.actRoute.snapshot.paramMap.get('id');
   this.getUser(id);
  
 

   this.editForm = this.fb.group({
    timings: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    rankingOpponent: [''],
    firsttime:['false']
   
   })
   this.attendanceForm = this.fb.group({
    priority: [''],
    
   
   })
   
  //  this.checked=false;
  }

 



  changeValue(value) {
    this.checked = !value;
}

  // Choose options with select-dropdown
  updateRank(e) {
    this.editForm.get('rankingOpponent').setValue(e, {
      onlySelf: true
    })
  }
 

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }
  getUser(id) {
    this.authService.getUserProfile(id).subscribe(data => {
      this.editForm.setValue({
        timings: data['timings'],
        endTime: data['endTime'],
        firsttime:"false",
        rankingOpponent: data['rankingOpponent']
       
      });
    });
  }

  getGamer(id) {
    
    this.authService.getGame1(id).subscribe(data => {
   
      this.MyGames.push(data);
      
    });
  }

  getUsers()
  {
    this.authService.getUsers().subscribe(data => {
   
      this.AllUsers=data;
      
    });
  
  }
 
  getOpponents()
  {
 
    for(let user of this.AllUsers)
    { 
     // alert("hello")
      if(user.ranking==this.currentUser.opponentRanking)
      {
      
        this.Opponents.push(user);
       // this.Opponents.push(user);
        for(let gam of this.currentUser.games)
        {
          for(let gms of user.games)
          {
            if(gam==gms)
            {

             this.Opponents.push(user);
            }
          }
          
        }

      }

    }
 //this.Opponents=this.Dup.filter((item, i, ar) => ar.indexOf(item) === i);

  }


  updateUser() {
    this.editForm = this.fb.group({
      timings: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      rankingOpponent: [''],
      firsttime: ['false']
     
    })
  }

  updateOpponent(e) {
    
    this.Opponent.setValue(e, {
      onlySelf: true
    })
  
    
  }

  createMatch()
  {
    let id = this.actRoute.snapshot.paramMap.get('id');
//alert("dsefef")
    if(this.Opponent==null)
    {
  //  alert("null")
    this.authService.CreateMatch(id,this.Opponents[Math.floor(Math.random() * this.Opponents.length)])
    .subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/match/'+id))
      //alert("Schedule Created")
    }, (error) => {
      console.log(error)
    })

    }
    else
    {
    //  alert(this.Opponent)
    this.authService.CreateMatch(id,this.Opponent)
    .subscribe(res => {
      this.router.navigateByUrl('/signup', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/match/'+id]);
    }); 
      //alert("Schedule Created")
    }, (error) => {
      console.log(error)
    })
  }
  }
    
  


  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
    
        
        this.authService.updateUser(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/signup', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/dashboard']);
          }); 
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }



  createSchedule()
  {
    let id = this.actRoute.snapshot.paramMap.get('id');
    
        for(let gam of this.currentUser.games)
        {
      //    alert(gam.courts[0].name)
    this.authService.CreateSchedule(id,gam)
      .subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/practiceschedule/'+id));
     //   alert("Schedule Created")
      }, (error) => {
    //  alert("Cant create ScheduleQ")
      })
    }
  }

  SubmitAttendance() {
    
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
    
        
        this.authService.Attendance(id)
          .subscribe(res => {
            this.createSchedule();
            this.router.navigateByUrl('/signup', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/practiceschedule/'+id]);
          }); 
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    
  }

  Practice()
  {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.ngZone.run(() => this.router.navigateByUrl('/practiceschedule/'+id));
  }
  Match()
  {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.ngZone.run(() => this.router.navigateByUrl('/match/'+id));
  }
  Home()
  {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.ngZone.run(() => this.router.navigateByUrl('/dashboard/'+id));
  }









}
