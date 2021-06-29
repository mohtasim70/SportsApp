
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  submitted = false;
  playerForm: FormGroup;
  Game:any = [];
  games:any=[];
  gameIds:any=[];
  currentUser: any;
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private apiService: ApiService
  ) { 
    // let id = this.actRoute.snapshot.paramMap.get('id');  
    // this.getUser(id);
    // this.updateUser();
    this.readGame();
  }

  ngOnInit() {
    this.updateUser();
    let id = this.actRoute.snapshot.paramMap.get('id');  
  
    this.getUser(id);

   
    
  this.playerForm = this.fb.group({
    usernames: ['', [Validators.required]],
    password: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    game: ['']
  });
    this.readGame() }

  readGame(){
    this.apiService.getGames().subscribe((data) => {
     this.Game = data;
    })    
  }
  getUser(id) {
   // alert( id)
    this.apiService.getUserProfile(id).subscribe(res => {
   
      // this.currentUser = res.msg;
      //alert(res['username'])
      // id=this.currentUser._id;
      this.playerForm.setValue({
        usernames: res['username'],
        password: res['password'],
        firstname: res['firstname'],
        lastname: res['lastname'],
         games: res['games']
    });
  });


  }

  updateUser() {
    this.playerForm = this.fb.group({
      usernames: ['', [Validators.required]],
      password: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      games: ['']
    })
  }

  updateProfile(e){
    // this.playerForm.get('game').setValue(e, {
    //   onlySelf: true
    // })
    this.playerForm.get('games').setValue(e, {
      onlySelf: true
    })
  }
  updateGameIds()
  {
    for (let gam of this.games) {
      this.gameIds.push(gam._id);
    }
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
    
   //  this.updateGameIds();
     
     //this.updateProfile(this.gameIds);
  
     
    
    if (!this.playerForm.valid) {
     alert("fals")
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
     
      let id = this.actRoute.snapshot.paramMap.get('id');  
    this.apiService.getUserProfile2().subscribe(res => {
      this.currentUser = res.msg;
      id=this.currentUser._id;
  });
      this.apiService.updateUser(id, this.playerForm.value)
      .subscribe(res => {
        this.router.navigateByUrl('/admin/main');
        console.log('Content updated successfully!')
      }, (error) => {
        console.log(error)
      })
    }
  }
}

}
