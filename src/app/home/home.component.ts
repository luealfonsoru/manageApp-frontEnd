import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {Angular2TokenService} from "angular2-token";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService: Angular2TokenService, public router: Router) { }

  ngOnInit() {
    if (this.authService.userSignedIn()){
      this.router.navigate(['/profile']);
    } 
  }

}
