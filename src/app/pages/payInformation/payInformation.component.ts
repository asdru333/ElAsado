import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { RetrieveServiceService } from 'src/app/services/retrieve-service.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-payInformation',
  templateUrl: './payInformation.component.html',
  styleUrls: ['./payInformation.component.css']
})
export class PayInformationComponent implements OnInit {

  payForm : FormGroup;
  hasSubmitted : boolean;
  failedLogin: boolean;
  localService: boolean;
  expressService: boolean;
  user$: Observable<User | null>;
  userFullName! : string;
  userPhone! : number;
  nameChanged: boolean;
  phoneChanged: boolean;

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.loadPage();
      }
    });
  }

  constructor(private authenticationService : AuthenticationServiceService, private retrieveService: RetrieveServiceService, private router: Router) {
    this.payForm = new FormGroup ({
      fullName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("^[0-9]*$")]),
      location: new FormControl('', [Validators.required]),
    });
    this.hasSubmitted = false;
    this.failedLogin = false;
    this.localService = true;
    this.expressService = false;
    this.nameChanged = false;
    this.phoneChanged = false;
    this.user$ = this.authenticationService.getCurrentUser();
  }

  get fullName() {
    return this.payForm.get('fullName');
  }

  get phone() {
    return this.payForm.get('phone');
  }

  get location() {
    return this.payForm.get('location');
  }

  loadPage() {
    this.retrieveService.getDoc("users", this.authenticationService.getCurrentUserId()).then((doc) => {
      this.userFullName = doc.get('name') + ' ' + doc.get('surnames');
      this.userPhone = doc.get('phone');
    })
  }

  selectLocal() : void {
    this.localService = true;
    this.expressService= false;
  }

  selectExpress() : void {
    this.expressService = true;
    this.localService = false;
  }

  nameHasChanged() : void {
    this.nameChanged = true;
  }

  phoneHasChanged() : void {
    this.phoneChanged = true;
  }

  submit() : void {
    const { name, surnames, phone} = this.payForm.value;

    if (!this.payForm.valid || !name || !surnames || !phone) {
      this.hasSubmitted = true
      return;
    }
  }
}
