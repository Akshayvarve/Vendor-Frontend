import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  signinForm: UntypedFormGroup;

  constructor(public dialog: MatDialog,public fb: UntypedFormBuilder,private authService:AuthService,private router:Router,private toastrService: ToastrService,) { 
    this.signinForm = this.fb.group({

      Email: [''],
      Password: [''],
      FinancialYearId: ['']
    })

 
  }
  logintoken:any;

  loginUser() {
    if(this.signinForm.valid){
      this.authService.login(this.signinForm.value).subscribe((res:any)=>{
        console.log(res)
        if (res.token) {
          // this.authService.openSnackBar('Login Succesfull!');
          this.toastrService.success('Login Successfull')
        
          
          // var FinancialYearId = this.signinForm.controls.FinancialYearId.value;
          this.logintoken = res.token;
          var userDetails = res.user
          localStorage.setItem('access_token', JSON.stringify(res))
          localStorage.setItem('jwt_token', JSON.stringify(this.logintoken));
          console.log(this.logintoken,res);
          

          // localStorage.setItem('FinancialYearId',FinancialYearId);
          userDetails.UserType == 3 ? localStorage.setItem('userType', 'client') :userDetails.UserType == 1 ? localStorage.setItem('userType', 'admin') :localStorage.setItem('userType', 'employee')
          if  (userDetails){
            this.router.navigate(['client'])
          //  this.router.navigate(['super-admin'])
          console.log('super-admin');
 
          } 
        }
        else {
          // this.authService.openSnackBar('Username or password is incorrect!');
          this.toastrService.error('check username and password!', 'Username or password is incorrect!');

        }
        
      })

    }

    // this.authService.isAuthenticated()
  } 
}
