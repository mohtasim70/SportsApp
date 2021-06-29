import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  submitted = false;
  playerForm: FormGroup;
  Game:any = [];
  games:any=[];
  gameIds:any=[];

  Ranks: any = ['Beginner', 'Medium', 'Advance'];
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
    this.readGame();
  }

  ngOnInit() { this.readGame() }

  readGame(){
    this.apiService.getGames().subscribe((data) => {
     this.Game = data;
    })    
  }

  mainForm() {
    this.playerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      ranking: [''],
      game: ['']
    })
  }
  updateProfile(e){
    // this.playerForm.get('game').setValue(e, {
    //   onlySelf: true
    // })
    this.playerForm.get('game').setValue(e, {
      onlySelf: true
    })
  }
  updateGameIds()
  {
    for (let gam of this.games) {
      this.gameIds.push(gam._id);
     
    }
  }

  updateRank(e) {
    this.playerForm.get('ranking').setValue(e, {
      onlySelf: true
    })
  }
  
  // , Validators.pattern('^[0-9]+$')]
  // , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]
  // Choose designation with select dropdown
 

  // Getter to access form control
  get myForm(){
    return this.playerForm.controls;
  }

  onSubmit() {
   
    this.submitted = true;
    
     this.updateGameIds();
     this.updateProfile(this.gameIds);
    
     
  
     
    
    if (!this.playerForm.valid) {
      return false;
    } else {
  
      this.apiService.Register(this.playerForm.value).subscribe(
        (res) => {
          console.log('Player successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/login'))
        }, (error) => {
          // this.router.navigateByUrl('/login')
          alert(error);
          console.log(error);
          console.exception("ss");
        });
    }
  }

}
