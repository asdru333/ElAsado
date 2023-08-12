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
  products! : string;
  totalPrice! : number;
  hasPaid : boolean;


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
    this.hasPaid = false
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
    let userId = this.authenticationService.getCurrentUserId()
    this.retrieveService.getDoc("users", userId).then((doc) => {
      this.userFullName = doc.get('name') + ' ' + doc.get('surnames');
      this.userPhone = doc.get('phone');
      this.payForm.controls['fullName'].setValue(this.userFullName)
      this.payForm.controls['phone'].setValue(this.userPhone)
    })
    this.getPayInfo(userId);
  }

  getPayInfo(userId : string) {
    this.retrieveService.getDoc("pays", userId).then((doc) => {
      this.products = doc.get('products');
      this.totalPrice = doc.get('totalPrice');
    })
    if (!this.products || !this.totalPrice) {
      setTimeout(() => {console.log("2"); this.getPayInfo(userId)}, 1000)
    }
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
    if (this.localService) {
      this.payForm.controls['location'].setValue("El asado")
      console.log("location")
    }
    const { fullName, phone, location} = this.payForm.value;
    if (!this.payForm.valid || !fullName || !phone || !location) {
      this.hasSubmitted = true;
      return;
    }
    this.hasPaid = true;
    setInterval(() => {this.router.navigate(["/"])}, 3000)
  }
}
