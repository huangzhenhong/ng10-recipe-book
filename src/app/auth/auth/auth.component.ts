import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(!form.valid) return;

    this.isLoading = true;
    let formValues = form.value as any;
    let email = formValues.email;
    let password = formValues.password;
    let authObs: Observable<AuthResponseData>;

    if(this.isLoginMode) {
      console.log("login...");
      authObs = this.authService.logIn(email, password);
    }else {
      console.log("signup...");
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      res => {
        console.log(res);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        this.error = "An error occurred:" + errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onCloseEventHandler() {
    this.error = null;
    console.log("error fired");
  }


}
