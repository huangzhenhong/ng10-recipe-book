import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  RouterModule,
  Routes  
} from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
import { DemoModule } from './demos/demos.module';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from '../environments/environment';
import { RecipeEffects } from './recipes/store/recipe.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot(),
    AuthModule,
    DemoModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
