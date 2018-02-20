import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {Angular2TokenService} from "angular2-token";
import {ApiServiceService} from "../services/api-service.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public router: Router, public authService: Angular2TokenService, public apiService: ApiServiceService) { }

  
  myimage="";
  currentProyectMenu = 0;
  myProyect = {
    name: "",
    number: 0,
    descrition: "",
    start: null,
    end: null
  }
  myProyects = [];
  
  image(){
    this.apiService.currentUserData(this.authService.currentUserData.id).subscribe(res =>{
      this.myimage = res.image;  
      console.log(this.myimage);   
    })
    return this.myimage;
  }
  getProyects() {
    return this.apiService.getAllProyects().subscribe(result => {
      console.log(result);
      this.myProyects = result;
      console.log(this.myProyects);
    });
  }

  createProyect(name,number,descrition,start,end){
    this.myProyect.name = name;
    this.myProyect.number = number;
    this.myProyect.descrition = descrition;
    this.myProyect.start = start;
    this.myProyect.end = end; 
    this.apiService.createNewProyect(this.myProyect).subscribe();
  }

  toggleProyects(numero){
    this.currentProyectMenu = numero;
  }

  // getMyProyects(){
  //   this.apiService.getProyectsByUserId(this.authService.currentUserData.id).subscribe(result =>{
  //     this.myProyects = result;
  //   });
  // }
  ngOnInit() {
    if (!this.authService.userSignedIn()){
      this.router.navigate(['/']);
    }else{
      this.getProyects();
    }
  } 
}
