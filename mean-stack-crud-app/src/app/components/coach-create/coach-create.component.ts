import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-coach-create',
  templateUrl: './coach-create.component.html',
  styleUrls: ['./coach-create.component.css']
})
export class CoachCreateComponent implements OnInit {

  
  submitted = false;
  playerForm: FormGroup;
  Game:any = [];
  games:any=[];
  gameIds:any=[];

  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();

  }

  ngOnInit() {  }



  mainForm() {
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
    
  
     
    
    if (!this.playerForm.valid) {
     
      return false;
    } else {
  
      this.apiService.createCoach(this.playerForm.value).subscribe(
        (res) => {
          console.log('Player successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/admin/view/coaches'))
        }, (error) => {
          // this.router.navigateByUrl('/login')
          alert(error);
          console.log(error);
          console.exception("ss");
        });
    }
  }

}

