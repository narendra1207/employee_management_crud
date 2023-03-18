import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{FormGroup , FormBuilder} from '@angular/forms'
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

public signupForm !: FormGroup
  constructor(private _fb:FormBuilder , private _http:HttpClient ,
    private _router:Router){}

  ngOnInit(){
this.signupForm=this._fb.group({
  fullName: [''],
  email: [''],
  mobile:[''],
  password:['']
})
  }

  signUp(){
this._http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
.subscribe(res=>{
  alert("Sign Up successfully")
  this.signupForm.reset()
this._router.navigate(['login'])
}, err=>{
  alert("some error occured")
})
  }
}
