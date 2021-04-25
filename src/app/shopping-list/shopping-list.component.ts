import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from './services/shopping-list.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  ingredientSub: Subscription; 

  constructor(private shoppingListService: ShoppingListService, private store: Store<fromApp.AppState>) { 
  }

  ngOnInit() {
    this.ingredientSub = this.store.select('shoppingList')
    .subscribe(data => {
      this.ingredients = data.ingredients;
    });;
  }

  ngOnDestroy() {
    this.ingredientSub.unsubscribe();
  }

  onEditItem(id: number){
    this.store.dispatch(new ShoppingListActions.StartUpdateIngredient(id));
  }

}
