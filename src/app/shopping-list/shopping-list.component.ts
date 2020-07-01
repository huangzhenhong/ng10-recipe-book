import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from './services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  ingredientSub: Subscription; 

  constructor(private shoppingListService: ShoppingListService) { 
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientSub = this.shoppingListService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
    });
  }

  ngOnDestroy() {
    this.ingredientSub.unsubscribe();
  }

  onAdded(event: any) {
    console.log(event);
    this.shoppingListService.add(event);
  }

  onEditItem(id: number){
    this.shoppingListService.startEditing.next(id);
  }

}
