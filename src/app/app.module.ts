import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  RouterModule,
  Routes  
} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BasicHighlightDirective } from './shared/directives/basic-highlight/basic-highlight.directive';
import { BetterHighlightDirective } from './shared/directives/better-highlight/better-highlight.directive';
import { UnlessDirective } from './shared/directives/unless/unless.directive';
import { DropdownDirective } from './shared/directives/dropdown/dropdown.directive';
import { LoggingService } from './shared/services/logging.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/guards/auth-guard.service';
import { CanDeactivateGuard } from './shared/guards/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PipeServersComponent } from './demos/pipe-servers/pipe-servers.component';
import { ShortenPipe } from './shared/pipes/shorten.pipe';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { AuthComponent } from './auth/auth/auth.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth/auth-interceptor.service';
import { AlertComponent } from './shared/components/alert/alert.component';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShortenPipe,
    
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    DropdownDirective,
    NotFoundComponent,
    ErrorPageComponent,

    PipeServersComponent,
    FilterPipe,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,

    ShoppingEditComponent,
    ShoppingListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipesModule,
    AppRoutingModule,
  ],
  providers: [LoggingService, AuthGuard, AuthService, CanDeactivateGuard, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
