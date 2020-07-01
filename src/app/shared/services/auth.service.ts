import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn:string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false;
  webApiKey = 'AIzaSyCiepyZbmt2drWmq2NPMpueen8h9-nstJY';
  userChanged = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  
  constructor(private http: HttpClient, private router: Router) { }

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
    return promise;
  }

  logIn(email: string, password: string) {
    let fireBaseUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.webApiKey}`;
    return this.http.post<AuthResponseData>(fireBaseUrl, 
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.HandleError), 
      tap(resData => {
        console.log(resData);
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
      }));
  }

  signUp(email: string, password: string) {

    let fireBaseUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.webApiKey}`;

    return this.http.post<AuthResponseData>(fireBaseUrl, 
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.HandleError), 
      tap(resData => this.handleAuthentication(
        resData.email, resData.localId, resData.idToken, resData.expiresIn))
    );
  } 

  autoLogin(){
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData) {
      return;
    }

    const loadedUser = new User (
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if(loadedUser.token) {
      this.userChanged.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
      this.loggedIn = true;
    }
  }

  logOut() {
    this.loggedIn = false;
    this.userChanged.next(null);
    this.router.navigate(['auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
   this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration)
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: string){
    if(!expiresIn) {
      expiresIn = '100';
    }
    const expirationDate = new Date(new Date().getTime() + +expiresIn*1000);
    const user = new User(email, userId, token, expirationDate);
    this.userChanged.next(user);
    this.autoLogout(+expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    this.loggedIn = true;
  }

  private HandleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
        if(!errorResponse.error || !errorResponse.error.error){
          return throwError(errorMessage);
        }
        switch(errorResponse.error.error.message){
          case 'EMAIL_NOT_FOUND':
          case 'INVALID_PASSWORD':
            errorMessage = 'User name or password is not correct.';
            break;
          case 'USER_DISABLED':
            errorMessage = 'User is disabled';
            break;
          case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists.';
            break;
          default:
            break; 
        }
        return throwError(errorMessage);
  }
  
}
