import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.store.select('auth').pipe(take(1),
            map(
                authState => {
                    return authState.user;
                }
            ),
            map(user => {
                const isAuth = !!user;
                if(isAuth) {
                    return true;
                }
                else {
                    return this.router.createUrlTree(['/auth']);
                }
            })
        );
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
        return this.store.select('auth').pipe(take(1),
            map(
                authState => {
                    return authState.user;
                }
            ),
            map(user => {
                const isAuth = !!user;
                if(isAuth) {
                    return true;
                }
                else {
                    return this.router.createUrlTree(['/auth']);
                }
            })
        );
    }
}