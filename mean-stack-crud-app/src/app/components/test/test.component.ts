import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as $ from 'jquery';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  Coach:any=[];
  Courts:any=[];
  Users:any=[];
  Games:any=[];
  court: any=["TenC1","TenC2","TenC56","TenC5","TenC4","TenC4","TenC3"];
  coah:any;
  user:any;
  one:any=2;


  currentUser: any = {};
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService,
    public authService: ApiService,
    public actRoute: ActivatedRoute
  ) { 
    
  //  this.readCoach();
  }
  readCoach(){
    this.apiService.getCoaches().subscribe((data) => {
     this.Coach = data;
     alert();
    })}   
    readUsers(){
      this.apiService.getUsers().subscribe((data) => {
       this.Users = data;
       alert();
      })}   
      readGames(){
        this.apiService.getGames().subscribe((data) => {
         this.Games = data;
         alert();
        })}   
        
      
    ngOnInit(): void {
    $(document).ready(function(){
      $('[data-toggle="offcanvas"]').click(function(){
          $("#navigation").toggleClass("hidden-xs");
      });
   });
    this.readCoach();
    this.readUsers();
    this.readGames();
    this.coah=this.Coach[0].name;   
    this.user=this.Users[2].firstname; 
   this.court= this.court[1];
    //  this.coah = this.Games.Coach[Math.floor(Math.random() * this.Games.Coach.length)];
    // this.user= this.Users[0];
     
  }

}
