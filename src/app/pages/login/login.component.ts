import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm : FormGroup;
  hasSubmitted : boolean;
  failedLogin: boolean;

  ngOnInit(): void {

  }

  constructor(private authenticationService : AuthenticationServiceService, private router: Router) {
    this.loginForm = new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
    this.hasSubmitted = false;
    this.failedLogin = false;
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  navigateRegister() {
    this.router.navigate(['register']);
  }

  navigateForgotPassword() {
    this.router.navigate(['forgotPassword']);
  }

  submit() {
    const { email, password } = this.loginForm.value;

    if (!this.loginForm.valid || !email || !password) {
      this.hasSubmitted = true;
      return;
    }

    this.authenticationService.login(email, password).then(() => {this.router.navigate(['']);}).catch(() => {this.failedLogin = true})
  }
}
