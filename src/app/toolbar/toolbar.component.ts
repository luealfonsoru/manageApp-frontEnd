import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Angular2TokenService} from "angular2-token";
import {AuthService} from "../services/auth.service";
import {ApiServiceService} from "../services/api-service.service";
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public dialog: MatDialog, public apiService: ApiServiceService, public authService: AuthService, public authTokenService: Angular2TokenService, public router: Router) {}

  isOpen = false;
  registerOpen = false;

  logOut(){
      this.authService.logOutUser().subscribe();
      this.router.navigate(['/']);
    }

  closeAllDialogs(): void{
    this.dialog.closeAll();
  }
  openLoginDialog(): void {
    this.closeAllDialogs();
    this.isOpen = true;
    this.registerOpen = false;
    let dialogRef = this.dialog.open(AppLoginDialog, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isOpen = false;
      console.log('The dialog was closed');
    });

  }

  openRegisterDialog(): void {
    this.closeAllDialogs();
    this.isOpen = false;
    this.registerOpen = true;
    let dialogRef = this.dialog.open(AppRegisterDialog, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.registerOpen = false;
      console.log('The dialog was closed');
    });

  }
  
  isOpenDiag = () : boolean => {
    return this.isOpen;
  }

  isRegDiag = (): boolean =>{
    return this.registerOpen;
  }

  ngOnInit() {
    console.log(this.apiService.getUsers().subscribe());
  }

}


@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
})
export class AppLoginDialog {

  signInUser = {
    email: '',
    password: ''
  };

  @Output() onFormResult = new EventEmitter<any>();

  constructor(
    public router:Router,
    public authService:AuthService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AppLoginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoLoginClick(): void {
    this.dialogRef.close();
  }

  onSignInSubmit(){

	    this.authService.logInUser(this.signInUser).subscribe(

	        res => {
            this.onFormResult.emit({signedIn: true, res});
            this.dialogRef.close();
            this.router.navigate(['/profile']);
	          console.log('auth response:', res);
	          console.log('auth response headers: ', res.headers.toJSON()); //log the response header to show the auth token
	          console.log('auth response body:', res.json()); //log the response body to show the user 
	        },

	        err => {
            let dialogRef = this.dialog.open(AppErrorDialog, {
              width: '300px',
            });
            this.onFormResult.emit({signedIn: false, err});
            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
            });
            console.error('auth error:', err);
            
	        }
      )
  
    // this.tokenAuthSerivce.signIn(this.signInUser).subscribe(

    //     res => {
    //       if(res.status == 200){
    //         this.onFormResult.emit({signedIn: true, res});
    //       }
    //     },

    //     err => {
    //       console.log('err:', err);
    //       this.onFormResult.emit({signedIn: false, err});
    //     }
    // )

  }

}



@Component({
  selector: 'register-dialog',
  templateUrl: './register-dialog.component.html',
})
export class AppRegisterDialog {

  constructor(
    public authService: AuthService,
    public apiService: ApiServiceService,
    private tokenAuthSerivce:Angular2TokenService,
    public dialogRef: MatDialogRef<AppRegisterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoRegClick(): void {
    this.dialogRef.close();
  }

  signUpUser = {
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  userInfo = {
    name: "",
    image: "1.jpg"
  }
  signInUser={
    email: "",
    password: ""
  };
   @Output() onFormResult = new EventEmitter<any>();



  setProfile(profile){
    this.userInfo.image = profile+".jpg";
    console.log(profile+".jpg");
  }
  onSignUpSubmit(){
    this.dialogRef.close();
    this.tokenAuthSerivce.registerAccount(this.signUpUser).subscribe(

        (res) => {

          if (res.status == 200){
            console.log(res.json())
            this.onFormResult.emit({signedUp: true, res})
            this.signInUser = {email:this.signUpUser.email,password:this.signUpUser.password}
            this.authService.logInUser(this.signInUser).subscribe(

              res => {
                this.onFormResult.emit({signedIn: true, res});
                this.apiService.putUserFirst(this.userInfo,this.tokenAuthSerivce.currentUserData.id).subscribe(resp =>{
                  this.apiService.createUserProyect(1,this.tokenAuthSerivce.currentUserData.id).subscribe();
                });
                console.log('auth response:', res);
                console.log('auth response headers: ', res.headers.toJSON()); //log the response header to show the auth token
                console.log('auth response body:', res.json()); //log the response body to show the user 
              },
    
              err => {
                
              }
          )
            
          }

        },

        (err) => {
          console.log(err.json())
          this.onFormResult.emit({signedUp: false, err})
        }
    )

  }

}

@Component({
  selector: 'error-dialog',
  templateUrl: './error-dialog.component.html',
})
export class AppErrorDialog {

  constructor(
    public dialogRef: MatDialogRef<AppErrorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
