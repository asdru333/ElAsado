import { Component, OnInit, Input } from '@angular/core';
import { RetrieveServiceService } from 'src/app/services/retrieve-service.service';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menuPage',
  templateUrl: './menuPage.component.html',
  styleUrls: ['./menuPage.component.css']
})
export class MenuPageComponent implements OnInit {

  @Input() collection: string = "";
  items!: any[];
  isLogin: boolean;
  hasLoaded: boolean = false
  user$: Observable<User | null>;


  constructor(private retrieveService : RetrieveServiceService, private authenticationService: AuthenticationServiceService) {
    this.isLogin = false
    this.user$ = this.authenticationService.getCurrentUser();
  }

  ngOnInit(): void {
    this.retrieveService.getAllDocs(this.collection).then((mainDocs) => {this.items = mainDocs; this.hasLoaded = true}).catch((error) => {console.log(error)})
    this.user$.subscribe(user => {
      if (user) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }

}
