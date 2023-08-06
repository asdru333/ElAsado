import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';

@Component({
  selector: 'app-forgotPassword',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  passwordForm : FormGroup;
  hasSubmitted : boolean;
  hasSend: boolean;
  message: string;

  constructor(public authenticationService : AuthenticationServiceService) {
    this.passwordForm = new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.hasSubmitted = false;
    this.hasSend = false;
    this.message = ''
  }

  ngOnInit() {
  }

 get email() {
    return this.passwordForm.get('email');
  }

  submit() {
    const { email } = this.passwordForm.value;

    if (!this.passwordForm.valid || !email) {
      this.hasSubmitted = true;
      return;
    }

    this.message = this.authenticationService.forgotPassword(email);
  }

}
