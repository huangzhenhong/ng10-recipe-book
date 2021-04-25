import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as authActions from '../store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  private storeSub: Subscription;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.select("auth").subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  ngOnDestroy(): void {
    if(this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(!form.valid) return;

    let formValues = form.value as any;
    let email = formValues.email;
    let password = formValues.password;

    if(this.isLoginMode) {
      console.log("Start login...");
      this.store.dispatch(new authActions.LoginStart({email: email, password: password }))
    }else {
      console.log("signup...");
      this.store.dispatch(new authActions.SignUpStart({email: email, password: password}));
    }
    form.reset();
  }

  onCloseEventHandler() {
    this.error = null;
    console.log("error fired");
  }


}
