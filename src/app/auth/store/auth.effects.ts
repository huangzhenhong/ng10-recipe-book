import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { dispatch } from 'rxjs/internal/observable/range';
import { AuthService } from '../../shared/services/auth.service';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn:string;
    localId: string;
}

const handleAuthentication = (email: string, 
    userId: string, 
    token: string, 
    expiresIn: string) => {
        const expirationDate = new Date(new Date().getTime() + (+expiresIn)*1000);
        const user = new User(email, userId, token, expirationDate);
        localStorage.setItem('userData', JSON.stringify(user));
        return new AuthActions.AuthenticateSuccess({ 
            email: email, 
            userId: userId, 
            expiresIn: expirationDate, 
            token: token,
            redirect: true
         });
    };

const handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error occured!';
    if(!errorRes.error || !errorRes.error.error) {
        return of(new AuthActions.AuthenticateFail(errorMessage)); 
    }
    switch(errorRes.error.error.message) {
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
    return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {

    @Effect()
    signUp = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignUpStart) => {
            return this.http.post<AuthResponseData>(this.fireBaseSignUpUrl, 
                {
                  email: signupAction.payload.email,
                  password: signupAction.payload.password,
                  returnSecureToken: true
                }
            ).pipe(
                tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {
                    return handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
                }),
                catchError((errorRes) => { 
                    return handleError(errorRes);
                })
            )
        })
    );


    @Effect()
    login = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(this.fireBaseSignInUrl, 
                {
                  email: authData.payload.email,
                  password: authData.payload.password,
                  returnSecureToken: true
                }
            ).pipe(
                tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {
                    return handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
                }),
                catchError((errorRes) => { 
                    return handleError(errorRes);
                })
            )
        })
    );

    @Effect()
    autoLogin = this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN), 
        map(() => {
          const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
          } = JSON.parse(localStorage.getItem('userData'));
      
          if(!userData) {
            return new AuthActions.Dummy();
          }
      
          const loadedUser = new User (
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
          );

          if(loadedUser.token) {
              const expirationDuration = new Date(userData._tokenExpirationDate).getDate() - new Date().getTime();
              this.authService.setLogoutTimer(expirationDuration);
              return new AuthActions.AuthenticateSuccess({
                email: loadedUser.email,
                userId: loadedUser.id,
                token: loadedUser.token,
                expiresIn: new Date(userData._tokenExpirationDate),
                redirect: false
              });
          }

          return new AuthActions.Dummy();
    }));

    
    @Effect({dispatch: false})
    authRedirect = this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS), 
        tap(() => { this.router.navigate(['/']);})
    );

    @Effect({dispatch: false}) 
    logout = this.actions$.pipe(ofType(AuthActions.LOGOUT), 
        tap(() => {
            localStorage.removeItem('userData');
            this.authService.clearLogoutTime();
            this.router.navigate(['/auth']);
        })
    );
    
    fireBaseSignInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.AuthWebApiKey}`;
    fireBaseSignUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.AuthWebApiKey}`;
    
    constructor(
        private actions$: Actions, 
        private http: HttpClient, 
        private router: Router,
        private authService: AuthService) {}
}