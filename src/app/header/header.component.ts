import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { RecipeService } from '../recipes/services/recipe.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as authActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() tabChanged = new EventEmitter<string>();
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private authService: AuthService, private recipeService: RecipeService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLinkChanged(event: any) {
    this.tabChanged.emit(event);
  }

  onLogin() {
    //this.authService.logIn();
  }

  onLogout() {
    //this.authService.logOut();
    this.store.dispatch(new authActions.Logout());
  }

  onFetch() {
    this.recipeService.getAllRecipes();
  }

  onSave() {
    this.recipeService.saveRecipes();
  }

}
