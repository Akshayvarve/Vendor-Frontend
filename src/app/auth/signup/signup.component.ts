import { Component } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Router } from 'express';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import process from 'process';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signUpForm: UntypedFormGroup;
 
  constructor(public dialog: MatDialog, private fb: UntypedFormBuilder, private authService: AuthService,  private http: HttpClient,private toastrService: ToastrService
  ) {
    this.signUpForm = this.fb.group({
      Email: [''],
      Name: [''],
      Password: ['',[Validators.required,this.noWhitespaceValidator()]],
      confirmPassword: [''],
    },
    {
      validator: ConfirmPasswordValidator("Password", "confirmPassword")
    } );

  }

  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      return isWhitespace ? { whitespace: true } : null;
    };
  }
  
  fnSignUpAdmin() {

        this.authService.signupUser(this.signUpForm.value).subscribe((res) => {
          console.log(res,this.signUpForm.value);
          
        this.toastrService.success('SignUp Succesfull!');

      })
      
  }
}
