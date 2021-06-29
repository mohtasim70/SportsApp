import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-coach-edit',
  templateUrl: './coach-edit.component.html',
  styleUrls: ['./coach-edit.component.css']
})
export class CoachEditComponent implements OnInit {
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

  }

  ngOnInit() {
    this.updateUser();
    let id = this.actRoute.snapshot.paramMap.get('id');  
  
    this.getUser(id);

   
    
  this.playerForm = this.fb.group({
    name: ['', [Validators.required]],
  
  });
     }

  
  getUser(id) {
   // alert( id)
    this.apiService.getCoach(id).subscribe(res => {
   
      // this.currentUser = res.msg;
      //alert(res['username'])
      // id=this.currentUser._id;
      this.playerForm.setValue({
        name: res['name'],
    
    });
  });


  }

  updateUser() {
    this.playerForm = this.fb.group({
      name: ['', [Validators.required]],
     
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
    
   //  this.updateGameIds();
     
     //this.updateProfile(this.gameIds);
  
     
    
    if (!this.playerForm.valid) {
    // alert("fals")
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
     
      let id = this.actRoute.snapshot.paramMap.get('id');  
   
      this.apiService.updateCoach(id, this.playerForm.value)
      .subscribe(res => {
        this.router.navigateByUrl('/admin/view/coaches');
        console.log('Content updated successfully!')
      }, (error) => {
        console.log(error)
      })
    }
  }
}

}

