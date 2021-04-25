import { NgModule } from "@angular/core";
import { LoggingService } from './shared/services/logging.service';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/guards/auth-guard.service';
import { CanDeactivateGuard } from './shared/guards/can-deactivate-guard.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth/auth-interceptor.service';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        LoggingService, 
        AuthGuard, 
        AuthService, 
        CanDeactivateGuard, 
        {
            provide: HTTP_INTERCEPTORS, 
            useClass: AuthInterceptorService, 
            multi: true
        }
    ]
})
export class CoreModule {}