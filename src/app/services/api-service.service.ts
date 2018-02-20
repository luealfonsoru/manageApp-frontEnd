import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Response } from "@angular/http";
import {Subject, Observable} from "rxjs";
import {Angular2TokenService} from "angular2-token";
import 'rxjs/Rx';

@Injectable()
export class ApiServiceService {
  result = null;
  url = "http://localhost:3000/";
  userPId = 0;
  theJson = [];
  alproyects = [];
  proyectIdData = {user_id:null, proyect_id:null};
  
  constructor(private http:Http, public authService:Angular2TokenService) { }

  putUserFirst(userInfo,userId):Observable<any>{
    return this.http.put(this.url+"users/"+userId,userInfo).map(res =>{
      this.createUserProyect(1,userId).subscribe;
    });
  }
  getUsers():Observable<any> {
    console.log(this.url+"users");
    return this.http.get(this.url + "users").map(response => {
      console.log(response.json());
      return response.json();}
    );
  }

  getAllProyects():Observable<any>{
    return this.http.get(this.url +"proyects").map(response =>{
      return response.json();
    });
  }

  createNewProyect(proyectData:  {name:string, number:number, descrition:string, start:Date, end:Date}):Observable<any>{
    return this.http.post(this.url + "users",proyectData).map(response =>{
      console.log("Created Proyect :D");
    });
  }

  createUserProyect(proyectId,userId):Observable<any>{
    this.proyectIdData.proyect_id = proyectId;
    this.proyectIdData.user_id = userId;
    return this.http.post(this.url + "user_proyects",this.proyectIdData).map(response =>{
      console.log("Created Proyect :D");
    });
  }

  getProyectsByUserId(id){
    return this.http.get(this.url + "user_proyects").map(response =>{
      this.userPId = response.json();
      console.log(this.userPId);
      this.getAllProyects().subscribe(result =>{
        this.alproyects = result;
        for(var i = 0; i < Object.keys(this.userPId).length; i++){
          if ( this.userPId[i].user_id === id){
            for(var j = 0; j < Object.keys(this.alproyects).length; j++ ){
              console.log(this.alproyects);
              if( this.alproyects[j].id == this.userPId[i].proyect_id){
                this.theJson.push(this.alproyects[j]);
              }
            }
          } 
        }
      });
      console.log(this.theJson);
      return this.theJson;
    });
  }

}
