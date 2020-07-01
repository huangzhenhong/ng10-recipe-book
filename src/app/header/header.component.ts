import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { RecipeService } from '../recipes/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() tabChanged = new EventEmitter<string>();
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private authService: AuthService, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.userSub = this.authService.userChanged.subscribe(user => {
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
    this.authService.logOut();
  }

  onFetch() {
    this.recipeService.getAllRecipes();
  }

  onSave() {
    this.recipeService.saveRecipes();
  }

}
