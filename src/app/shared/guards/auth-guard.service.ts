import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService, private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // return this.authService.isAuthenticated()
        //     .then((authenticated: boolean) => {
        //         if(authenticated) {
        //             return true;
        //         }else {
        //             this.router.navigate(['auth']);
        //         }
        //     })

        return this.authService.userChanged.pipe(take(1),
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

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated()
            .then((authenticated: boolean) => {
                if(authenticated) {
                    return true;
                }else {
                    this.router.navigate(['/']);
                }
            })
    }
}