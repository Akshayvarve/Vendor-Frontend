import { Component } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm: UntypedFormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private toastrService: ToastrService
  ) {
    this.signUpForm = this.fb.group({
      Name: ['', [Validators.required, this.noWhitespaceValidator()]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, this.noWhitespaceValidator()]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.confirmPasswordValidator
    });
  }

  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      return isWhitespace ? { whitespace: true } : null;
    };
  }

  confirmPasswordValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get('Password').value;
    let confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  fnSignUpAdmin() {
    if (this.signUpForm.valid) {
      this.authService.signupUser(this.signUpForm.value).subscribe(res => {
        console.log(res, this.signUpForm.value);
        this.toastrService.success('SignUp Successful!');
        this.router.navigate(['client']);
      });
    }
  }
}
