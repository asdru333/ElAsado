import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;
  hasSubmitted : boolean;
  equalPasswords: boolean

  ngOnInit():void  {
  }

  constructor(private authenticationService: AuthenticationServiceService, private registerService: RegisterServiceService, private router: Router) {
    this.registerForm = new FormGroup ({
      name: new FormControl('', [Validators.required]),
      surnames: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("^[0-9]*$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword:new FormControl('', [Validators.required, Validators.minLength(8)])
    });
    this.hasSubmitted = false;
    this.equalPasswords = true;
  }

  get name() {
    return this.registerForm.get('name');
  }

  get surnames() {
    return this.registerForm.get('surnames');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  checkPasswords(password: string, confirmPassword: string) {
    if (password == confirmPassword) {
      this.equalPasswords = true;
      return true;
    }
    this.equalPasswords = false;
    console.log("entré")
    return false;
  }

  register() {
    const { name, surnames, phone, email, password, confirmPassword } = this.registerForm.value;

    if (!this.registerForm.valid || !password || !confirmPassword || !this.checkPasswords(password, confirmPassword) || !name || !surnames || !phone || !email ) {
      this.hasSubmitted = true
      console.log(this.registerForm)
      return;
    }

    this.authenticationService
    .register(email, password)
    .pipe(
      switchMap(({ user: { uid } }) =>
        this.registerService.addUser({ id: uid, name, surnames, phone, email  })
      )
        )
        .subscribe(() => {
          this.router.navigate(['/']);
        });
  }
}
